// src/utils/generator.ts
import { Question, ExamConfig, GeneratedExam } from '../types';
import { queryNeon } from '../config/db';

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const totalDiminta = config.questionCount;

  // 1. Ambil soal berdasarkan mata pelajaran terkait
  const rows = await queryNeon(`
    SELECT * FROM questions 
    WHERE LOWER(subject) = LOWER($1)
    ORDER BY RANDOM()
  `, [config.subject]);

  if (!rows || rows.length === 0) {
    throw new Error(`Stok soal untuk mata pelajaran "${config.subject}" tidak ditemukan di database!`);
  }

  // 2. Filter data di frontend agar aman dari syntax SQL
  let hasilFilter = rows.filter((row: any) => 
    String(row.phase).toUpperCase() === String(config.phase).toUpperCase() && 
    String(row.class_level).trim() === String(config.classLevel).trim() &&
    config.questionTypes.map(t => t.toLowerCase()).includes(String(row.type).toLowerCase())
  );

  // Fallback jika kuota soal kurang
  if (hasilFilter.length < totalDiminta) {
    const idSudahDipakai = new Set(hasilFilter.map((q: any) => q.id));
    const cadangan = rows.filter((row: any) => !idSudahDipakai.has(row.id));
    hasilFilter = [...hasilFilter, ...cadangan];
  }

  const bankSoalTerpilih = hasilFilter.slice(0, totalDiminta);

  const finalQuestions: Question[] = bankSoalTerpilih.map((row: any, index: number) => {
    let opsiArray: string[] = ["A", "B", "C", "D"];
    if (row.options) {
      if (Array.isArray(row.options)) {
        opsiArray = row.options;
      } else if (typeof row.options === 'string') {
        try {
          opsiArray = JSON.parse(row.options);
        } catch {
          opsiArray = row.options.split(',').map((o: string) => o.trim());
        }
      }
    }

    return {
      id: `exam-${index + 1}`,
      text: row.text || 'Teks soal kosong',
      type: row.type || config.questionTypes[0],
      difficulty: row.difficulty || 'sedang',
      subject: row.subject,
      grade: row.grade || 'SD',
      phase: row.phase,
      classLevel: row.class_level,
      topic: row.topic || 'Umum',
      options: opsiArray,
      correctAnswer: row.correct_answer || '',
      explanation: row.explanation || '',
      points: Number(row.points) || 4
    };
  });

  return {
    config,
    questions: finalQuestions,
    createdAt: new Date(),
  };
}

export function calculateTotalPoints(questions: Question[]): number {
  return questions.reduce((sum, q) => sum + q.points, 0);
}
