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
  { text: 'Segitiga siku-siku memiliki sisi 3 cm dan 4 cm. Panjang sisi miringnya = ...', topic: 'Pythagoras', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: '5 cm', isCorrect: true }, { label: 'B', text: '6 cm', isCorrect: false }, { label: 'C', text: '7 cm', isCorrect: false }, { label: 'D', text: '8 cm', isCorrect: false }], correctAnswer: 'A' },
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
  { text: 'Pelangi terjadi karena peristiwa ...', topic: 'Cahaya', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'Pemantulan cahaya', isCorrect: false }, { label: 'B', text: 'Pembiasan cahaya', isCorrect: false }, { label: 'C', text: 'Dispersi cahaya', isCorrect: true }, { label: 'D', text: 'Difraksi cahaya', isCorrect: false }], correctAnswer: 'C' },

  // Fase C
  { text: 'Urutan siklus air yang benar adalah ...', topic: 'Siklus Air', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Evaporasi - Kondensasi - Presipitasi', isCorrect: true }, { label: 'B', text: 'Kondensasi - Evaporasi - Presipitasi', isCorrect: false }, { label: 'C', text: 'Presipitasi - Evaporasi - Kondensasi', isCorrect: false }, { label: 'D', text: 'Evaporasi - Presipitasi - Kondensasi', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Planet terdekat dengan matahari adalah ...', topic: 'Bumi & Alam Semesta', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: 'Venus', isCorrect: false }, { label: 'B', text: 'Merkurius', isCorrect: true }, { label: 'C', text: 'Mars', isCorrect: false }, { label: 'D', text: 'Bumi', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Garam dapur jika dilarutkan dalam air termasuk campuran ...', topic: 'Campuran & Larutan', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Homogen', isCorrect: true }, { label: 'B', text: 'Heterogen', isCorrect: false }, { label: 'C', text: 'Koloid', isCorrect: false }, { label: 'D', text: 'Suspensi', isCorrect: false }], correctAnswer: 'A' },

  // Fase D (SMP)
  { text: 'Enzim ptialin pada mulut berfungsi mengubah ...', topic: 'Sistem Pencernaan', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', options: [{ label: 'A', text: 'Protein menjadi asam amino', isCorrect: false }, { label: 'B', text: 'Lemak menjadi asam lemak', isCorrect: false }, { label: 'C', text: 'Amilum menjadi maltosa', isCorrect: true }, { label: 'D', text: 'Glukosa menjadi energi', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Sel darah merah (eritrosit) berfungsi untuk ...', topic: 'Sistem Peredaran Darah', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: 'Melawan kuman', isCorrect: false }, { label: 'B', text: 'Mengedarkan oksigen', isCorrect: true }, { label: 'C', text: 'Pembekuan darah', isCorrect: false }, { label: 'D', text: 'Mengangkut hormon', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Satuan gaya dalam SI adalah ...', topic: 'Gaya & Gerak', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: 'Joule', isCorrect: false }, { label: 'B', text: 'Watt', isCorrect: false }, { label: 'C', text: 'Newton', isCorrect: true }, { label: 'D', text: 'Pascal', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Hukum Newton I menyatakan tentang ...', topic: 'Gaya & Gerak', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', options: [{ label: 'A', text: 'Kelembaman', isCorrect: true }, { label: 'B', text: 'Percepatan', isCorrect: false }, { label: 'C', text: 'Aksi-reaksi', isCorrect: false }, { label: 'D', text: 'Gravitasi', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Arus listrik mengalir dari potensial ...', topic: 'Listrik', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', options: [{ label: 'A', text: 'Rendah ke tinggi', isCorrect: false }, { label: 'B', text: 'Tinggi ke rendah', isCorrect: true }, { label: 'C', text: 'Sama ke sama', isCorrect: false }, { label: 'D', text: 'Netral ke positif', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hubungan antara makhluk hidup dengan lingkungannya dipelajari dalam ilmu ...', topic: 'Ekosistem', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: 'Biologi', isCorrect: false }, { label: 'B', text: 'Ekologi', isCorrect: true }, { label: 'C', text: 'Zoologi', isCorrect: false }, { label: 'D', text: 'Botani', isCorrect: false }], correctAnswer: 'B' },

  // Fase E (SMA Kelas 10)
  { text: 'Sebuah benda bergerak dengan v₀ = 10 m/s dan a = 2 m/s². Kecepatan setelah 5 detik = ...', topic: 'Kinematika', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: '15 m/s', isCorrect: false }, { label: 'B', text: '20 m/s', isCorrect: true }, { label: 'C', text: '25 m/s', isCorrect: false }, { label: 'D', text: '30 m/s', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Berdasarkan Hukum Newton II, F = m × a. Jika m = 5 kg dan a = 3 m/s², maka F = ...', topic: 'Dinamika', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: '10 N', isCorrect: false }, { label: 'B', text: '15 N', isCorrect: true }, { label: 'C', text: '20 N', isCorrect: false }, { label: 'D', text: '8 N', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Reaksi antara asam dan basa menghasilkan ...', topic: 'Reaksi Kimia', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: 'Garam dan air', isCorrect: true }, { label: 'B', text: 'Gas dan air', isCorrect: false }, { label: 'C', text: 'Oksida dan air', isCorrect: false }, { label: 'D', text: 'Logam dan air', isCorrect: false }], correctAnswer: 'A' },

  // Fase F (SMA Kelas 11-12)
  { text: 'Perubahan kalor tanpa perubahan suhu disebut ...', topic: 'Termodinamika', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sedang', options: [{ label: 'A', text: 'Kalor jenis', isCorrect: false }, { label: 'B', text: 'Kapasitas kalor', isCorrect: false }, { label: 'C', text: 'Kalor laten', isCorrect: true }, { label: 'D', text: 'Kalor sensibel', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Induksi elektromagnetik ditemukan oleh ...', topic: 'Listrik & Magnet', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'sedang', options: [{ label: 'A', text: 'Newton', isCorrect: false }, { label: 'B', text: 'Faraday', isCorrect: true }, { label: 'C', text: 'Ampere', isCorrect: false }, { label: 'D', text: 'Ohm', isCorrect: false }], correctAnswer: 'B' },
];

// ===== IPAS =====
const ipasPG: Partial<Question>[] = [
  // Fase A
  { text: 'Contoh benda tak hidup di kelas adalah ...', topic: 'Benda di Sekitar Kita', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Kucing', isCorrect: false }, { label: 'B', text: 'Pohon', isCorrect: false }, { label: 'C', text: 'Meja', isCorrect: true }, { label: 'D', text: 'Ikan', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Saat cuaca hujan, kita sebaiknya membawa ...', topic: 'Cuaca Harian', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Topi renang', isCorrect: false }, { label: 'B', text: 'Payung', isCorrect: true }, { label: 'C', text: 'Kacamata hitam', isCorrect: false }, { label: 'D', text: 'Selimut', isCorrect: false }], correctAnswer: 'B' },

  // Fase B
  { text: 'Interaksi antara makhluk hidup dan lingkungannya disebut ...', topic: 'Makhluk Hidup dan Lingkungannya', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Ekosistem', isCorrect: true }, { label: 'B', text: 'Rotasi', isCorrect: false }, { label: 'C', text: 'Evaporasi', isCorrect: false }, { label: 'D', text: 'Migrasi', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Contoh sumber energi yang dapat diperbarui adalah ...', topic: 'Energi di Sekitar Kita', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Batu bara', isCorrect: false }, { label: 'B', text: 'Minyak bumi', isCorrect: false }, { label: 'C', text: 'Matahari', isCorrect: true }, { label: 'D', text: 'Gas alam', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Kenampakan alam berupa daratan luas yang ditumbuhi pohon disebut ...', topic: 'Kenampakan Alam', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Laut', isCorrect: false }, { label: 'B', text: 'Hutan', isCorrect: true }, { label: 'C', text: 'Sungai', isCorrect: false }, { label: 'D', text: 'Teluk', isCorrect: false }], correctAnswer: 'B' },

  // Fase C
  { text: 'Rantai makanan yang benar adalah ...', topic: 'Ekosistem', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Elang - padi - tikus', isCorrect: false }, { label: 'B', text: 'Padi - tikus - ular - elang', isCorrect: true }, { label: 'C', text: 'Tikus - padi - elang', isCorrect: false }, { label: 'D', text: 'Ular - tikus - padi', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Perubahan wujud dari cair menjadi gas disebut ...', topic: 'Perubahan Wujud Benda', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Mencair', isCorrect: false }, { label: 'B', text: 'Membeku', isCorrect: false }, { label: 'C', text: 'Menguap', isCorrect: true }, { label: 'D', text: 'Menyublim', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Berikut ini yang termasuk sumber daya alam yang tidak dapat diperbarui adalah ...', topic: 'Sumber Daya Alam', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', options: [{ label: 'A', text: 'Angin', isCorrect: false }, { label: 'B', text: 'Matahari', isCorrect: false }, { label: 'C', text: 'Minyak bumi', isCorrect: true }, { label: 'D', text: 'Air', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Sikap yang tepat dalam menghargai keragaman budaya adalah ...', topic: 'Keragaman Budaya Indonesia', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: 'Mengejek budaya daerah lain', isCorrect: false }, { label: 'B', text: 'Mempelajari tarian daerah lain', isCorrect: true }, { label: 'C', text: 'Merasa budaya sendiri paling hebat', isCorrect: false }, { label: 'D', text: 'Menolak perbedaan adat', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Contoh perubahan sosial sederhana di lingkungan sekitar adalah ...', topic: 'Perubahan Sosial Sederhana', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', options: [{ label: 'A', text: 'Gunung meletus', isCorrect: false }, { label: 'B', text: 'Penggunaan pembayaran digital di kantin', isCorrect: true }, { label: 'C', text: 'Hujan deras', isCorrect: false }, { label: 'D', text: 'Pasang surut air laut', isCorrect: false }], correctAnswer: 'B' },
];

// ===== BAHASA INDONESIA =====
const bahasaIndonesiaPG: Partial<Question>[] = [
  // Fase A
  { text: 'Huruf pertama dari kata "Buku" adalah ...', topic: 'Menulis Huruf & Kata', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'A', isCorrect: false }, { label: 'B', text: 'B', isCorrect: true }, { label: 'C', text: 'C', isCorrect: false }, { label: 'D', text: 'D', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Menyimak cerita dengan baik berarti kita harus ...', topic: 'Menyimak', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Bermain sendiri', isCorrect: false }, { label: 'B', text: 'Mendengarkan dengan saksama', isCorrect: true }, { label: 'C', text: 'Berbicara terus', isCorrect: false }, { label: 'D', text: 'Tidur', isCorrect: false }], correctAnswer: 'B' },

  // Fase B
  { text: 'Tanda baca yang digunakan di akhir kalimat tanya adalah ...', topic: 'Tanda Baca', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Titik (.)', isCorrect: false }, { label: 'B', text: 'Koma (,)', isCorrect: false }, { label: 'C', text: 'Tanda seru (!)', isCorrect: false }, { label: 'D', text: 'Tanda tanya (?)', isCorrect: true }], correctAnswer: 'D' },
  { text: 'Kalimat efektif adalah kalimat yang ...', topic: 'Kalimat Efektif', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'Panjang dan bertele-tele', isCorrect: false }, { label: 'B', text: 'Mudah dipahami dan tidak ambigu', isCorrect: true }, { label: 'C', text: 'Menggunakan kata-kata asing', isCorrect: false }, { label: 'D', text: 'Memiliki banyak klausa', isCorrect: false }], correctAnswer: 'B' },
  { text: '"Bait" dalam puisi adalah ...', topic: 'Puisi Anak', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Judul puisi', isCorrect: false }, { label: 'B', text: 'Kumpulan baris dalam puisi', isCorrect: true }, { label: 'C', text: 'Tema puisi', isCorrect: false }, { label: 'D', text: 'Pengarang puisi', isCorrect: false }], correctAnswer: 'B' },

  // Fase C
  { text: 'Kata yang memiliki arti sama disebut ...', topic: 'Sinonim & Antonim', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Antonim', isCorrect: false }, { label: 'B', text: 'Homonim', isCorrect: false }, { label: 'C', text: 'Sinonim', isCorrect: true }, { label: 'D', text: 'Polisemi', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Paragraf yang kalimat utamanya di awal paragraf disebut paragraf ...', topic: 'Paragraf', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', options: [{ label: 'A', text: 'Induktif', isCorrect: false }, { label: 'B', text: 'Deduktif', isCorrect: true }, { label: 'C', text: 'Campuran', isCorrect: false }, { label: 'D', text: 'Naratif', isCorrect: false }], correctAnswer: 'B' },

  // Fase D (SMP)
  { text: 'Teks yang berisi langkah-langkah melakukan sesuatu disebut teks ...', topic: 'Teks Prosedur', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: 'Narasi', isCorrect: false }, { label: 'B', text: 'Eksposisi', isCorrect: false }, { label: 'C', text: 'Prosedur', isCorrect: true }, { label: 'D', text: 'Deskripsi', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Struktur teks narasi yang benar adalah ...', topic: 'Teks Narasi', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', options: [{ label: 'A', text: 'Orientasi - Komplikasi - Resolusi', isCorrect: true }, { label: 'B', text: 'Tesis - Argumen - Kesimpulan', isCorrect: false }, { label: 'C', text: 'Pembuka - Isi - Penutup', isCorrect: false }, { label: 'D', text: 'Pendahuluan - Diskusi - Simpulan', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Unsur intrinsik cerpen meliputi, kecuali ...', topic: 'Puisi & Prosa', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', options: [{ label: 'A', text: 'Tema', isCorrect: false }, { label: 'B', text: 'Alur', isCorrect: false }, { label: 'C', text: 'Penokohan', isCorrect: false }, { label: 'D', text: 'Biografi pengarang', isCorrect: true }], correctAnswer: 'D' },

  // Fase E (SMA 10)
  { text: 'Teks anekdot bertujuan untuk ...', topic: 'Teks Anekdot', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: 'Menghibur dengan sindiran halus', isCorrect: true }, { label: 'B', text: 'Meyakinkan pembaca', isCorrect: false }, { label: 'C', text: 'Menjelaskan prosedur', isCorrect: false }, { label: 'D', text: 'Memberikan informasi ilmiah', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Struktur teks negosiasi yang benar adalah ...', topic: 'Teks Negosiasi', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: 'Orientasi - Pengajuan - Penawaran - Persetujuan', isCorrect: true }, { label: 'B', text: 'Tesis - Argumen - Rekomendasi', isCorrect: false }, { label: 'C', text: 'Abstrak - Orientasi - Krisis - Reaksi', isCorrect: false }, { label: 'D', text: 'Pendahuluan - Isi - Kesimpulan', isCorrect: false }], correctAnswer: 'A' },

  // Fase F (SMA 11-12)
  { text: 'Karya tulis ilmiah harus bersifat ...', topic: 'Karya Ilmiah', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'mudah', options: [{ label: 'A', text: 'Subjektif dan emosional', isCorrect: false }, { label: 'B', text: 'Objektif dan sistematis', isCorrect: true }, { label: 'C', text: 'Imajinatif dan kreatif', isCorrect: false }, { label: 'D', text: 'Persuasif dan provokatif', isCorrect: false }], correctAnswer: 'B' },
];

// ===== BAHASA INGGRIS =====
const bahasaInggrisPG: Partial<Question>[] = [
  // Fase A
  { text: 'What is the meaning of "Good Morning"?', topic: 'Greetings', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Selamat malam', isCorrect: false }, { label: 'B', text: 'Selamat pagi', isCorrect: true }, { label: 'C', text: 'Selamat siang', isCorrect: false }, { label: 'D', text: 'Selamat tinggal', isCorrect: false }], correctAnswer: 'B' },
  { text: 'How do you say angka "15" in English?', topic: 'Numbers & Colors', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Thirteen', isCorrect: false }, { label: 'B', text: 'Fourteen', isCorrect: false }, { label: 'C', text: 'Fifteen', isCorrect: true }, { label: 'D', text: 'Fifty', isCorrect: false }], correctAnswer: 'C' },

  // Fase B
  { text: '"My father\'s mother" is my ...', topic: 'Family Members', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'sedang', options: [{ label: 'A', text: 'Aunt', isCorrect: false }, { label: 'B', text: 'Grandmother', isCorrect: true }, { label: 'C', text: 'Sister', isCorrect: false }, { label: 'D', text: 'Mother', isCorrect: false }], correctAnswer: 'B' },
  { text: 'A cat has four ...', topic: 'Animals', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Wings', isCorrect: false }, { label: 'B', text: 'Fins', isCorrect: false }, { label: 'C', text: 'Legs', isCorrect: true }, { label: 'D', text: 'Tails', isCorrect: false }], correctAnswer: 'C' },

  // Fase C
  { text: 'What time is it? The clock shows 07:30. It is ...', topic: 'Telling Time', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Half past six', isCorrect: false }, { label: 'B', text: 'Half past seven', isCorrect: true }, { label: 'C', text: 'A quarter to seven', isCorrect: false }, { label: 'D', text: 'Seven o\'clock', isCorrect: false }], correctAnswer: 'B' },

  // Fase D (SMP)
  { text: 'She ___ to school every day.', topic: 'Simple Present Tense', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: 'go', isCorrect: false }, { label: 'B', text: 'goes', isCorrect: true }, { label: 'C', text: 'going', isCorrect: false }, { label: 'D', text: 'gone', isCorrect: false }], correctAnswer: 'B' },
  { text: 'They ___ football yesterday.', topic: 'Simple Past Tense', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: 'play', isCorrect: false }, { label: 'B', text: 'plays', isCorrect: false }, { label: 'C', text: 'played', isCorrect: true }, { label: 'D', text: 'playing', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Look! The children ___ in the park.', topic: 'Present Continuous', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', options: [{ label: 'A', text: 'play', isCorrect: false }, { label: 'B', text: 'plays', isCorrect: false }, { label: 'C', text: 'played', isCorrect: false }, { label: 'D', text: 'are playing', isCorrect: true }], correctAnswer: 'D' },
  { text: 'A text that tells about past events is called ...', topic: 'Recount Text', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', options: [{ label: 'A', text: 'Narrative text', isCorrect: false }, { label: 'B', text: 'Recount text', isCorrect: true }, { label: 'C', text: 'Descriptive text', isCorrect: false }, { label: 'D', text: 'Report text', isCorrect: false }], correctAnswer: 'B' },

  // Fase E (SMA 10)
  { text: 'The letter ___ by her yesterday. (passive voice)', topic: 'Passive Voice', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: 'was written', isCorrect: true }, { label: 'B', text: 'is written', isCorrect: false }, { label: 'C', text: 'wrote', isCorrect: false }, { label: 'D', text: 'has written', isCorrect: false }], correctAnswer: 'A' },
  { text: 'If I ___ rich, I would travel the world.', topic: 'Conditional Sentences', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: 'am', isCorrect: false }, { label: 'B', text: 'was', isCorrect: false }, { label: 'C', text: 'were', isCorrect: true }, { label: 'D', text: 'be', isCorrect: false }], correctAnswer: 'C' },

  // Fase F (SMA 11-12)
  { text: 'She said, "I am happy." In reported speech: She said that she ___ happy.', topic: 'Reported Speech', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sedang', options: [{ label: 'A', text: 'is', isCorrect: false }, { label: 'B', text: 'was', isCorrect: true }, { label: 'C', text: 'were', isCorrect: false }, { label: 'D', text: 'am', isCorrect: false }], correctAnswer: 'B' },
];

// ===== IPS =====
const ipsPG: Partial<Question>[] = [
  // Fase A
  { text: 'Anggota keluarga inti terdiri dari ...', topic: 'Keluarga & Lingkungan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Ayah, Ibu, Anak', isCorrect: true }, { label: 'B', text: 'Ayah, Ibu, Nenek', isCorrect: false }, { label: 'C', text: 'Kakek, Nenek, Paman', isCorrect: false }, { label: 'D', text: 'Guru, Teman, Tetangga', isCorrect: false }], correctAnswer: 'A' },

  // Fase B
  { text: 'Kegiatan menukar barang dengan barang disebut ...', topic: 'Kegiatan Ekonomi Sederhana', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Jual beli', isCorrect: false }, { label: 'B', text: 'Barter', isCorrect: true }, { label: 'C', text: 'Kredit', isCorrect: false }, { label: 'D', text: 'Ekspor', isCorrect: false }], correctAnswer: 'B' },

  // Fase C
  { text: 'Sumber daya alam yang tidak dapat diperbarui contohnya adalah ...', topic: 'Sumber Daya Alam', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Air', isCorrect: false }, { label: 'B', text: 'Hutan', isCorrect: false }, { label: 'C', text: 'Minyak bumi', isCorrect: true }, { label: 'D', text: 'Ikan', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Pahlawan yang dijuluki "Singa Padri" adalah ...', topic: 'Tokoh Pahlawan', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Imam Bonjol', isCorrect: true }, { label: 'B', text: 'Diponegoro', isCorrect: false }, { label: 'C', text: 'Cut Nyak Dhien', isCorrect: false }, { label: 'D', text: 'Pattimura', isCorrect: false }], correctAnswer: 'A' },

  // Fase D (SMP)
  { text: 'Interaksi sosial yang mengarah pada pertentangan disebut ...', topic: 'Interaksi Sosial', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', options: [{ label: 'A', text: 'Asimilasi', isCorrect: false }, { label: 'B', text: 'Akulturasi', isCorrect: false }, { label: 'C', text: 'Konflik', isCorrect: true }, { label: 'D', text: 'Kooperasi', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Proklamasi kemerdekaan Indonesia dibacakan pada tanggal ...', topic: 'Sejarah Indonesia', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', options: [{ label: 'A', text: '17 Agustus 1945', isCorrect: true }, { label: 'B', text: '1 Juni 1945', isCorrect: false }, { label: 'C', text: '28 Oktober 1928', isCorrect: false }, { label: 'D', text: '20 Mei 1908', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Letak astronomis Indonesia berada pada ...', topic: 'Geografi Indonesia', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', options: [{ label: 'A', text: '6°LU - 11°LS dan 95°BT - 141°BT', isCorrect: true }, { label: 'B', text: '5°LU - 10°LS dan 90°BT - 140°BT', isCorrect: false }, { label: 'C', text: '8°LU - 12°LS dan 95°BT - 145°BT', isCorrect: false }, { label: 'D', text: '6°LU - 11°LS dan 100°BT - 141°BT', isCorrect: false }], correctAnswer: 'A' },

  // Fase E
  { text: 'Tokoh sosiologi yang memperkenalkan solidaritas mekanik dan organik adalah ...', topic: 'Sosiologi', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: 'Max Weber', isCorrect: false }, { label: 'B', text: 'Emile Durkheim', isCorrect: true }, { label: 'C', text: 'Karl Marx', isCorrect: false }, { label: 'D', text: 'Auguste Comte', isCorrect: false }], correctAnswer: 'B' },

  // Fase F
  { text: 'Inflasi adalah keadaan dimana ...', topic: 'Ekonomi Makro', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'mudah', options: [{ label: 'A', text: 'Harga barang turun terus-menerus', isCorrect: false }, { label: 'B', text: 'Harga barang naik secara umum dan terus-menerus', isCorrect: true }, { label: 'C', text: 'Nilai mata uang naik', isCorrect: false }, { label: 'D', text: 'Pengangguran meningkat', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hukum permintaan menyatakan bahwa jika harga naik, maka ...', topic: 'Ekonomi Mikro', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'mudah', options: [{ label: 'A', text: 'Jumlah permintaan naik', isCorrect: false }, { label: 'B', text: 'Jumlah permintaan turun', isCorrect: true }, { label: 'C', text: 'Jumlah permintaan tetap', isCorrect: false }, { label: 'D', text: 'Jumlah penawaran turun', isCorrect: false }], correctAnswer: 'B' },
];

// ===== PKN =====
const pknPG: Partial<Question>[] = [
  // Fase A
  { text: 'Di sekolah kita harus menaati ...', topic: 'Aturan di Rumah & Sekolah', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Keinginan sendiri', isCorrect: false }, { label: 'B', text: 'Peraturan sekolah', isCorrect: true }, { label: 'C', text: 'Ajakan teman', isCorrect: false }, { label: 'D', text: 'Permainan', isCorrect: false }], correctAnswer: 'B' },

  // Fase B
  { text: 'Sila pertama Pancasila berbunyi ...', topic: 'Pancasila', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Kemanusiaan yang adil dan beradab', isCorrect: false }, { label: 'B', text: 'Ketuhanan Yang Maha Esa', isCorrect: true }, { label: 'C', text: 'Persatuan Indonesia', isCorrect: false }, { label: 'D', text: 'Keadilan sosial bagi seluruh rakyat Indonesia', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Norma yang bersumber dari hati nurani manusia disebut norma ...', topic: 'Norma', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'Agama', isCorrect: false }, { label: 'B', text: 'Kesusilaan', isCorrect: true }, { label: 'C', text: 'Kesopanan', isCorrect: false }, { label: 'D', text: 'Hukum', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Pengambilan keputusan bersama melalui musyawarah merupakan pengamalan sila ke ...', topic: 'Musyawarah', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: '3', isCorrect: false }, { label: 'B', text: '4', isCorrect: true }, { label: 'C', text: '5', isCorrect: false }, { label: 'D', text: '2', isCorrect: false }], correctAnswer: 'B' },

  // Fase C
  { text: 'Lambang sila ke-3 Pancasila adalah ...', topic: 'Lambang Negara', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Bintang', isCorrect: false }, { label: 'B', text: 'Rantai', isCorrect: false }, { label: 'C', text: 'Pohon Beringin', isCorrect: true }, { label: 'D', text: 'Kepala Banteng', isCorrect: false }], correctAnswer: 'C' },

  // Fase D (SMP)
  { text: 'UUD 1945 telah mengalami amandemen sebanyak ... kali', topic: 'UUD 1945', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', options: [{ label: 'A', text: '2', isCorrect: false }, { label: 'B', text: '3', isCorrect: false }, { label: 'C', text: '4', isCorrect: true }, { label: 'D', text: '5', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Sistem pemerintahan Indonesia berdasarkan UUD 1945 adalah ...', topic: 'Demokrasi', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', options: [{ label: 'A', text: 'Presidensial', isCorrect: true }, { label: 'B', text: 'Parlementer', isCorrect: false }, { label: 'C', text: 'Semi-presidensial', isCorrect: false }, { label: 'D', text: 'Monarki konstitusional', isCorrect: false }], correctAnswer: 'A' },
  { text: 'HAM adalah singkatan dari ...', topic: 'HAM', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'mudah', options: [{ label: 'A', text: 'Hak Asasi Manusia', isCorrect: true }, { label: 'B', text: 'Hukum Aturan Manusia', isCorrect: false }, { label: 'C', text: 'Hak Anak Muda', isCorrect: false }, { label: 'D', text: 'Hukum Adat Manusia', isCorrect: false }], correctAnswer: 'A' },

  // Fase E
  { text: 'Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea ke ...', topic: 'Ideologi Pancasila', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', options: [{ label: 'A', text: '1', isCorrect: false }, { label: 'B', text: '2', isCorrect: false }, { label: 'C', text: '3', isCorrect: false }, { label: 'D', text: '4', isCorrect: true }], correctAnswer: 'D' },
  { text: 'Lembaga negara yang berwenang menguji UU terhadap UUD adalah ...', topic: 'Sistem Pemerintahan', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', options: [{ label: 'A', text: 'Mahkamah Agung', isCorrect: false }, { label: 'B', text: 'Mahkamah Konstitusi', isCorrect: true }, { label: 'C', text: 'DPR', isCorrect: false }, { label: 'D', text: 'MPR', isCorrect: false }], correctAnswer: 'B' },

  // Fase F
  { text: 'Organisasi internasional yang bertugas menjaga perdamaian dunia adalah ...', topic: 'Hubungan Internasional', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'mudah', options: [{ label: 'A', text: 'ASEAN', isCorrect: false }, { label: 'B', text: 'PBB', isCorrect: true }, { label: 'C', text: 'NATO', isCorrect: false }, { label: 'D', text: 'OKI', isCorrect: false }], correctAnswer: 'B' },
];

// ===== AL-QUR'AN HADIS =====
const quranHadisPG: Partial<Question>[] = [
  { text: 'Huruf hijaiyah berjumlah ... huruf.', topic: 'Huruf Hijaiyah', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '26', isCorrect: false }, { label: 'B', text: '28', isCorrect: true }, { label: 'C', text: '29', isCorrect: false }, { label: 'D', text: '30', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hukum bacaan nun sukun bertemu ba disebut ...', topic: 'Tajwid Dasar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', options: [{ label: 'A', text: 'Izhar', isCorrect: false }, { label: 'B', text: 'Ikhfa', isCorrect: false }, { label: 'C', text: 'Iqlab', isCorrect: true }, { label: 'D', text: 'Idgham', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Surah Al-Ma\'un mengajarkan kita untuk ...', topic: 'Kandungan Surah Al-Ma\'un', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Bersikap sombong', isCorrect: false }, { label: 'B', text: 'Peduli kepada yatim dan fakir miskin', isCorrect: true }, { label: 'C', text: 'Meninggalkan salat', isCorrect: false }, { label: 'D', text: 'Memutus silaturahim', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Hadis tentang menuntut ilmu menekankan bahwa mencari ilmu itu ... bagi muslim.', topic: 'Hadis Tentang Menuntut Ilmu', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', options: [{ label: 'A', text: 'Sunnah', isCorrect: false }, { label: 'B', text: 'Mubah', isCorrect: false }, { label: 'C', text: 'Wajib', isCorrect: true }, { label: 'D', text: 'Makruh', isCorrect: false }], correctAnswer: 'C' },
];

// ===== AQIDAH AKHLAK =====
const aqidahAkhlakPG: Partial<Question>[] = [
  { text: 'Rukun iman berjumlah ...', topic: 'Rukun Iman Dasar', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: '4', isCorrect: false }, { label: 'B', text: '5', isCorrect: false }, { label: 'C', text: '6', isCorrect: true }, { label: 'D', text: '7', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Perilaku berkata jujur termasuk akhlak ...', topic: 'Sifat Terpuji', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Tercela', isCorrect: false }, { label: 'B', text: 'Terpuji', isCorrect: true }, { label: 'C', text: 'Buruk', isCorrect: false }, { label: 'D', text: 'Sombong', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Beriman kepada kitab Allah berarti meyakini adanya kitab-kitab yang diturunkan kepada ...', topic: 'Iman kepada Kitab Allah', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Malaikat', isCorrect: false }, { label: 'B', text: 'Rasul', isCorrect: true }, { label: 'C', text: 'Ulama', isCorrect: false }, { label: 'D', text: 'Sahabat', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Contoh husnuzan adalah ...', topic: 'Husnuzan', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', options: [{ label: 'A', text: 'Berprasangka buruk', isCorrect: false }, { label: 'B', text: 'Mencari kesalahan orang', isCorrect: false }, { label: 'C', text: 'Berprasangka baik kepada orang lain', isCorrect: true }, { label: 'D', text: 'Menyebarkan fitnah', isCorrect: false }], correctAnswer: 'C' },
];

// ===== FIKIH =====
const fikihPG: Partial<Question>[] = [
  { text: 'Sebelum salat, seorang muslim wajib berwudu jika ...', topic: 'Wudu dan Tayamum', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', options: [{ label: 'A', text: 'Sudah suci', isCorrect: false }, { label: 'B', text: 'Berhadas', isCorrect: true }, { label: 'C', text: 'Sedang puasa', isCorrect: false }, { label: 'D', text: 'Sedang belajar', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Salat fardu dalam sehari semalam berjumlah ... waktu.', topic: 'Salat Fardu', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: '3', isCorrect: false }, { label: 'B', text: '4', isCorrect: false }, { label: 'C', text: '5', isCorrect: true }, { label: 'D', text: '6', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Zakat fitrah dikeluarkan pada bulan ...', topic: 'Zakat Fitrah', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Muharram', isCorrect: false }, { label: 'B', text: 'Ramadhan', isCorrect: true }, { label: 'C', text: 'Safar', isCorrect: false }, { label: 'D', text: 'Rabiul Awal', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Salat yang wajib bagi laki-laki muslim balig pada hari Jumat adalah ...', topic: 'Salat Jumat', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: 'Salat Tahajud', isCorrect: false }, { label: 'B', text: 'Salat Duha', isCorrect: false }, { label: 'C', text: 'Salat Jumat', isCorrect: true }, { label: 'D', text: 'Salat Tarawih', isCorrect: false }], correctAnswer: 'C' },
];

// ===== SKI =====
const skiPG: Partial<Question>[] = [
  { text: 'Nabi Muhammad SAW lahir di kota ...', topic: 'Kisah Nabi Muhammad Masa Kecil', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Madinah', isCorrect: false }, { label: 'B', text: 'Makkah', isCorrect: true }, { label: 'C', text: 'Thaif', isCorrect: false }, { label: 'D', text: 'Yaman', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Peristiwa hijrah Nabi Muhammad SAW adalah perpindahan dari ...', topic: 'Hijrah ke Madinah', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', options: [{ label: 'A', text: 'Madinah ke Makkah', isCorrect: false }, { label: 'B', text: 'Makkah ke Madinah', isCorrect: true }, { label: 'C', text: 'Makkah ke Syam', isCorrect: false }, { label: 'D', text: 'Thaif ke Madinah', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Tokoh penyebar Islam di Jawa dikenal dengan sebutan ...', topic: 'Walisongo', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Ahlul Bait', isCorrect: false }, { label: 'B', text: 'Walisongo', isCorrect: true }, { label: 'C', text: 'Khulafaur Rasyidin', isCorrect: false }, { label: 'D', text: 'Tabi\'in', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Salah satu Khulafaur Rasyidin adalah ...', topic: 'Khulafaur Rasyidin', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', options: [{ label: 'A', text: 'Abu Bakar Ash-Shiddiq', isCorrect: true }, { label: 'B', text: 'Muawiyah', isCorrect: false }, { label: 'C', text: 'Harun Ar-Rasyid', isCorrect: false }, { label: 'D', text: 'Salahuddin Al-Ayyubi', isCorrect: false }], correctAnswer: 'A' },
];

// ===== BAHASA ARAB =====
const bahasaArabPG: Partial<Question>[] = [
  { text: 'Kata Arab untuk "ayah" adalah ...', topic: 'Mufradat Keluarga', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Ummun', isCorrect: false }, { label: 'B', text: 'Abun', isCorrect: true }, { label: 'C', text: 'Akhun', isCorrect: false }, { label: 'D', text: 'Ukhtun', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Ucapan salam dalam bahasa Arab adalah ...', topic: 'Salam dan Perkenalan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Shabahul khair', isCorrect: false }, { label: 'B', text: 'Assalamu\'alaikum', isCorrect: true }, { label: 'C', text: 'Ma\'assalamah', isCorrect: false }, { label: 'D', text: 'Afwan', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Dalam bahasa Arab, "merah" adalah ...', topic: 'Warna dan Benda Kelas', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'sedang', options: [{ label: 'A', text: 'Ahmar', isCorrect: true }, { label: 'B', text: 'Azraq', isCorrect: false }, { label: 'C', text: 'Akhdhar', isCorrect: false }, { label: 'D', text: 'Aswad', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Contoh dhamir untuk "saya" adalah ...', topic: 'Dhamir', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Anta', isCorrect: false }, { label: 'B', text: 'Nahnu', isCorrect: false }, { label: 'C', text: 'Ana', isCorrect: true }, { label: 'D', text: 'Huwa', isCorrect: false }], correctAnswer: 'C' },
];

// ===== PJOK =====
const pjokPG: Partial<Question>[] = [
  { text: 'Gerak berjalan dan berlari termasuk gerak ...', topic: 'Gerak Dasar Lokomotor', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', options: [{ label: 'A', text: 'Lokomotor', isCorrect: true }, { label: 'B', text: 'Non-lokomotor', isCorrect: false }, { label: 'C', text: 'Manipulatif', isCorrect: false }, { label: 'D', text: 'Statis', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Salah satu contoh hidup bersih dan sehat adalah ...', topic: 'Hidup Bersih dan Sehat', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Jarang mandi', isCorrect: false }, { label: 'B', text: 'Membuang sampah sembarangan', isCorrect: false }, { label: 'C', text: 'Cuci tangan sebelum makan', isCorrect: true }, { label: 'D', text: 'Begadang setiap hari', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Permainan sepak bola termasuk permainan bola ...', topic: 'Permainan Bola Besar', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', options: [{ label: 'A', text: 'Kecil', isCorrect: false }, { label: 'B', text: 'Besar', isCorrect: true }, { label: 'C', text: 'Sedang', isCorrect: false }, { label: 'D', text: 'Mini', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Sebelum olahraga sebaiknya melakukan ...', topic: 'Kebugaran Jasmani', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: 'Pendinginan', isCorrect: false }, { label: 'B', text: 'Pemanasan', isCorrect: true }, { label: 'C', text: 'Tidur', isCorrect: false }, { label: 'D', text: 'Makan berat', isCorrect: false }], correctAnswer: 'B' },
];

// ===== SBdP =====
const sbdpPG: Partial<Question>[] = [
  { text: 'Mencampur warna merah dan kuning menghasilkan warna ...', topic: 'Menggambar Bentuk Sederhana', grade: 'sd', phase: 'A', classLevel: '2', difficulty: 'mudah', options: [{ label: 'A', text: 'Hijau', isCorrect: false }, { label: 'B', text: 'Ungu', isCorrect: false }, { label: 'C', text: 'Oranye', isCorrect: true }, { label: 'D', text: 'Biru', isCorrect: false }], correctAnswer: 'C' },
  { text: 'Kolase adalah karya seni yang dibuat dengan cara ...', topic: 'Kolase dan Mozaik', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'sedang', options: [{ label: 'A', text: 'Mencetak', isCorrect: false }, { label: 'B', text: 'Menempel berbagai bahan', isCorrect: true }, { label: 'C', text: 'Memahat batu', isCorrect: false }, { label: 'D', text: 'Menyulam kain', isCorrect: false }], correctAnswer: 'B' },
  { text: 'Lagu daerah "Ampar-Ampar Pisang" berasal dari ...', topic: 'Ansambel Musik Sederhana', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', options: [{ label: 'A', text: 'Kalimantan Selatan', isCorrect: true }, { label: 'B', text: 'Sumatera Barat', isCorrect: false }, { label: 'C', text: 'Jawa Tengah', isCorrect: false }, { label: 'D', text: 'Papua', isCorrect: false }], correctAnswer: 'A' },
  { text: 'Batik merupakan contoh karya seni ...', topic: 'Seni Rupa Nusantara', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', options: [{ label: 'A', text: 'Musik', isCorrect: false }, { label: 'B', text: 'Rupa', isCorrect: true }, { label: 'C', text: 'Tari', isCorrect: false }, { label: 'D', text: 'Teater', isCorrect: false }], correctAnswer: 'B' },
];

// ===== ESSAY QUESTIONS =====
const essayQuestions: Partial<Question>[] = [
  // Fase B
  { text: 'Jelaskan langkah-langkah menghitung luas persegi panjang dan berikan contoh soal!', topic: 'Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'matematika', correctAnswer: 'Luas persegi panjang = panjang × lebar. Contoh: p = 8 cm, l = 5 cm, Luas = 8 × 5 = 40 cm²' },
  // Fase C
  { text: 'Jelaskan langkah-langkah menghitung luas trapesium dan berikan contoh soal beserta penyelesaiannya!', topic: 'Bangun Ruang', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'sedang', subject: 'matematika', correctAnswer: 'Luas trapesium = 1/2 × (jumlah sisi sejajar) × tinggi. Contoh: sisi sejajar 8 cm dan 12 cm, tinggi 5 cm. Luas = 1/2 × (8+12) × 5 = 50 cm²' },
  // Fase D
  { text: 'Selesaikan SPLDV berikut: 3x + 2y = 16 dan x - y = 2. Tunjukkan langkah pengerjaannya!', topic: 'Persamaan Linear', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'matematika', correctAnswer: 'x = y + 2, substitusi: 3(y+2) + 2y = 16, 5y = 10, y = 2, x = 4.' },
  // Fase F
  { text: 'Tentukan turunan dari f(x) = 2x³ - 5x² + 4x - 7 dan tentukan nilai f\'(2)!', topic: 'Turunan', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sedang', subject: 'matematika', correctAnswer: 'f\'(x) = 6x² - 10x + 4. f\'(2) = 24 - 20 + 4 = 8' },

  // IPA
  { text: 'Jelaskan proses fotosintesis dan tuliskan reaksi kimianya!', topic: 'Tumbuhan', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'ipa', correctAnswer: '6CO2 + 6H2O → C6H12O6 + 6O2 dengan bantuan cahaya matahari.' },
  { text: 'Jelaskan perbedaan peredaran darah besar dan kecil!', topic: 'Sistem Peredaran Darah', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'ipa', correctAnswer: 'Besar: jantung → seluruh tubuh → jantung. Kecil: jantung → paru-paru → jantung.' },
  { text: 'Jelaskan Hukum Kekekalan Energi dan berikan 2 contoh!', topic: 'Dinamika', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sulit', subject: 'ipa', correctAnswer: 'Energi tidak dapat diciptakan/dimusnahkan. Contoh: PLTA (potensial→kinetik→listrik), baterai (kimia→listrik).' },

  // B. Indonesia
  { text: 'Buatlah paragraf narasi "Pengalaman Liburan" minimal 5 kalimat!', topic: 'Menulis Cerita', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'bahasa_indonesia', correctAnswer: 'Penilaian: kesesuaian tema, struktur kalimat, tanda baca, koherensi.' },
  { text: 'Jelaskan perbedaan teks eksposisi dan teks prosedur beserta contohnya!', topic: 'Teks Eksposisi', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'bahasa_indonesia', correctAnswer: 'Eksposisi: menjelaskan informasi. Prosedur: langkah-langkah melakukan sesuatu.' },
  { text: 'Analisis unsur intrinsik cerpen yang pernah kamu baca!', topic: 'Novel & Cerpen', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'sulit', subject: 'bahasa_indonesia', correctAnswer: 'Penilaian: kelengkapan analisis tema, alur, penokohan, latar, amanat.' },

  // B. Inggris
  { text: 'Write 5 sentences about your daily activities using Simple Present Tense!', topic: 'Simple Present Tense', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'bahasa_inggris', correctAnswer: 'Contoh: I wake up at 5 AM. I go to school by bus. Etc.' },
  { text: 'Change these into passive voice:\n1. She writes a letter.\n2. They built this house.\n3. The teacher is explaining.', topic: 'Passive Voice', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'bahasa_inggris', correctAnswer: '1. A letter is written by her. 2. This house was built by them. 3. The lesson is being explained.' },

  // IPS
  { text: 'Jelaskan 3 jenis interaksi sosial asosiatif beserta contohnya!', topic: 'Interaksi Sosial', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'ips', correctAnswer: 'Kerja sama, akomodasi, asimilasi.' },
  { text: 'Jelaskan dampak positif dan negatif globalisasi terhadap budaya Indonesia!', topic: 'Globalisasi', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sulit', subject: 'ips', correctAnswer: 'Positif: pertukaran budaya, teknologi. Negatif: westernisasi, lunturnya budaya lokal.' },

  // PKn
  { text: 'Jelaskan nilai sila ke-3 Pancasila dan contoh penerapannya!', topic: 'Pancasila', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'pkn', correctAnswer: 'Persatuan Indonesia: cinta tanah air, menghargai keberagaman suku.' },
  { text: 'Jelaskan perbedaan sistem pemerintahan presidensial dan parlementer!', topic: 'Sistem Pemerintahan', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'pkn', correctAnswer: 'Presidensial: presiden kepala negara & pemerintahan. Parlementer: PM kepala pemerintahan, bertanggung jawab pada parlemen.' },
];

// ===== TRUE/FALSE =====
const trueFalseQuestions: Partial<Question>[] = [
  { text: 'Hasil dari 15 × 8 = 120', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'matematika', correctAnswer: 'Benar' },
  { text: 'Segitiga sama sisi memiliki 3 sisi sama panjang dan 3 sudut sama besar.', topic: 'Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', subject: 'matematika', correctAnswer: 'Benar' },
  { text: 'Hasil dari 3 + 4 = 8', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', subject: 'matematika', correctAnswer: 'Salah', explanation: '3 + 4 = 7, bukan 8.' },
  { text: 'Nilai dari π (pi) adalah tepat 3,14.', topic: 'Lingkaran', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'matematika', correctAnswer: 'Salah', explanation: 'π adalah bilangan irasional, 3,14 hanya pendekatan.' },
  { text: 'Sin 90° = 1', topic: 'Trigonometri', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', subject: 'matematika', correctAnswer: 'Benar' },
  { text: 'Matahari adalah bintang terdekat dari bumi.', topic: 'Bumi & Alam Semesta', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', subject: 'ipa', correctAnswer: 'Benar' },
  { text: 'Darah mengalir melalui arteri menuju jantung.', topic: 'Sistem Peredaran Darah', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'ipa', correctAnswer: 'Salah', explanation: 'Arteri membawa darah dari jantung. Vena membawa darah menuju jantung.' },
  { text: 'Indonesia terletak di 3 lempeng tektonik.', topic: 'Geografi Indonesia', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', subject: 'ips', correctAnswer: 'Benar', explanation: 'Eurasia, Indo-Australia, dan Pasifik.' },
  { text: 'Pancasila memiliki 4 sila.', topic: 'Pancasila', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'pkn', correctAnswer: 'Salah', explanation: 'Pancasila memiliki 5 sila.' },
  { text: '"She don\'t like coffee" is a correct English sentence.', topic: 'Simple Present Tense', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'bahasa_inggris', correctAnswer: 'Salah', explanation: 'She doesn\'t like coffee.' },
  { text: 'Kata "berlari" termasuk kata kerja.', topic: 'Kalimat Efektif', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', subject: 'bahasa_indonesia', correctAnswer: 'Benar' },
  { text: 'Kucing termasuk hewan herbivora.', topic: 'Hewan', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'ipa', correctAnswer: 'Salah', explanation: 'Kucing termasuk hewan karnivora.' },
];

// ===== PILIHAN GANDA KOMPLEKS (Multiple correct answers) =====
const pgKompleksQuestions: Partial<Question>[] = [
  // Matematika
  { 
    text: 'Manakah yang merupakan bilangan prima? (Pilih semua yang benar)', 
    topic: 'Bilangan Bulat', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: '2', isCorrect: true },
      { label: 'B', text: '9', isCorrect: false },
      { label: 'C', text: '11', isCorrect: true },
      { label: 'D', text: '15', isCorrect: false },
      { label: 'E', text: '23', isCorrect: true },
    ],
    correctAnswer: 'A, C, E',
  },
  { 
    text: 'Pernyataan yang benar tentang persegi adalah ... (Pilih semua yang benar)', 
    topic: 'Bangun Datar', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: 'Memiliki 4 sisi sama panjang', isCorrect: true },
      { label: 'B', text: 'Memiliki 4 sudut siku-siku', isCorrect: true },
      { label: 'C', text: 'Memiliki 2 diagonal sama panjang', isCorrect: true },
      { label: 'D', text: 'Memiliki 3 simetri lipat', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Hasil dari operasi hitung berikut yang bernilai 12 adalah ... (Pilih semua yang benar)', 
    topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'matematika',
    options: [
      { label: 'A', text: '3 × 4', isCorrect: true },
      { label: 'B', text: '24 ÷ 2', isCorrect: true },
      { label: 'C', text: '6 + 7', isCorrect: false },
      { label: 'D', text: '2 × 6', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Bilangan berikut yang merupakan kelipatan dari 6 adalah ... (Pilih semua yang benar)', 
    topic: 'KPK & FPB', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', subject: 'matematika',
    options: [
      { label: 'A', text: '12', isCorrect: true },
      { label: 'B', text: '15', isCorrect: false },
      { label: 'C', text: '18', isCorrect: true },
      { label: 'D', text: '24', isCorrect: true },
      { label: 'E', text: '25', isCorrect: false },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Pernyataan yang benar tentang fungsi linear f(x) = 2x + 3 adalah ... (Pilih semua yang benar)', 
    topic: 'Fungsi', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: 'Gradiennya adalah 2', isCorrect: true },
      { label: 'B', text: 'Memotong sumbu y di titik (0, 3)', isCorrect: true },
      { label: 'C', text: 'f(1) = 5', isCorrect: true },
      { label: 'D', text: 'Grafiknya berupa parabola', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Pernyataan yang benar tentang segitiga siku-siku adalah ... (Pilih semua yang benar)', 
    topic: 'Pythagoras', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: 'Memiliki satu sudut 90°', isCorrect: true },
      { label: 'B', text: 'Berlaku teorema Pythagoras', isCorrect: true },
      { label: 'C', text: 'Jumlah ketiga sudutnya 180°', isCorrect: true },
      { label: 'D', text: 'Ketiga sisinya sama panjang', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Nilai x yang memenuhi pertidaksamaan x² - 4 ≤ 0 adalah ... (Pilih semua yang benar)', 
    topic: 'Aljabar', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sulit', subject: 'matematika',
    options: [
      { label: 'A', text: 'x = -2', isCorrect: true },
      { label: 'B', text: 'x = 0', isCorrect: true },
      { label: 'C', text: 'x = 2', isCorrect: true },
      { label: 'D', text: 'x = 3', isCorrect: false },
      { label: 'E', text: 'x = 1', isCorrect: true },
    ],
    correctAnswer: 'A, B, C, E',
  },
  { 
    text: 'Pernyataan yang benar tentang turunan fungsi adalah ... (Pilih semua yang benar)', 
    topic: 'Turunan', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: 'Turunan f(x) = x² adalah f\'(x) = 2x', isCorrect: true },
      { label: 'B', text: 'Turunan konstanta adalah 0', isCorrect: true },
      { label: 'C', text: 'Turunan f(x) = sin x adalah f\'(x) = cos x', isCorrect: true },
      { label: 'D', text: 'Turunan f(x) = eˣ adalah f\'(x) = x·eˣ⁻¹', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Pernyataan yang benar tentang matriks adalah ... (Pilih semua yang benar)', 
    topic: 'Matriks', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'matematika',
    options: [
      { label: 'A', text: 'Matriks identitas memiliki determinan = 1', isCorrect: true },
      { label: 'B', text: 'Perkalian matriks bersifat komutatif', isCorrect: false },
      { label: 'C', text: 'Matriks dapat dijumlahkan jika ordonya sama', isCorrect: true },
      { label: 'D', text: 'Determinan matriks 2×2 [[a,b],[c,d]] = ad - bc', isCorrect: true },
    ],
    correctAnswer: 'A, C, D',
  },

  // IPA
  { 
    text: 'Pernyataan yang benar tentang fotosintesis adalah ... (Pilih semua yang benar)', 
    topic: 'Tumbuhan', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'ipa',
    options: [
      { label: 'A', text: 'Memerlukan cahaya matahari', isCorrect: true },
      { label: 'B', text: 'Menghasilkan oksigen', isCorrect: true },
      { label: 'C', text: 'Terjadi di akar', isCorrect: false },
      { label: 'D', text: 'Memerlukan karbondioksida', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Planet yang termasuk planet dalam (inferior) adalah ... (Pilih semua yang benar)', 
    topic: 'Bumi & Alam Semesta', grade: 'sd', phase: 'C', classLevel: '6', difficulty: 'mudah', subject: 'ipa',
    options: [
      { label: 'A', text: 'Merkurius', isCorrect: true },
      { label: 'B', text: 'Venus', isCorrect: true },
      { label: 'C', text: 'Mars', isCorrect: false },
      { label: 'D', text: 'Jupiter', isCorrect: false },
    ],
    correctAnswer: 'A, B',
  },
  { 
    text: 'Contoh sumber energi terbarukan adalah ... (Pilih semua yang benar)', 
    topic: 'Energi', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', subject: 'ipa',
    options: [
      { label: 'A', text: 'Matahari', isCorrect: true },
      { label: 'B', text: 'Minyak bumi', isCorrect: false },
      { label: 'C', text: 'Angin', isCorrect: true },
      { label: 'D', text: 'Air', isCorrect: true },
      { label: 'E', text: 'Batu bara', isCorrect: false },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Organ yang termasuk sistem pencernaan manusia adalah ... (Pilih semua yang benar)', 
    topic: 'Sistem Pencernaan', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', subject: 'ipa',
    options: [
      { label: 'A', text: 'Lambung', isCorrect: true },
      { label: 'B', text: 'Usus halus', isCorrect: true },
      { label: 'C', text: 'Paru-paru', isCorrect: false },
      { label: 'D', text: 'Hati', isCorrect: true },
      { label: 'E', text: 'Ginjal', isCorrect: false },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Besaran yang termasuk besaran turunan adalah ... (Pilih semua yang benar)', 
    topic: 'Gaya & Gerak', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'ipa',
    options: [
      { label: 'A', text: 'Kecepatan', isCorrect: true },
      { label: 'B', text: 'Massa', isCorrect: false },
      { label: 'C', text: 'Gaya', isCorrect: true },
      { label: 'D', text: 'Panjang', isCorrect: false },
      { label: 'E', text: 'Tekanan', isCorrect: true },
    ],
    correctAnswer: 'A, C, E',
  },
  { 
    text: 'Pernyataan yang benar tentang gerak lurus beraturan (GLB) adalah ... (Pilih semua yang benar)', 
    topic: 'Kinematika', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'ipa',
    options: [
      { label: 'A', text: 'Kecepatan konstan', isCorrect: true },
      { label: 'B', text: 'Percepatan = 0', isCorrect: true },
      { label: 'C', text: 'Grafik v-t berupa garis horizontal', isCorrect: true },
      { label: 'D', text: 'Jarak berbanding kuadrat waktu', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Reaksi berikut yang merupakan reaksi eksoterm adalah ... (Pilih semua yang benar)', 
    topic: 'Reaksi Kimia', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sulit', subject: 'ipa',
    options: [
      { label: 'A', text: 'Pembakaran', isCorrect: true },
      { label: 'B', text: 'Fotosintesis', isCorrect: false },
      { label: 'C', text: 'Respirasi', isCorrect: true },
      { label: 'D', text: 'Netralisasi asam-basa', isCorrect: true },
    ],
    correctAnswer: 'A, C, D',
  },

  // Bahasa Indonesia
  { 
    text: 'Kata berikut yang termasuk kata kerja adalah ... (Pilih semua yang benar)', 
    topic: 'Kalimat Efektif', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'mudah', subject: 'bahasa_indonesia',
    options: [
      { label: 'A', text: 'Berlari', isCorrect: true },
      { label: 'B', text: 'Cantik', isCorrect: false },
      { label: 'C', text: 'Menulis', isCorrect: true },
      { label: 'D', text: 'Membaca', isCorrect: true },
      { label: 'E', text: 'Buku', isCorrect: false },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Unsur intrinsik dalam karya sastra meliputi ... (Pilih semua yang benar)', 
    topic: 'Puisi & Prosa', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', subject: 'bahasa_indonesia',
    options: [
      { label: 'A', text: 'Tema', isCorrect: true },
      { label: 'B', text: 'Alur/plot', isCorrect: true },
      { label: 'C', text: 'Biografi pengarang', isCorrect: false },
      { label: 'D', text: 'Penokohan', isCorrect: true },
      { label: 'E', text: 'Latar/setting', isCorrect: true },
    ],
    correctAnswer: 'A, B, D, E',
  },
  { 
    text: 'Ciri-ciri teks eksposisi adalah ... (Pilih semua yang benar)', 
    topic: 'Teks Eksposisi', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'bahasa_indonesia',
    options: [
      { label: 'A', text: 'Bersifat informatif', isCorrect: true },
      { label: 'B', text: 'Berisi fakta dan data', isCorrect: true },
      { label: 'C', text: 'Menggunakan bahasa baku', isCorrect: true },
      { label: 'D', text: 'Berisi cerita fiksi', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },
  { 
    text: 'Struktur teks prosedur meliputi ... (Pilih semua yang benar)', 
    topic: 'Teks Prosedur', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'bahasa_indonesia',
    options: [
      { label: 'A', text: 'Tujuan', isCorrect: true },
      { label: 'B', text: 'Bahan dan alat', isCorrect: true },
      { label: 'C', text: 'Langkah-langkah', isCorrect: true },
      { label: 'D', text: 'Kesimpulan', isCorrect: false },
    ],
    correctAnswer: 'A, B, C',
  },

  // Bahasa Inggris
  { 
    text: 'Which of the following are plural nouns? (Choose all correct answers)', 
    topic: 'Simple Present Tense', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'mudah', subject: 'bahasa_inggris',
    options: [
      { label: 'A', text: 'Children', isCorrect: true },
      { label: 'B', text: 'Book', isCorrect: false },
      { label: 'C', text: 'Teeth', isCorrect: true },
      { label: 'D', text: 'Mouse', isCorrect: false },
      { label: 'E', text: 'Feet', isCorrect: true },
    ],
    correctAnswer: 'A, C, E',
  },
  { 
    text: 'Which sentences use correct grammar? (Choose all correct answers)', 
    topic: 'Simple Present Tense', grade: 'smp', phase: 'D', classLevel: '7', difficulty: 'sedang', subject: 'bahasa_inggris',
    options: [
      { label: 'A', text: 'She goes to school every day.', isCorrect: true },
      { label: 'B', text: 'They doesn\'t like coffee.', isCorrect: false },
      { label: 'C', text: 'He plays football on Sundays.', isCorrect: true },
      { label: 'D', text: 'I am a student.', isCorrect: true },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Which are examples of irregular verbs? (Choose all correct answers)', 
    topic: 'Simple Past Tense', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'bahasa_inggris',
    options: [
      { label: 'A', text: 'go - went - gone', isCorrect: true },
      { label: 'B', text: 'play - played - played', isCorrect: false },
      { label: 'C', text: 'eat - ate - eaten', isCorrect: true },
      { label: 'D', text: 'write - wrote - written', isCorrect: true },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Which sentences are in passive voice? (Choose all correct answers)', 
    topic: 'Passive Voice', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'bahasa_inggris',
    options: [
      { label: 'A', text: 'The book was written by her.', isCorrect: true },
      { label: 'B', text: 'She writes a book.', isCorrect: false },
      { label: 'C', text: 'The cake is being made by mom.', isCorrect: true },
      { label: 'D', text: 'They have been invited to the party.', isCorrect: true },
    ],
    correctAnswer: 'A, C, D',
  },

  // IPS
  { 
    text: 'Negara yang termasuk anggota ASEAN adalah ... (Pilih semua yang benar)', 
    topic: 'Globalisasi', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'mudah', subject: 'ips',
    options: [
      { label: 'A', text: 'Indonesia', isCorrect: true },
      { label: 'B', text: 'Jepang', isCorrect: false },
      { label: 'C', text: 'Thailand', isCorrect: true },
      { label: 'D', text: 'Vietnam', isCorrect: true },
      { label: 'E', text: 'India', isCorrect: false },
    ],
    correctAnswer: 'A, C, D',
  },
  { 
    text: 'Faktor pendorong terjadinya perdagangan internasional adalah ... (Pilih semua yang benar)', 
    topic: 'Kegiatan Ekonomi', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'ips',
    options: [
      { label: 'A', text: 'Perbedaan sumber daya alam', isCorrect: true },
      { label: 'B', text: 'Perbedaan teknologi', isCorrect: true },
      { label: 'C', text: 'Kesamaan budaya', isCorrect: false },
      { label: 'D', text: 'Perbedaan biaya produksi', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Tokoh yang berperan dalam perumusan Pancasila adalah ... (Pilih semua yang benar)', 
    topic: 'Sejarah Indonesia', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'ips',
    options: [
      { label: 'A', text: 'Ir. Soekarno', isCorrect: true },
      { label: 'B', text: 'Moh. Yamin', isCorrect: true },
      { label: 'C', text: 'Cut Nyak Dhien', isCorrect: false },
      { label: 'D', text: 'Mr. Soepomo', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Dampak positif globalisasi bagi Indonesia adalah ... (Pilih semua yang benar)', 
    topic: 'Globalisasi', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', subject: 'ips',
    options: [
      { label: 'A', text: 'Kemajuan teknologi', isCorrect: true },
      { label: 'B', text: 'Kemudahan akses informasi', isCorrect: true },
      { label: 'C', text: 'Lunturnya budaya lokal', isCorrect: false },
      { label: 'D', text: 'Meningkatnya investasi asing', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },

  // PKN
  { 
    text: 'Nilai-nilai yang terkandung dalam sila ke-3 Pancasila adalah ... (Pilih semua yang benar)', 
    topic: 'Pancasila', grade: 'sd', phase: 'B', classLevel: '4', difficulty: 'sedang', subject: 'pkn',
    options: [
      { label: 'A', text: 'Cinta tanah air', isCorrect: true },
      { label: 'B', text: 'Rela berkorban', isCorrect: true },
      { label: 'C', text: 'Mengutamakan kepentingan pribadi', isCorrect: false },
      { label: 'D', text: 'Mengembangkan persatuan', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Hak warga negara Indonesia menurut UUD 1945 meliputi ... (Pilih semua yang benar)', 
    topic: 'HAM', grade: 'smp', phase: 'D', classLevel: '9', difficulty: 'sedang', subject: 'pkn',
    options: [
      { label: 'A', text: 'Hak atas pekerjaan', isCorrect: true },
      { label: 'B', text: 'Hak atas pendidikan', isCorrect: true },
      { label: 'C', text: 'Hak untuk tidak membayar pajak', isCorrect: false },
      { label: 'D', text: 'Hak untuk berserikat', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
  { 
    text: 'Lembaga tinggi negara menurut UUD 1945 setelah amandemen adalah ... (Pilih semua yang benar)', 
    topic: 'Sistem Pemerintahan', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'sedang', subject: 'pkn',
    options: [
      { label: 'A', text: 'MPR', isCorrect: true },
      { label: 'B', text: 'DPR', isCorrect: true },
      { label: 'C', text: 'DPA', isCorrect: false },
      { label: 'D', text: 'Mahkamah Konstitusi', isCorrect: true },
      { label: 'E', text: 'BPK', isCorrect: true },
    ],
    correctAnswer: 'A, B, D, E',
  },
  { 
    text: 'Bentuk partisipasi warga negara dalam menjaga keutuhan NKRI adalah ... (Pilih semua yang benar)', 
    topic: 'Integrasi Nasional', grade: 'sma', phase: 'F', classLevel: '12', difficulty: 'sedang', subject: 'pkn',
    options: [
      { label: 'A', text: 'Menghormati keberagaman', isCorrect: true },
      { label: 'B', text: 'Menjaga keamanan lingkungan', isCorrect: true },
      { label: 'C', text: 'Mementingkan kelompok sendiri', isCorrect: false },
      { label: 'D', text: 'Ikut serta dalam bela negara', isCorrect: true },
    ],
    correctAnswer: 'A, B, D',
  },
];

// ===== SHORT ANSWER =====
const shortAnswerQuestions: Partial<Question>[] = [
  { text: 'Hasil dari 5 + 7 = ...', topic: 'Penjumlahan & Pengurangan', grade: 'sd', phase: 'A', classLevel: '1', difficulty: 'mudah', subject: 'matematika', correctAnswer: '12' },
  { text: 'Hasil dari 25 × 4 = ...', topic: 'Perkalian & Pembagian', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'matematika', correctAnswer: '100' },
  { text: 'Rumus luas lingkaran = ...', topic: 'Lingkaran', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', subject: 'matematika', correctAnswer: 'πr²' },
  { text: 'Turunan dari f(x) = x³ adalah f\'(x) = ...', topic: 'Turunan', grade: 'sma', phase: 'F', classLevel: '11', difficulty: 'mudah', subject: 'matematika', correctAnswer: '3x²' },
  { text: 'Proses penguapan air disebut ...', topic: 'Siklus Air', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', subject: 'ipa', correctAnswer: 'Evaporasi' },
  { text: 'Satuan tekanan dalam SI = ...', topic: 'Gaya & Gerak', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'sedang', subject: 'ipa', correctAnswer: 'Pascal (Pa)' },
  { text: 'Ibukota negara Indonesia adalah ...', topic: 'Kenampakan Alam Indonesia', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', subject: 'ips', correctAnswer: 'Jakarta / Nusantara' },
  { text: 'Lambang sila ke-2 Pancasila = ...', topic: 'Pancasila', grade: 'sd', phase: 'B', classLevel: '3', difficulty: 'mudah', subject: 'pkn', correctAnswer: 'Rantai' },
  { text: 'Past tense of "go" is ...', topic: 'Simple Past Tense', grade: 'smp', phase: 'D', classLevel: '8', difficulty: 'mudah', subject: 'bahasa_inggris', correctAnswer: 'went' },
  { text: 'Lawan kata dari "besar" = ...', topic: 'Sinonim & Antonim', grade: 'sd', phase: 'C', classLevel: '5', difficulty: 'mudah', subject: 'bahasa_indonesia', correctAnswer: 'kecil' },
  { text: 'Rumus kecepatan v = ...', topic: 'Kinematika', grade: 'sma', phase: 'E', classLevel: '10', difficulty: 'mudah', subject: 'ipa', correctAnswer: 's/t' },
];

// Build the full question bank
function buildQuestionBank(): Question[] {
  const questions: Question[] = [];

  const pgSets: { questions: Partial<Question>[]; subject: SubjectKey }[] = [
    { questions: matematikaPG, subject: 'matematika' },
    { questions: ipaPG, subject: 'ipa' },
    { questions: ipasPG, subject: 'ipas' },
    { questions: bahasaIndonesiaPG, subject: 'bahasa_indonesia' },
    { questions: bahasaInggrisPG, subject: 'bahasa_inggris' },
    { questions: ipsPG, subject: 'ips' },
    { questions: pknPG, subject: 'pkn' },
    { questions: quranHadisPG, subject: 'quran_hadis' },
    { questions: aqidahAkhlakPG, subject: 'aqidah_akhlak' },
    { questions: fikihPG, subject: 'fikih' },
    { questions: skiPG, subject: 'ski' },
    { questions: bahasaArabPG, subject: 'bahasa_arab' },
    { questions: pjokPG, subject: 'pjok' },
    { questions: sbdpPG, subject: 'sbdp' },
  ];

  pgSets.forEach(({ questions: qs, subject }) => {
    qs.forEach((q) => {
      questions.push({
        id: genId(),
        text: q.text!,
        type: 'pilihan_ganda',
        difficulty: q.difficulty as Difficulty,
        subject: subject,
        grade: q.grade as GradeLevel,
        phase: (q.phase || gradeToPhase(q.grade as GradeLevel)) as Phase,
        classLevel: q.classLevel || gradeToClass(q.grade as GradeLevel),
        topic: q.topic!,
        options: q.options as QuestionOption[],
        correctAnswer: q.correctAnswer!,
        explanation: q.explanation,
        points: q.difficulty === 'mudah' ? 2 : q.difficulty === 'sedang' ? 3 : 5,
      });
    });
  });

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
      points: q.difficulty === 'mudah' ? 5 : q.difficulty === 'sedang' ? 10 : 15,
    });
  });

  trueFalseQuestions.forEach((q) => {
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
      correctAnswer: q.correctAnswer!,
      explanation: q.explanation,
      options: [
        { label: 'A', text: 'Benar', isCorrect: q.correctAnswer === 'Benar' },
        { label: 'B', text: 'Salah', isCorrect: q.correctAnswer === 'Salah' },
      ],
      points: 1,
    });
  });

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

  // Process complex multiple choice questions
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
      points: q.difficulty === 'mudah' ? 4 : q.difficulty === 'sedang' ? 6 : 8,
    });
  });

  return questions;
}

export const questionBank = buildQuestionBank();
