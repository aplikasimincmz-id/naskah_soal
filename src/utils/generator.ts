// src/utils/generator.ts
import { Question, ExamConfig, GeneratedExam } from '../types';
import { queryNeon } from '../config/db';

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const totalDiminta = config.questionCount;

  // AMBIL SEMUA SOAL DARI MATA PELAJARAN TERKAIT (Biarkan database mengacaknya langsung)
  const rows = await queryNeon(`
    SELECT * FROM questions 
    WHERE LOWER(subject) = LOWER($1)
    ORDER BY RANDOM()
  `, [config.subject]);

  // JIKA DATABASE SAMA SEKALI TIDAK PUNYA DATA MAPEL INI
  if (!rows || rows.length === 0) {
    throw new Error(`Stok soal untuk mata pelajaran "${config.subject}" tidak ditemukan di database Neon!`);
  }

  // LAKUKAN FILTERING KETAT DI SISI FRONTEND (Sangat aman, anti-error SQL, dan bebas duplikat)
  // 1. Ambil yang sangat cocok dengan Fase dan Kelas terlebih dahulu
  let filterUtama = rows.filter((row: any) => 
    row.phase === config.phase && 
    String(row.class_level).trim() === String(config.classLevel).trim() &&
    config.questionTypes.includes(row.type)
  );

  // 2. Jika soal utama kurang dari kuota, ambil sisa kekurangannya dari soal mapel sama di kelas/fase lain (Cadangan)
  if (filterUtama.length < totalDiminta) {
    const idSudahDipakai = new Set(filterUtama.map((q: any) => q.id));
    const sisaSoalCadangan = rows.filter((row: any) => !idSudahDipakai.has(row.id) && config.questionTypes.includes(row.type));
    
    // Gabungkan soal utama dengan soal cadangan
    filterUtama = [...filterUtama, ...sisaSoalCadangan];
  }

  // Potong hasil agar pas dengan jumlah yang diminta guru
  const bankSoalTerpilih = filterUtama.slice(0, totalDiminta);

  // MAPPING DATA KE FORMAT TYPESCRIPT APLIKASI
  const finalQuestions: Question[] = bankSoalTerpilih.map((row: any, index: number) => ({
    id: `exam-${index + 1}`,
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
    points: Number(row.points) || 4
  }));

  return {
    config,
    questions: finalQuestions,
    createdAt: new Date(),
  };
}

export function calculateTotalPoints(questions: Question[]): number {
  return questions.reduce((sum, q) => sum + q.points, 0);
}
