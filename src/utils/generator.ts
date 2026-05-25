// src/utils/generator.ts
import { Question, ExamConfig, GeneratedExam, Difficulty } from '../types';
import { questionBank } from '../data/questionBank'; // Kembali menggunakan data lokal yang aman

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

function pickStrict(
  pool: Question[],
  difficulty: Difficulty,
  count: number,
  excludeIds: Set<string>
): Question[] {
  // PENGAMAN UTAMA: !excludeIds.has(q.id) menjamin soal yang sama tidak akan diambil dua kali
  const available = pool.filter((q) => q.difficulty === difficulty && !excludeIds.has(q.id));
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, Math.min(count, available.length));
}

// Kembalikan menjadi fungsi biasa (bukan async) agar stabil di frontend
export function generateExam(config: ExamConfig): GeneratedExam {
  const selectedTopics = config.topics || [];
  const dist = config.difficultyDist;
  const total = config.questionCount;

  const countMudah = Math.round((dist.mudah / 100) * total);
  const countSulit = Math.round((dist.sulit / 100) * total);
  const countSedang = total - countMudah - countSulit;

  const primaryPool = questionBank.filter((q) =>
    q.subject === config.subject &&
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

  // Tahap Fallback bertahap jika stok soal di topik utama kurang
  if (combined.length < total) {
    const fallbacks = [
      () => questionBank.filter((q) => q.subject === config.subject && q.phase === config.phase && config.questionTypes.includes(q.type) && matchTopics(q.topic, selectedTopics)),
      () => questionBank.filter((q) => q.subject === config.subject && q.phase === config.phase && config.questionTypes.includes(q.type)),
      () => questionBank.filter((q) => q.subject === config.subject && q.grade === config.grade && config.questionTypes.includes(q.type))
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

    // Ambil paksa sisa kuota dari mapel terkait yang jenisnya sesuai
    if (combined.length < total) {
      const finalAbsolutePool = questionBank.filter((q) => 
        q.subject === config.subject && 
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
