// src/utils/generator.ts
import { Question, ExamConfig, GeneratedExam } from '../types';
import { queryNeon } from '../config/db';

export async function generateExam(config: ExamConfig): Promise<GeneratedExam> {
  const totalDiminta = config.questionCount;

  // 1. AMBIL SEMUA SOAL DARI MAPEL TERKAIT (Database mengacaknya otomatis dengan RANDOM)
  const rows = await queryNeon(`
    SELECT * FROM questions 
    WHERE LOWER(subject) = LOWER($1)
    ORDER BY RANDOM()
  `, [config.subject]);

  // JIKA DATABASE BENAR-BENAR KOSONG UNTUK MAPEL INI
  if (!rows || rows.length === 0) {
    throw new Error(`Stok soal untuk mata pelajaran "${config.subject}" sama sekali belum diinput di database Neon Anda!`);
  }

  // 2. FILTERING BERTINGKAT (SISTEM PENYELAMAT OTOMATIS)
  
  // Tahap A: Cari yang SANGAT COCOK (Fase sama, Kelas sama, dan Tipe Soal sama)
  let hasilFilter = rows.filter((row: any) => 
    String(row.phase).trim().toLowerCase() === String(config.phase).trim().toLowerCase() && 
    String(row.class_level).trim() === String(config.classLevel).trim() &&
    config.questionTypes.map(t => t.toLowerCase()).includes(String(row.type).toLowerCase())
  );

  // Tahap B (Penyelamat 1): Jika soal di kelas tersebut kurang, ambil dari kelas/fase lain asal MAPEL & TIPE SOAL-nya sama
  if (hasilFilter.length < totalDiminta) {
    const idSudahDipakai = new Set(hasilFilter.map((q: any) => q.id));
    const cadanganMapelSama = rows.filter((row: any) => 
      !idSudahDipakai.has(row.id) && 
      config.questionTypes.map(t => t.toLowerCase()).includes(String(row.type).toLowerCase())
    );
    hasilFilter = [...hasilFilter, ...cadanganMapelSama];
  }

  // Tahap C (Penyelamat Darurat Akhir): Jika masih kurang juga, ambil soal APA SAJA yang tersisa di mapel tersebut tanpa pandang tipe/kelas
  if (hasilFilter.length < totalDiminta) {
    const idSudahDipakai = new Set(hasilFilter.map((q: any) => q.id));
    const cadanganSapuJagat = rows.filter((row: any) => !idSudahDipakai.has(row.id));
    hasilFilter = [...hasilFilter, ...cadanganSapuJagat];
  }

  // 3. POTONG DAN PEMETAAN DATA KE FORMAT RE-INDEX NO SOAL (1, 2, 3...)
  const bankSoalTerpilih = hasilFilter.slice(0, totalDiminta);

  // Ganti dari bagian "const finalQuestions = bankSoalTerpilih.map..." sampai akhir fungsi di src/utils/generator.ts
  const finalQuestions: Question[] = bankSoalTerpilih.map((row: any, index: number) => {
    let opsiArray: string[] = ["A", "B", "C", "D"];

    // PENGAMAN SILANG: Memastikan opsi pilihan ganda tidak merusak render halaman
    if (row.options) {
      if (Array.isArray(row.options)) {
        opsiArray = row.options;
      } else if (typeof row.options === 'string') {
        const teksBersih = row.options.trim();
        if (teksBersih.startsWith('[') && teksBersih.endsWith(']')) {
          try {
            opsiArray = JSON.parse(teksBersih);
          } catch (e) {
            opsiArray = teksBersih.replace(/[\[\]"]/g, '').split(',').map(o => o.trim());
          }
        } else {
          opsiArray = teksBersih.split(',').map(o => o.trim());
        }
      }
    }

    // Jika opsi yang terkumpul kurang dari 4, tambahkan opsi dummy agar layout tidak pecah
    while (opsiArray.length < 4) {
      opsiArray.push(`Pilihan ${String.fromCharCode(65 + opsiArray.length)}`);
    }

    return {
      id: `exam-${index + 1}`,
      text: row.text || 'Teks pertanyaan belum diisi di database',
      type: row.type || config.questionTypes[0],
      difficulty: row.difficulty || 'sedang',
      subject: row.subject,
      grade: row.grade || 'SD',
      phase: row.phase,
      classLevel: row.class_level,
      topic: row.topic || 'Umum',
      options: opsiArray,
      correctAnswer: row.correct_answer || (opsiArray[0] ?? ''),
      explanation: row.explanation || 'Tidak ada pembahasan.',
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
