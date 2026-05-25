import { Question, ExamConfig, GeneratedExam, Difficulty } from '../types';
import { queryNeon } from '../config/db'; // Ambil fungsi queryNeon HTTP kita

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function matchTopics(questionTopic: string, selectedTopics: string[]): boolean {
  if (!selectedTopics || selectedTopics.length === 0 || selectedTopics.some(t => t.toLowerCase() === 'semua')) {
    return true;
  }
  const cleanQuestionTopic = questionTopic.toLowerCase().trim();
  return selectedTopics.some((topic) => {
    const cleanSelected = topic.toLowerCase().trim();
    if (cleanSelected === cleanQuestionTopic) return true;
    const normalizedSelected = cleanSelected.replace(/&/g, 'dan').replace(/\s+/g, ' ');
    const normalizedQuestion = cleanQuestionTopic.replace(/&/g, 'dan').replace(/\s+/g, ' ');
    return normalizedQuestion.includes(normalizedSelected) || normalizedSelected.includes(normalizedQuestion);
  });
}

function pickStrict(pool: Question[], difficulty: Difficulty, count: number, excludeIds: Set<string>): Question[] {
  const available = pool.filter((q) => q.difficulty === difficulty && !excludeIds.has(q.id));
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, Math.min(count, available.length));
}

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const selectedTopics = config.topics || [];
  const dist = config.difficultyDist;
  const total = config.questionCount;

  const countMudah = Math.round((dist.mudah / 100) * total);
  const countSulit = Math.round((dist.sulit / 100) * total);
  const countSedang = total - countMudah - countSulit;

  // 1. AMBIL DATA LEWAT HTTP: Menggunakan LOWER() untuk menghindari masalah typo huruf besar/kecil
  const rows = await queryNeon('SELECT * FROM questions WHERE LOWER(subject) = LOWER($1)', [config.subject]);
  
  const remoteQuestionBank: Question[] = rows.map((row: any) => ({
    id: row.id,
    text: row.text,
    type: row.type,
    difficulty: row.difficulty,
    subject: row.subject,
    grade: row.grade,
    phase: row.phase,
    classLevel: row.class_level,
    topic: row.topic,
    options: typeof row.options === 'string' ? JSON.parse(row.options) : row.options,
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
    points: Number(row.points)
  }));

  // 2. Kumpulkan Soal Utama
  const primaryPool = remoteQuestionBank.filter((q) =>
    q.phase === config.phase &&
    String(q.classLevel).trim() === String(config.classLevel).trim() &&
    config.questionTypes.includes(q.type) &&
    matchTopics(q.topic, selectedTopics)
  );

  const usedIds = new Set<string>();
  
  const pickedMudah = pickStrict(primaryPool, 'mudah', countMudah, usedIds);
  pickedMudah.forEach((q) => usedIds.add(q.id));

  const pickedSedang = pickStrict(primaryPool, 'sedang', countSedang, usedIds);
  pickedSedang.forEach((q) => usedIds.add(q.id));

  const pickedSulit = pickStrict(primaryPool, 'sulit', countSulit, usedIds);
  pickedSulit.forEach((q) => usedIds.add(q.id));

  let combined = [...pickedMudah, ...pickedSedang, ...pickedSulit];

  // 3. JIKA SOAL MASIH KURANG (FALLBACK)
  if (combined.length < total) {
    const fallbacks = [
      () => remoteQuestionBank.filter((q) => q.phase === config.phase && config.questionTypes.includes(q.type) && matchTopics(q.topic, selectedTopics)),
      () => remoteQuestionBank.filter((q) => q.phase === config.phase && config.questionTypes.includes(q.type)),
      () => remoteQuestionBank.filter((q) => q.grade === config.grade && config.questionTypes.includes(q.type))
    ];

    for (const getFallbackPool of fallbacks) {
      if (combined.length >= total) break;

      const fallbackPool = getFallbackPool();
      const neededMudah = countMudah - combined.filter(q => q.difficulty === 'mudah').length;
      const neededSulit = countSulit - combined.filter(q => q.difficulty === 'sulit').length;
      const neededSedang = total - combined.length - Math.max(0, neededMudah) - Math.max(0, neededSulit);

      if (neededMudah > 0) {
        const extra = pickStrict(fallbackPool, 'mudah', neededMudah, usedIds);
        extra.forEach(q => usedIds.add(q.id));
        combined.push(...extra);
      }
      if (neededSedang > 0) {
        const extra = pickStrict(fallbackPool, 'sedang', neededSedang, usedIds);
        extra.forEach(q => usedIds.add(q.id));
        combined.push(...extra);
      }
      if (neededSulit > 0) {
        const extra = pickStrict(fallbackPool, 'sulit', neededSulit, usedIds);
        extra.forEach(q => usedIds.add(q.id));
        combined.push(...extra);
      }
    }

    if (combined.length < total) {
      const finalAbsolutePool = remoteQuestionBank.filter((q) => 
        config.questionTypes.includes(q.type) &&
        !usedIds.has(q.id)
      );
      const finalFiller = shuffleArray(finalAbsolutePool).slice(0, total - combined.length);
      finalFiller.forEach(q => usedIds.add(q.id));
      combined.push(...finalFiller);
    }
  }

  combined = shuffleArray(combined);

  const questions: Question[] = combined.slice(0, total).map((q, index) => ({
    ...q,
    id: `exam-${index + 1}`,
    options: q.options ? shuffleArray(q.options) : undefined,
  }));

  return {
    config,
    questions,
    createdAt: new Date(),
  };
}

export function calculateTotalPoints(questions: Question[]): number {
  return questions.reduce((sum, q) => sum + q.points, 0);
}
