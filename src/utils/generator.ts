import { Question, ExamConfig, GeneratedExam, Difficulty } from '../types';
import { questionBank } from '../data/questionBank';

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
  
  // Bersihkan teks soal: ubah ke huruf kecil dan hapus spasi berlebih di ujung string
  const cleanQuestionTopic = questionTopic.toLowerCase().trim();

  // Lakukan pengecekan menyeluruh dengan toleransi spasi, simbol, dan huruf kapital
  return selectedTopics.some((topic) => {
    const cleanSelected = topic.toLowerCase().trim();
    
    // Pencocokan 1: Sama persis setelah di-lowercase & trim
    if (cleanSelected === cleanQuestionTopic) return true;
    
    // Pencocokan 2: Mengatasi perbedaan penulisan simbol '&' dan kata 'dan'
    const normalizedSelected = cleanSelected.replace(/&/g, 'dan').replace(/\s+/g, ' ');
    const normalizedQuestion = cleanQuestionTopic.replace(/&/g, 'dan').replace(/\s+/g, ' ');
    if (normalizedSelected === normalizedQuestion) return true;

    // Pencocokan 3: Toleransi jika string saling mengandung kata kunci (partial match)
    return normalizedQuestion.includes(normalizedSelected) || normalizedSelected.includes(normalizedQuestion);
  });
}

/**
 * Memilih soal secara ketat berdasarkan tingkat kesulitan yang diminta dari kumpulan data (pool).
 */
function pickStrict(
  pool: Question[],
  difficulty: Difficulty,
  count: number,
  excludeIds: Set<string>
): Question[] {
  const available = pool.filter((q) => q.difficulty === difficulty && !excludeIds.has(q.id));
  const shuffled = shuffleArray(available);
  return shuffled.slice(0, Math.min(count, available.length));
}

export function generateExam(config: ExamConfig): GeneratedExam {
  const selectedTopics = config.topics || [];
  const dist = config.difficultyDist;
  const total = config.questionCount;

  // 1. Hitung porsi target per tingkat kesulitan
  const countMudah = Math.round((dist.mudah / 100) * total);
  const countSulit = Math.round((dist.sulit / 100) * total);
  const countSedang = total - countMudah - countSulit;

  // 2. Kumpulkan Soal Utama (Kriteria Paling Ketat Sesuai Input Guru)
  const primaryPool = questionBank.filter((q) =>
    q.subject === config.subject &&
    q.phase === config.phase &&
    String(q.classLevel).trim() === String(config.classLevel).trim() &&
    config.questionTypes.includes(q.type) && // Kunci penyaringan tipe soal
    matchTopics(q.topic, selectedTopics)
  );

  const usedIds = new Set<string>();
  
  // Ambil dari kelompok utama dulu sesuai bobot kesulitan
  const pickedMudah = pickStrict(primaryPool, 'mudah', countMudah, usedIds);
  pickedMudah.forEach((q) => usedIds.add(q.id));

  const pickedSedang = pickStrict(primaryPool, 'sedang', countSedang, usedIds);
  pickedSedang.forEach((q) => usedIds.add(q.id));

  const pickedSulit = pickStrict(primaryPool, 'sulit', countSulit, usedIds);
  pickedSulit.forEach((q) => usedIds.add(q.id));

  let combined = [...pickedMudah, ...pickedSedang, ...pickedSulit];

  // 3. JIKA SOAL MASIH KURANG: Lakukan pelonggaran bertahap dengan MENJAGA JENIS SOAL SECARA MUTLAK
  if (combined.length < total) {
    // Hierarki pelonggaran tetap wajib mematuhi config.questionTypes pilihan guru
    const fallbacks = [
      // Fallback 1: Longgarkan Kelas, jaga Topik & Jenis Soal pilihan Guru
      () => questionBank.filter((q) => q.subject === config.subject && q.phase === config.phase && config.questionTypes.includes(q.type) && matchTopics(q.topic, selectedTopics)),
      // Fallback 2: Longgarkan Topik, jaga Jenis Soal di Fase yang sama (Diubah agar jenis soal tetap dikunci)
      () => questionBank.filter((q) => q.subject === config.subject && q.phase === config.phase && config.questionTypes.includes(q.type)),
      // Fallback 3: Longgarkan Kelas & Topik, tapi tetap jaga Jenis Soal di Tingkat Sekolah yang sama (SD/SMP/SMA)
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

    // Fallback darurat paling akhir: Ambil sisa soal yang bertipe sesuai, mengabaikan filter kelas/fase/topik demi mengejar kuota jumlah soal
    if (combined.length < total) {
      const finalAbsolutePool = questionBank.filter((q) => 
        q.subject === config.subject && 
        config.questionTypes.includes(q.type) && // Tetap dikunci ke pilihan jenis soal
        !usedIds.has(q.id)
      );
      const finalFiller = shuffleArray(finalAbsolutePool).slice(0, total - combined.length);
      combined.push(...finalFiller);
    }
  }

  // 4. Acak urutan final agar variasi tingkat kesulitan tercampur dengan baik
  combined = shuffleArray(combined);

  // 5. Berikan indeks urutan lembar soal baru (exam-1, exam-2, dst)
  const questions: Question[] = combined.slice(0, total).map((q, index) => ({
    ...q,
    id: `exam-${index + 1}`,
    // Jika soal memiliki opsi jawaban, acak opsinya agar susunan A, B, C, D bervariasi bagi siswa
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
