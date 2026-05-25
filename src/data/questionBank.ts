import { Question, Difficulty, SubjectKey, GradeLevel, QuestionOption, Phase } from '../types';

// Helper to generate unique IDs
let idCounter = 0;
const genId = () => `q-${++idCounter}-${Math.random().toString(36).substring(2, 7)}`;

// Map old grade levels to default phase/class
function gradeToPhase(grade: GradeLevel): Phase {
  switch (grade) {
    case 'sd': return 'C'; // default to fase C (kelas 5-6)
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

// ===== MATEMATIKA =====
const matematikaPG: Partial<Question>[] = [
  // Fase A (Kelas 1-2)
  { text: 'Hasil dari 5 + 3 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '7', isCorrect: false }, { label: 'B', text: '8', isCorrect: true }, { label: 'C', text: '9', isCorrect: false }, { label: 'D', text: '6', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hasil dari 12 - 7 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '4', isCorrect: false }, { label: 'B', text: '6', isCorrect: false }, { label: 'C', text: '5', isCorrect: true }, { label: 'D', text: '7', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Bilangan yang berada di antara 15 dan 17 adalah ...', topic: 'Bilangan Cacah', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '14', isCorrect: false }, { label: 'B', text: '16', isCorrect: true }, { label: 'C', text: '18', isCorrect: false }, { label: 'D', text: '13', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Pola bilangan: 2, 4, 6, 8, ... Bilangan selanjutnya adalah ...', topic: 'Pola Bilangan', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: '9', isCorrect: false }, { label: 'B', text: '10', isCorrect: true }, { label: 'C', text: '11', isCorrect: false }, { label: 'D', text: '12', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Bentuk bangun datar yang memiliki 4 sisi sama panjang adalah ...', topic: 'Bangun Datar Sederhana', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Segitiga', isCorrect: false }, { label: 'B', text: 'Persegi', isCorrect: true }, { label: 'C', text: 'Lingkaran', isCorrect: false }, { label: 'D', text: 'Trapesium', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hasil dari 18 + 25 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'sedang', options: [{ label: 'A', text: '43', isCorrect: true }, { label: 'B', text: '42', isCorrect: false }, { label: 'C', text: '44', isCorrect: false }, { label: 'D', text: '41', isCorrect: false }], correctAnswer: 'A' },

  // Fase B (Kelas 3-4)
  { text: 'Hasil dari 24 × 3 = ...', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: '62', isCorrect: false }, { label: 'B', text: '72', isCorrect: true }, { label: 'C', text: '82', isCorrect: false }, { label: 'D', text: '68', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hasil dari 84 ÷ 4 = ...', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: '20', isCorrect: false }, { label: 'B', text: '22', isCorrect: false }, { label: 'C', text: '21', isCorrect: true }, { label: 'D', text: '24', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Hasil dari 1/4 + 2/4 = ...', topic: 'Pecahan', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: '1/2', isCorrect: false }, { label: 'B', text: '3/4', isCorrect: true }, { label: 'C', text: '3/8', isCorrect: false }, { label: 'D', text: '1/4', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Luas persegi panjang dengan panjang 8 cm dan lebar 5 cm adalah ...', topic: 'Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: '35 cm²', isCorrect: false }, { label: 'B', text: '40 cm²', isCorrect: true }, { label: 'C', text: '45 cm²', isCorrect: false }, { label: 'D', text: '26 cm²', isCorrect: false }], correctAnswer: 'B' },
  { text: '1 km = ... m', topic: 'Satuan Ukur', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: '10', isCorrect: false }, { label: 'B', text: '100', isCorrect: false }, { label: 'C', text: '1.000', isCorrect: true }, { label: 'D', text: '10.000', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Ibu membeli 3.500 gram beras dan 1.750 gram gula. Berapa gram total belanjaan ibu?', topic: 'Satuan Ukur', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: '5.000 gram', isCorrect: false }, { label: 'B', text: '5.250 gram', isCorrect: true }, { label: 'C', text: '5.500 gram', isCorrect: false }, { label: 'D', text: '4.750 gram', isCorrect: false }], correctAnswer: 'B' },

  // Fase C (Kelas 5-6)
  { text: 'Hasil dari 457 + 238 = ...', topic: 'Bilangan Bulat', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: '695', isCorrect: true }, { label: 'B', text: '685', isCorrect: false }, { label: 'C', text: '705', isCorrect: false }, { label: 'D', text: '675', isCorrect: false }], correctAnswer: 'A' },
  { text: 'KPK dari 12 dan 18 adalah ...', topic: 'KPK & FPB', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: '24', isCorrect: false }, { label: 'B', text: '36', isCorrect: true }, { label: 'C', text: '48', isCorrect: false }, { label: 'D', text: '54', isCorrect: false }], correctAnswer: 'B' },
  { text: 'FPB dari 24 dan 36 adalah ...', topic: 'KPK & FPB', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: '6', isCorrect: false }, { label: 'B', text: '8', isCorrect: false }, { label: 'C', text: '12', isCorrect: true }, { label: 'D', text: '18', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Pecahan 3/5 jika diubah ke desimal menjadi ...', topic: 'Pecahan & Desimal', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: '0,3', isCorrect: false }, { label: 'B', text: '0,5', isCorrect: false }, { label: 'C', text: '0,6', isCorrect: true }, { label: 'D', text: '0,35', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Luas persegi panjang dengan panjang 12 cm dan lebar 8 cm adalah ...', topic: 'Bangun Ruang', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: '86 cm²', isCorrect: false }, { label: 'B', text: '96 cm²', isCorrect: true }, { label: 'C', text: '106 cm²', isCorrect: false }, { label: 'D', text: '40 cm²', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Keliling segitiga dengan sisi 5 cm, 7 cm, dan 10 cm adalah ...', topic: 'Bangun Ruang', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: '20 cm', isCorrect: false }, { label: 'B', text: '21 cm', isCorrect: false }, { label: 'C', text: '22 cm', isCorrect: true }, { label: 'D', text: '23 cm', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Hasil dari 756 ÷ 12 = ...', topic: 'Bilangan Bulat', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sulit', options: [{ label: 'A', text: '61', isCorrect: false }, { label: 'B', text: '62', isCorrect: false }, { label: 'C', text: '63', isCorrect: true }, { label: 'D', text: '64', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Skala peta 1 : 500.000. Jarak kota A ke B di peta 4 cm, jarak sebenarnya = ...', topic: 'Skala & Perbandingan', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sulit', options: [{ label: 'A', text: '10 km', isCorrect: false }, { label: 'B', text: '20 km', isCorrect: true }, { label: 'C', text: '25 km', isCorrect: false }, { label: 'D', text: '15 km', isCorrect: false }], correctAnswer: 'B' },

  // Fase D (Kelas 7-9 SMP)
  { text: 'Jika 3x + 7 = 22, maka nilai x = ...', topic: 'Aljabar', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: '3', isCorrect: false }, { label: 'B', text: '4', isCorrect: false }, { label: 'C', text: '5', isCorrect: true }, { label: 'D', text: '6', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Bentuk sederhana dari 4x² + 2x - x² + 3x = ...', topic: 'Aljabar', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', options: [{ label: 'A', text: '3x² + 5x', isCorrect: true }, { label: 'B', text: '5x² + 5x', isCorrect: false }, { label: 'C', text: '3x² + x', isCorrect: false }, { label: 'D', text: '3x² - x', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Penyelesaian dari 2x + 3y = 12 dan x - y = 1 adalah ...', topic: 'Persamaan Linear', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', options: [{ label: 'A', text: 'x = 2, y = 3', isCorrect: false }, { label: 'B', text: 'x = 3, y = 2', isCorrect: true }, { label: 'C', text: 'x = 4, y = 1', isCorrect: false }, { label: 'D', text: 'x = 1, y = 4', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Segitiga siku-siku memiliki sisi 3 cm and 4 cm. Panjang sisi miringnya = ...', topic: 'Pythagoras', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: '5 cm', isCorrect: true }, { label: 'B', text: '6 cm', isCorrect: false }, { label: 'C', text: '7 cm', isCorrect: false }, { label: 'D', text: '8 cm', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Rata-rata dari data 5, 8, 6, 9, 7 adalah ...', topic: 'Statistika', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'mudah', options: [{ label: 'A', text: '6', isCorrect: false }, { label: 'B', text: '7', isCorrect: true }, { label: 'C', text: '8', isCorrect: false }, { label: 'D', text: '9', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Median dari data 3, 7, 5, 9, 1 adalah ...', topic: 'Statistika', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', options: [{ label: 'A', text: '3', isCorrect: false }, { label: 'B', text: '5', isCorrect: true }, { label: 'C', text: '7', isCorrect: false }, { label: 'D', text: '9', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Jika A = {1, 2, 3, 4} dan B = {3, 4, 5, 6}, maka A ∩ B = ...', topic: 'Himpunan', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: '{1, 2}', isCorrect: false }, { label: 'B', text: '{3, 4}', isCorrect: true }, { label: 'C', text: '{5, 6}', isCorrect: false }, { label: 'D', text: '{1, 2, 5, 6}', isCorrect: false }], correctAnswer: 'B' },

  // Fase E (Kelas 10 SMA)
  { text: 'Nilai dari sin 30° = ...', topic: 'Trigonometri', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: '1/4', isCorrect: false }, { label: 'B', text: '1/2', isCorrect: true }, { label: 'C', text: '√2/2', isCorrect: false }, { label: 'D', text: '√3/2', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Nilai dari cos 60° + sin 30° = ...', topic: 'Trigonometri', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: '0', isCorrect: false }, { label: 'B', text: '1/2', isCorrect: false }, { label: 'C', text: '1', isCorrect: true }, { label: 'D', text: '√3', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Nilai dari ²log 8 = ...', topic: 'Logaritma & Eksponen', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: '2', isCorrect: false }, { label: 'B', text: '3', isCorrect: true }, { label: 'C', text: '4', isCorrect: false }, { label: 'D', text: '8', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Determinan matriks [[2, 3], [1, 4]] = ...', topic: 'Matriks', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: '3', isCorrect: false }, { label: 'B', text: '5', isCorrect: true }, { label: 'C', text: '7', isCorrect: false }, { label: 'D', text: '11', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Suku ke-10 barisan aritmetika 3, 7, 11, 15, ... adalah ...', topic: 'Barisan & Deret', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: '39', isCorrect: true }, { label: 'B', text: '41', isCorrect: false }, { label: 'C', text: '43', isCorrect: false }, { label: 'D', text: '37', isCorrect: false }], correctAnswer: 'A' },

  // Fase F (Kelas 11-12 SMA)
  { text: 'Nilai dari lim (x→2) (x² - 4)/(x - 2) = ...', topic: 'Limit', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sedang', options: [{ label: 'A', text: '2', isCorrect: false }, { label: 'B', text: '4', isCorrect: true }, { label: 'C', text: '0', isCorrect: false }, { label: 'D', text: '∞', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Turunan pertama dari f(x) = 3x² + 2x - 5 adalah ...', topic: 'Turunan', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'mudah', options: [{ label: 'A', text: '6x + 2', isCorrect: true }, { label: 'B', text: '6x - 2', isCorrect: false }, { label: 'C', text: '3x + 2', isCorrect: false }, { label: 'D', text: '6x² + 2', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Hasil dari ∫ 2x dx = ...', topic: 'Integral', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'mudah', options: [{ label: 'A', text: 'x² + C', isCorrect: true }, { label: 'B', text: '2x² + C', isCorrect: false }, { label: 'C', text: 'x + C', isCorrect: false }, { label: 'D', text: '2 + C', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Daerah penyelesaian dari x + 2y ≤ 8, x ≥ 0, y ≥ 0 berbentuk ...', topic: 'Program Linear', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'sedang', options: [{ label: 'A', text: 'Segitiga', isCorrect: true }, { label: 'B', text: 'Segiempat', isCorrect: false }, { label: 'C', text: 'Segilima', isCorrect: false }, { label: 'D', text: 'Lingkaran', isCorrect: false }], correctAnswer: 'A' },
];

// ===== IPA =====
const ipaPG: Partial<Question>[] = [
  // Fase A
  { text: 'Contoh benda hidup di sekitar kita adalah ...', topic: 'Makhluk Hidup & Tak Hidup', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Batu', isCorrect: false }, { label: 'B', text: 'Kucing', isCorrect: true }, { label: 'C', text: 'Meja', isCorrect: false }, { label: 'D', text: 'Air', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Indra yang digunakan untuk mencium bau adalah ...', topic: 'Bagian Tubuh Manusia', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Mata', isCorrect: false }, { label: 'B', text: 'Telinga', isCorrect: false }, { label: 'C', text: 'Hidung', isCorrect: true }, { label: 'D', text: 'Lidah', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Saat langit mendung dan gelap, kemungkinan akan terjadi ...', topic: 'Cuaca & Musim', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Hujan', isCorrect: true }, { label: 'B', text: 'Panas terik', isCorrect: false }, { label: 'C', text: 'Salju', isCorrect: false }, { label: 'D', text: 'Pelangi', isCorrect: false }], correctAnswer: 'A' },

  // Fase B
  { text: 'Bagian tumbuhan yang berfungsi untuk menyerap air dan mineral dari dalam tanah = ...', topic: 'Tumbuhan', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Daun', isCorrect: false }, { label: 'B', text: 'Batang', isCorrect: false }, { label: 'C', text: 'Akar', isCorrect: true }, { label: 'D', text: 'Bunga', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Hewan yang berkembang biak dengan cara bertelur disebut ...', topic: 'Hewan', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Vivipar', isCorrect: false }, { label: 'B', text: 'Ovipar', isCorrect: true }, { label: 'C', text: 'Ovovivipar', isCorrect: false }, { label: 'D', text: 'Vegetatif', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Sumber energi terbesar di bumi adalah ...', topic: 'Energi', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Angin', isCorrect: false }, { label: 'B', text: 'Air', isCorrect: false }, { label: 'C', text: 'Matahari', isCorrect: true }, { label: 'D', text: 'Batu bara', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Pelangi terjadi karena peristiwa ...', topic: 'Cahaya', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options:
