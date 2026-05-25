import { Question, Difficulty, SubjectKey, GradeLevel, QuestionOption, Phase } from '../types';

// Helper untuk generate unique ID secara otomatis
let idCounter = 0;
const genId = () => `q-${++idCounter}-${Math.random().toString(36).substring(2, 7)}`;

// Map tingkatan kelas lama ke default fase/kelas Kurikulum Merdeka
function gradeToPhase(grade: GradeLevel): Phase {
  switch (grade) {
    case 'sd': return 'C'; // default ke fase C (kelas 5-6)
    case 'smp': return 'D';
    case 'sma': return 'F';
  }
}
function gradeToClass(grade: GradeLevel): string {
  switch (grade) {
    case 'sd': return '5';
    case 'smp': return '8';
    case 'sma': return '11';
  }
}

// ===== BANK SOAL: MATEMATIKA =====
const matematikaPG: Partial<Question>[] = [
  // Fase A (Kelas 1-2)
  { text: 'Hasil dari 5 + 3 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '7', isCorrect: false }, { label: 'B', text: '8', isCorrect: true }, { label: 'C', text: '9', isCorrect: false }, { label: 'D', text: '6', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hasil dari 12 - 7 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '5', isCorrect: true }, { label: 'B', text: '6', isCorrect: false }, { label: 'C', text: '4', isCorrect: false }, { label: 'D', text: '7', isCorrect: false }], correctAnswer: 'A' },
  // Fase B (Kelas 3-4)
  { text: 'Hasil perkalian dari 25 x 4 = ...', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: '75', isCorrect: false }, { label: 'B', text: '90', isCorrect: false }, { label: 'C', text: '100', isCorrect: true }, { label: 'D', text: '125', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Sebuah persegi memiliki sisi 6 cm. Luas persegi tersebut adalah ... cm²', topic: 'Geometri & Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: '24', isCorrect: false }, { label: 'B', text: '36', isCorrect: true }, { label: 'C', text: '12', isCorrect: false }, { label: 'D', text: '48', isCorrect: false }], correctAnswer: 'B' },
  // Fase C (Kelas 5-6)
  { text: 'KPK dari 12 dan 18 adalah ...', topic: 'FPB & KPK', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: '36', isCorrect: true }, { label: 'B', text: '72', isCorrect: false }, { label: 'C', text: '6', isCorrect: false }, { label: 'D', text: '54', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Hasil dari 1/2 + 1/4 = ...', topic: 'Pecahan', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: '2/4', isCorrect: false }, { label: 'B', text: '3/4', isCorrect: true }, { label: 'C', text: '2/6', isCorrect: false }, { label: 'D', text: '1/6', isCorrect: false }], correctAnswer: 'B' },
  // Fase D (Kelas 7-9 SMP)
  { text: 'Jika 3x + 5 = 14, maka nilai x adalah ...', topic: 'Aljabar', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', options: [{ label: 'A', text: '2', isCorrect: false }, { label: 'B', text: '3', isCorrect: true }, { label: 'C', text: '4', isCorrect: false }, { label: 'D', text: '5', isCorrect: false }], correctAnswer: 'B' },
  // Fase E/F (Kelas 10-12 SMA)
  { text: 'Turunan pertama dari f(x) = 3x² + 5x - 2 adalah ...', topic: 'Kalkulus', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sulit', options: [{ label: 'A', text: '6x + 5', isCorrect: true }, { label: 'B', text: '3x + 5', isCorrect: false }, { label: 'C', text: '6x', isCorrect: false }, { label: 'D', text: '6x² + 5', isCorrect: false }], correctAnswer: 'A' }
];

// ===== BANK SOAL: IPA / IPAS =====
const ipaPG: Partial<Question>[] = [
  // Fase A
  { text: 'Bagian tubuh yang digunakan untuk melihat adalah ...', topic: 'Pancaindra', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Telinga', isCorrect: false }, { label: 'B', text: 'Hidung', isCorrect: false }, { label: 'C', text: 'Mata', isCorrect: true }, { label: 'D', text: 'Lidah', isCorrect: false }], correctAnswer: 'C' },
  // Fase B (Tempat Error Terjadi Sebelumnya)
  { text: 'Pelangi terjadi karena peristiwa ...', topic: 'Cahaya', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'Pemantulan cahaya', isCorrect: false }, { label: 'B', text: 'Pembiasan cahaya', isCorrect: true }, { label: 'C', text: 'Penyerapan cahaya', isCorrect: false }, { label: 'D', text: 'Perambatan lurus', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Benda berikut yang termasuk isolator panas adalah ...', topic: 'Sifat dan Wujud Benda', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Besi', isCorrect: false }, { label: 'B', text: 'Aluminium', isCorrect: false }, { label: 'C', text: 'Kayu', isCorrect: true }, { label: 'D', text: 'Tembaga', isCorrect: false }], correctAnswer: 'C' },
  // Fase C
  { text: 'Alat pernapasan pada hewan lumba-lumba adalah ...', topic: 'Sistem Pernapasan Hewan', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Insang', isCorrect: false }, { label: 'B', text: 'Paru-paru', isCorrect: true }, { label: 'C', text: 'Trakea', isCorrect: false }, { label: 'D', text: 'Kulit', isCorrect: false }], correctAnswer: 'B' },
  // Fase D
  { text: 'Organel sel yang berfungsi sebagai tempat respirasi seluler adalah ...', topic: 'Sistem Organisasi Kehidupan', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sulit', options: [{ label: 'A', text: 'Mitokondria', isCorrect: true }, { label: 'B', text: 'Ribosom', isCorrect: false }, { label: 'C', text: 'Lisosom', isCorrect: false }, { label: 'D', text: 'Badan golgi', isCorrect: false }], correctAnswer: 'A' }
];

// ===== BANK SOAL: BAHASA INDONESIA =====
const bahasaIndonesiaPG: Partial<Question>[] = [
  { text: 'Kalimat yang penulisan huruf kapitalnya benar adalah ...', topic: 'Ejaan & Tanda Baca', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'ibu pergi ke pasar bersama sinta.', isCorrect: false }, { label: 'B', text: 'Ibu pergi ke Pasar bersama Sinta.', isCorrect: false }, { label: 'C', text: 'Ibu pergi ke pasar bersama Sinta.', isCorrect: true }, { label: 'D', text: 'Ibu Pergi Ke Pasar Bersama Sinta.', isCorrect: false }], correctAnswer: 'C' }
];

// ===== BANK SOAL: BENAR / SALAH =====
const benarSalahQuestions: Partial<Question>[] = [
  { text: 'Matahari terbit dari sebelah barat.', topic: 'Tata Surya', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', correctAnswer: 'Salah', subject: 'ipa' },
  { text: 'Sudut siku-siku memiliki besar 90 derajat.', topic: 'Geometri & Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', correctAnswer: 'Benar', subject: 'matematika' },
  { text: 'Oksigen merupakan gas yang dihirup manusia saat bernapas.', topic: 'Sistem Pernapasan Manusia', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', correctAnswer: 'Benar', subject: 'ipa' }
];

// ===== BANK SOAL: ISIAN SINGKAT =====
const shortAnswerQuestions: Partial<Question>[] = [
  { text: 'Ibu kota negara Indonesia saat ini adalah ...', topic: 'Pemerintahan', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', correctAnswer: 'Jakarta', subject: 'ips', explanation: 'Ibu kota Indonesia saat ini adalah Jakarta sebelum berpindah sepenuhnya ke IKN.' },
  { text: 'Zat hijau daun yang berperan dalam proses fotosintesis disebut ...', topic: 'Fotosintesis', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', correctAnswer: 'Klorofil', subject: 'ipa', explanation: 'Klorofil menangkap cahaya matahari untuk fotosintesis.' },
  { text: 'Hasil dari 15 x 4 adalah ...', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', correctAnswer: '60', subject: 'matematika' }
];

// ===== BANK SOAL: PILIHAN GANDA KOMPLEKS =====
const pgKompleksQuestions: Partial<Question>[] = [
  {
    text: 'Manakah dari pernyataan berikut yang merupakan sifat-sifat dari bangun datar persegi panjang? (Pilih semua yang benar)',
    topic: 'Geometri & Bangun Datar',
    grade: 'sd',
    phase: 'B',
    classLevel: '4',
    difficulty: 'sedang',
    subject: 'matematika',
    options: [
      { label: 'A', text: 'Memiliki 4 sisi sama panjang', isCorrect: false },
      { label: 'B', text: 'Sisi yang berhadapan sejajar dan sama panjang', isCorrect: true },
      { label: 'C', text: 'Keempat sudutnya berbentuk siku-siku (90°)', isCorrect: true },
      { label: 'D', text: 'Memiliki dua pasang diagonal yang tidak sama panjang', isCorrect: false }
    ],
    correctAnswer: 'B, C',
    explanation: 'Persegi panjang memiliki sisi berhadapan sama panjang dan seluruh sudutnya siku-siku.'
  },
  {
    text: 'Pilihlah hewan-hewan berikut yang berkembang biak dengan cara melahirkan (vivipar)!',
    topic: 'Perkembangbiakan Hewan',
    grade: 'sd',
    phase: 'C',
    classLevel: '6',
    difficulty: 'sedang',
    subject: 'ipa',
    options: [
      { label: 'A', text: 'Sapi', isCorrect: true },
      { label: 'B', text: 'Ayam', isCorrect: false },
      { label: 'C', text: 'Paus', isCorrect: true },
      { label: 'D', text: 'Kura-kura', isCorrect: false }
    ],
    correctAnswer: 'A, C',
    explanation: 'Sapi dan paus merupakan mamalia yang berkembang biak secara vivipar (melahirkan).'
  }
];

// ===== BANK SOAL: ESSAY / URAIAN =====
const essayQuestions: Partial<Question>[] = [
  { text: 'Jelaskan proses terjadinya siklus air secara singkat!', topic: 'Siklus Air', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', correctAnswer: 'Uraian bebas siswa mengenai Evaporasi, Kondensasi, dan Presipitasi.', subject: 'ipa', explanation: 'Siklus air melibatkan penguapan, pembentukan awan, dan terjadinya hujan.' },
  { text: 'Sebutkan 3 cara untuk menjaga kesehatan organ pencernaan kita!', topic: 'Sistem Pencernaan Manusia', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', correctAnswer: 'Makan berserat, minum air cukup, makan teratur.', subject: 'ipa' }
];

// ===== FUNGSI PEMROSES DAN KOLEKTOR DATA UTAMA =====
const loadAllQuestions = (): Question[] => {
  const questions: Question[] = [];

  // Pendorong fungsi untuk format Pilihan Ganda (PG) reguler
  const processPG = (rawList: Partial<Question>[], subjectKey: SubjectKey) => {
    rawList.forEach((q) => {
      questions.push({
        id: genId(),
        text: q.text!,
        type: 'pilihan_ganda',
        difficulty: q.difficulty as Difficulty,
        subject: subjectKey,
        grade: q.grade as GradeLevel,
        phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
        classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
        topic: q.topic!,
        options: q.options as QuestionOption[],
        correctAnswer: q.correctAnswer!,
        explanation: q.explanation,
        points: q.difficulty === 'mudah' ? 1 : q.difficulty === 'sedang' ? 2 : 3,
      });
    });
  };

  processPG(matematikaPG, 'matematika');
  processPG(ipaPG, 'ipa');
  processPG(bahasaIndonesiaPG, 'bahasa_indonesia');

  // Memproses Benar / Salah
  benarSalahQuestions.forEach((q) => {
    questions.push({
      id: genId(),
      text: q.text!,
      type: 'benar_salah',
      difficulty: q.difficulty as Difficulty,
      subject: q.subject as SubjectKey,
      grade: q.grade as GradeLevel,
      phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
      classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
      topic: q.topic!,
      options: [
        { label: 'A', text: 'Benar', isCorrect: q.correctAnswer === 'Benar' },
        { label: 'B', text: 'Salah', isCorrect: q.correctAnswer === 'Salah' },
      ],
      correctAnswer: q.correctAnswer!,
      points: 1,
    });
  });

  // Memproses Isian Singkat
  shortAnswerQuestions.forEach((q) => {
    questions.push({
      id: genId(),
      text: q.text!,
      type: 'isian_singkat',
      difficulty: q.difficulty as Difficulty,
      subject: q.subject as SubjectKey,
      grade: q.grade as GradeLevel,
      phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
      classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
      topic: q.topic!,
      correctAnswer: q.correctAnswer!,
      explanation: q.explanation,
      points: q.difficulty === 'mudah' ? 2 : q.difficulty === 'sedang' ? 3 : 5,
    });
  });

  // Memproses Pilihan Ganda Kompleks
  pgKompleksQuestions.forEach((q) => {
    questions.push({
      id: genId(),
      text: q.text!,
      type: 'pilihan_ganda_kompleks',
      difficulty: q.difficulty as Difficulty,
      subject: q.subject as SubjectKey,
      grade: q.grade as GradeLevel,
      phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
      classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
      topic: q.topic!,
      options: q.options as QuestionOption[],
      correctAnswer: q.correctAnswer!,
      explanation: q.explanation,
      points: q.difficulty === 'mudah' ? 3 : q.difficulty === 'sedang' ? 4 : 6,
    });
  });

  // Memproses Essay / Uraian
  essayQuestions.forEach((q) => {
    questions.push({
      id: genId(),
      text: q.text!,
      type: 'essay',
      difficulty: q.difficulty as Difficulty,
      subject: q.subject as SubjectKey,
      grade: q.grade as GradeLevel,
      phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
      classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
      topic: q.topic!,
      correctAnswer: q.correctAnswer!,
      explanation: q.explanation,
      points: q.difficulty === 'mudah' ? 4 : q.difficulty === 'sedang' ? 6 : 10,
    });
  });

  return questions;
};

// Ekspor final yang dipanggil oleh generator utama aplikasi
export const questionBank = loadAllQuestions();
