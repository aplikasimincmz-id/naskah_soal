// src/utils/generator.ts
import { Question, ExamConfig, GeneratedExam } from '../types';
import { queryNeon } from '../config/db';

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const totalDiminta = config.questionCount;

  // 1. QUERY UTAMA: Ambil soal yang SANGAT COCOK dengan pilihan guru (Urutan diacak langsung oleh database)
  // Kita pakai ORDER BY RANDOM() milik Postgres agar setiap di-refresh soalnya selalu baru
  const rowsUtama = await queryNeon(`
    SELECT * FROM questions 
    WHERE LOWER(subject) = LOWER($1)
      AND phase = $2
      AND TRIM(class_level) = TRIM($3)
      AND type = ANY($4)
    ORDER BY RANDOM()
  `, [config.subject, config.phase, config.classLevel, config.questionTypes]);

  // Masukkan hasil utama ke array penampung
  let bankSoalTerpilih: any[] = [...rowsUtama];

  // 2. QUERY CADANGAN (ANTI-DUPLIKAT): Jika soal utama kurang dari kuota yang diminta guru
  if (bankSoalTerpilih.length < totalDiminta) {
    const jumlahKurang = totalDiminta - bankSoalTerpilih.length;
    
    // Kumpulkan ID soal yang sudah diambil agar tidak dipilih lagi oleh database (Anti-Duplikat)
    const idSudahDipakai = bankSoalTerpilih.length > 0 
      ? bankSoalTerpilih.map(q => q.id) 
      : ['ID_DUMMY_AGAR_NOT_IN_TIDAK_ERROR'];

    // Ambil soal cadangan dari mata pelajaran yang sama, tapi boleh beda kelas/topik asal tipenya cocok
    const rowsCadangan = await queryNeon(`
      SELECT * FROM questions 
      WHERE LOWER(subject) = LOWER($1)
        AND type = ANY($2)
        AND id = NOT IN (${idSudahDipakai.map((_, i) => `$${i + 3}`).join(', ')})
      ORDER BY RANDOM()
      LIMIT $3
    `, [config.subject, config.questionTypes, ...idSudahDipakai, jumlahKurang]);

    // Gabungkan soal cadangan ke dalam hasil utama
    bankSoalTerpilih = [...bankSoalTerpilih, ...rowsCadangan];
  }

  // 3. MAPPING KE FORMAT TYPESCRIPT
  // Mengubah data dari snake_case database Neon ke camelCase aplikasi React Anda
  const finalQuestions: Question[] = bankSoalTerpilih.slice(0, totalDiminta).map((row: any, index: number) => ({
    id: `exam-${index + 1}`, // ID direset menjadi urutan kertas ujian (exam-1, exam-2, dst)
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
