import { SubjectInfo, PhaseInfo } from '../types';

// Kurikulum Merdeka Phase system
export const phases: PhaseInfo[] = [
  {
    key: 'A',
    label: 'Fase A',
    description: 'Kelas 1–2 SD/MI',
    grade: 'sd',
    classes: ['1', '2'],
    color: 'from-emerald-400 to-emerald-600',
    emoji: '🌱',
  },
  {
    key: 'B',
    label: 'Fase B',
    description: 'Kelas 3–4 SD/MI',
    grade: 'sd',
    classes: ['3', '4'],
    color: 'from-green-400 to-green-600',
    emoji: '🌿',
  },
  {
    key: 'C',
    label: 'Fase C',
    description: 'Kelas 5–6 SD/MI',
    grade: 'sd',
    classes: ['5', '6'],
    color: 'from-sky-400 to-sky-600',
    emoji: '🌳',
  },
  {
    key: 'D',
    label: 'Fase D',
    description: 'Kelas 7–9 SMP/MTs',
    grade: 'smp',
    classes: ['7', '8', '9'],
    color: 'from-blue-400 to-blue-600',
    emoji: '🚀',
  },
  {
    key: 'E',
    label: 'Fase E',
    description: 'Kelas 10 SMA/MA/SMK',
    grade: 'sma',
    classes: ['10'],
    color: 'from-violet-400 to-violet-600',
    emoji: '⭐',
  },
  {
    key: 'F',
    label: 'Fase F',
    description: 'Kelas 11–12 SMA/MA/SMK',
    grade: 'sma',
    classes: ['11', '12'],
    color: 'from-purple-400 to-purple-600',
    emoji: '🎯',
  },
];

export const subjects: SubjectInfo[] = [
  {
    key: 'matematika',
    name: 'Matematika',
    icon: '📐',
    color: 'from-blue-500 to-blue-700',
    topics: {
      A: ['Bilangan Cacah', 'Penjumlahan & Pengurangan', 'Pola Bilangan', 'Bangun Datar Sederhana', 'Pengukuran Panjang & Berat'],
      B: ['Perkalian & Pembagian', 'Pecahan', 'Bangun Datar', 'Satuan Ukur', 'Bilangan Bulat', 'Pengolahan Data Sederhana'],
      C: ['KPK & FPB', 'Pecahan & Desimal', 'Bangun Ruang', 'Skala & Perbandingan', 'Statistika Dasar', 'Bilangan Bulat'],
      D: ['Aljabar', 'Persamaan Linear', 'Pythagoras', 'Lingkaran', 'Statistika', 'Peluang', 'Himpunan', 'Fungsi'],
      E: ['Trigonometri', 'Logaritma & Eksponen', 'Matriks', 'Sistem Persamaan', 'Statistika Lanjut', 'Barisan & Deret'],
      F: ['Vektor', 'Kalkulus', 'Limit', 'Turunan', 'Integral', 'Program Linear', 'Trigonometri Lanjut'],
    },
  },
  {
    key: 'ipa',
    name: 'IPA',
    icon: '🔬',
    color: 'from-green-500 to-green-700',
    topics: {
      A: ['Makhluk Hidup & Tak Hidup', 'Bagian Tubuh Manusia', 'Benda di Sekitar Kita', 'Cuaca & Musim'],
      B: ['Tumbuhan', 'Hewan', 'Energi', 'Cahaya', 'Bunyi', 'Siklus Hidup'],
      C: ['Bumi & Alam Semesta', 'Siklus Air', 'Rangkaian Listrik Sederhana', 'Ekosistem', 'Organ Tubuh Manusia', 'Campuran & Larutan'],
      D: ['Sistem Pencernaan', 'Sistem Peredaran Darah', 'Atom & Molekul', 'Gaya & Gerak', 'Listrik', 'Magnet', 'Tata Surya', 'Ekosistem'],
      E: ['Kinematika', 'Dinamika', 'Usaha & Energi', 'Gelombang', 'Optika', 'Reaksi Kimia', 'Struktur Atom'],
      F: ['Termodinamika', 'Listrik & Magnet', 'Fisika Modern', 'Kimia Organik', 'Bioteknologi', 'Evolusi'],
    },
  },
  {
    key: 'ipas',
    name: 'IPAS',
    icon: '🌿',
    color: 'from-lime-500 to-green-700',
    topics: {
      A: ['Diri dan Lingkungan Sekitar', 'Benda di Sekitar Kita', 'Cuaca Harian'],
      B: ['Makhluk Hidup dan Lingkungannya', 'Energi di Sekitar Kita', 'Kegiatan Ekonomi Sederhana', 'Kenampakan Alam'],
      C: ['Ekosistem', 'Perubahan Wujud Benda', 'Sumber Daya Alam', 'Keragaman Budaya Indonesia', 'Perubahan Sosial Sederhana'],
      D: ['Interaksi Manusia dan Lingkungan', 'Kependudukan', 'Energi dan Perubahannya', 'Pembangunan Berkelanjutan'],
      E: ['Sistem Sosial dan Lingkungan', 'Dinamika Bumi', 'Teknologi dan Masyarakat', 'Isu Lingkungan'],
      F: ['Perubahan Global', 'Sains untuk Kehidupan', 'Kewargaan Ekologis', 'Literasi Data Sosial-Sains'],
    },
  },
  {
    key: 'ips',
    name: 'IPS',
    icon: '🌍',
    color: 'from-yellow-500 to-orange-600',
    topics: {
      A: ['Keluarga & Lingkungan', 'Tempat Tinggalku', 'Aturan di Rumah & Sekolah'],
      B: ['Lingkungan Sekitar', 'Keragaman Budaya', 'Peta & Globe', 'Kegiatan Ekonomi Sederhana'],
      C: ['Tokoh Pahlawan', 'Kegiatan Ekonomi', 'Sumber Daya Alam', 'Kenampakan Alam Indonesia', 'Proklamasi Kemerdekaan'],
      D: ['Interaksi Sosial', 'Lembaga Sosial', 'Kegiatan Ekonomi', 'Sejarah Indonesia', 'Geografi Indonesia', 'Globalisasi'],
      E: ['Sosiologi', 'Antropologi', 'Ekonomi Dasar', 'Sejarah Indonesia Modern', 'Geografi Regional'],
      F: ['Ekonomi Makro', 'Ekonomi Mikro', 'Sejarah Dunia', 'Geopolitik', 'Sosiologi Lanjut'],
    },
  },
  {
    key: 'bahasa_indonesia',
    name: 'Bahasa Indonesia',
    icon: '📖',
    color: 'from-red-500 to-red-700',
    topics: {
      A: ['Membaca Permulaan', 'Menulis Huruf & Kata', 'Bercerita', 'Menyimak'],
      B: ['Membaca Pemahaman', 'Menulis Cerita', 'Puisi Anak', 'Kalimat Efektif', 'Tanda Baca'],
      C: ['Sinonim & Antonim', 'Teks Narasi', 'Teks Deskripsi', 'Puisi', 'Menulis Surat', 'Paragraf'],
      D: ['Teks Narasi', 'Teks Eksposisi', 'Teks Prosedur', 'Teks Diskusi', 'Puisi & Prosa', 'Drama'],
      E: ['Teks Anekdot', 'Teks Negosiasi', 'Teks Laporan', 'Debat', 'Cerpen'],
      F: ['Teks Editorial', 'Kritik Sastra', 'Karya Ilmiah', 'Novel & Cerpen', 'Resensi'],
    },
  },
  {
    key: 'bahasa_inggris',
    name: 'Bahasa Inggris',
    icon: '🇬🇧',
    color: 'from-purple-500 to-purple-700',
    topics: {
      A: ['Greetings', 'Numbers & Colors', 'Alphabet & Phonics', 'Simple Vocabulary'],
      B: ['Family Members', 'Animals', 'Daily Activities', 'Parts of Body', 'Food & Drinks'],
      C: ['Telling Time', 'Hobbies', 'Describing People', 'Simple Sentences', 'Short Stories'],
      D: ['Simple Present Tense', 'Simple Past Tense', 'Present Continuous', 'Descriptive Text', 'Narrative Text', 'Recount Text'],
      E: ['Passive Voice', 'Conditional Sentences', 'Analytical Exposition', 'Present Perfect Tense', 'Discussion Text'],
      F: ['Reported Speech', 'Complex Sentences', 'Review Text', 'Formal Writing', 'Advanced Reading'],
    },
  },
  {
    key: 'pkn',
    name: 'PKn',
    icon: '⚖️',
    color: 'from-teal-500 to-teal-700',
    topics: {
      A: ['Aturan di Rumah & Sekolah', 'Gotong Royong', 'Mengenal Pancasila', 'Hak & Kewajiban Anak'],
      B: ['Pancasila', 'Norma', 'Keberagaman', 'Musyawarah', 'Hak & Kewajiban'],
      C: ['Cinta Tanah Air', 'Lambang Negara', 'NKRI', 'Keberagaman Suku & Budaya', 'Pemilu Sederhana'],
      D: ['UUD 1945', 'Demokrasi', 'HAM', 'Otonomi Daerah', 'Pertahanan Negara', 'Globalisasi'],
      E: ['Ideologi Pancasila', 'Sistem Pemerintahan', 'Hukum & Peradilan', 'Wawasan Nusantara'],
      F: ['Hubungan Internasional', 'Ancaman Negara', 'Integrasi Nasional', 'Bela Negara'],
    },
  },
  {
    key: 'quran_hadis',
    name: 'Al-Qur\'an Hadis',
    icon: '📜',
    color: 'from-emerald-500 to-emerald-700',
    topics: {
      A: ['Huruf Hijaiyah', 'Surah Pendek Pilihan', 'Adab Membaca Al-Qur\'an'],
      B: ['Tajwid Dasar', 'Hafalan Surah Pendek', 'Hadis Tentang Kejujuran'],
      C: ['Hukum Nun Sukun', 'Hadis Tentang Menuntut Ilmu', 'Kandungan Surah Al-Ma\'un'],
      D: ['Tajwid Lanjutan', 'Pemahaman Hadis Pilihan', 'Asbabun Nuzul'],
      E: ['Ulumul Qur\'an Dasar', 'Takhrij Hadis Dasar', 'Nilai Moderasi Beragama'],
      F: ['Kajian Tematik Al-Qur\'an', 'Hadis Ahkam Pilihan', 'Implementasi Nilai Qurani'],
    },
  },
  {
    key: 'aqidah_akhlak',
    name: 'Aqidah Akhlak',
    icon: '🕌',
    color: 'from-cyan-500 to-cyan-700',
    topics: {
      A: ['Rukun Iman Dasar', 'Asmaul Husna Dasar', 'Akhlak kepada Orang Tua'],
      B: ['Iman kepada Malaikat', 'Sifat Terpuji', 'Adab di Sekolah'],
      C: ['Iman kepada Kitab Allah', 'Akhlak Terpuji dan Tercela', 'Keteladanan Nabi'],
      D: ['Iman kepada Rasul dan Hari Akhir', 'Pengendalian Diri', 'Husnuzan'],
      E: ['Tauhid dan Syirik', 'Akhlak Bermedia Sosial', 'Tasamuh'],
      F: ['Konsep Ihsan', 'Akhlaq Karimah dalam Masyarakat', 'Etika Kepemimpinan'],
    },
  },
  {
    key: 'fikih',
    name: 'Fikih',
    icon: '🧭',
    color: 'from-lime-500 to-lime-700',
    topics: {
      A: ['Bersuci Dasar', 'Gerakan dan Bacaan Salat', 'Doa Harian'],
      B: ['Wudu dan Tayamum', 'Salat Fardu', 'Adzan dan Iqamah'],
      C: ['Puasa Ramadhan', 'Zakat Fitrah', 'Salat Jumat'],
      D: ['Muamalah Dasar', 'Salat Jamak dan Qasar', 'Penyelenggaraan Jenazah'],
      E: ['Zakat Mal', 'Haji dan Umrah', 'Transaksi Halal'],
      F: ['Qawaid Fiqhiyah Dasar', 'Ekonomi Syariah Dasar', 'Fikih Kontemporer'],
    },
  },
  {
    key: 'ski',
    name: 'Sejarah Kebudayaan Islam',
    icon: '🏛️',
    color: 'from-amber-500 to-amber-700',
    topics: {
      A: ['Kisah Nabi Muhammad Masa Kecil', 'Peristiwa Gajah', 'Teladan Kejujuran'],
      B: ['Dakwah Nabi di Makkah', 'Hijrah ke Madinah', 'Piagam Madinah'],
      C: ['Khulafaur Rasyidin', 'Perkembangan Islam di Nusantara', 'Walisongo'],
      D: ['Dinasti Umayyah dan Abbasiyah', 'Ilmuwan Muslim', 'Peradaban Islam'],
      E: ['Masuknya Islam di Indonesia', 'Kerajaan Islam Nusantara', 'Tokoh Ulama Nusantara'],
      F: ['Gerakan Pembaharuan Islam', 'Dinamika Umat Islam Modern', 'Kontribusi Islam untuk Dunia'],
    },
  },
  {
    key: 'bahasa_arab',
    name: 'Bahasa Arab',
    icon: '📝',
    color: 'from-rose-500 to-rose-700',
    topics: {
      A: ['Mufradat Keluarga', 'Angka dalam Bahasa Arab', 'Salam dan Perkenalan'],
      B: ['Isim dan Fi\'il Dasar', 'Warna dan Benda Kelas', 'Kalimat Sederhana'],
      C: ['Dhamir', 'Jumlah Ismiyah', 'Hiwar Sederhana'],
      D: ['Fi\'il Madhi dan Mudhari\'', 'Nahwu Dasar', 'Qira\'ah Pendek'],
      E: ['Tarkib Kalimat', 'Sharaf Dasar', 'Insya\' Sederhana'],
      F: ['Qawaid Lanjutan', 'Terjemah Teks Arab', 'Muhadatsah Kontekstual'],
    },
  },
  {
    key: 'pjok',
    name: 'PJOK',
    icon: '⚽',
    color: 'from-orange-500 to-orange-700',
    topics: {
      A: ['Gerak Dasar Lokomotor', 'Permainan Sederhana', 'Hidup Bersih dan Sehat'],
      B: ['Gerak Manipulatif', 'Senam Dasar', 'Pola Makan Sehat'],
      C: ['Atletik Dasar', 'Permainan Bola Besar', 'Kebugaran Jasmani'],
      D: ['Permainan Bola Kecil', 'Renang Dasar', 'Pencegahan Cedera'],
      E: ['Kebugaran Lanjutan', 'Strategi Permainan', 'Gizi Olahraga'],
      F: ['Perencanaan Latihan', 'Tes Kebugaran', 'Sportivitas dan Kepemimpinan'],
    },
  },
  {
    key: 'sbdp',
    name: 'SBdP',
    icon: '🎨',
    color: 'from-pink-500 to-pink-700',
    topics: {
      A: ['Menggambar Bentuk Sederhana', 'Lagu Anak', 'Kerajinan Kertas'],
      B: ['Pola Hias', 'Tari Kreasi Dasar', 'Kolase dan Mozaik'],
      C: ['Seni Rupa Nusantara', 'Ansambel Musik Sederhana', 'Kerajinan Bahan Alam'],
      D: ['Seni Pertunjukan', 'Poster dan Desain', 'Apresiasi Karya Seni'],
      E: ['Konsep Seni Modern', 'Karya Dua Dimensi', 'Komposisi Musik Dasar'],
      F: ['Kritik Seni', 'Proyek Karya Seni', 'Pameran dan Presentasi Karya'],
    },
  },
];

export const gradeLabels: Record<string, string> = {
  sd: 'SD / MI',
  smp: 'SMP / MTs',
  sma: 'SMA / MA / SMK',
};

export const questionTypeLabels: Record<string, string> = {
  pilihan_ganda: 'Pilihan Ganda',
  pilihan_ganda_kompleks: 'PG Kompleks',
  essay: 'Essay / Uraian',
  benar_salah: 'Benar / Salah',
  isian_singkat: 'Isian Singkat',
};

export const difficultyLabels: Record<string, string> = {
  mudah: 'Mudah',
  sedang: 'Sedang',
  sulit: 'Sulit',
};

export function getPhaseByGradeAndClass(grade: string, classLevel: string): string {
  const phase = phases.find(p => p.grade === grade && p.classes.includes(classLevel));
  return phase ? phase.key : 'A';
}

export function getPhasesByGrade(grade: string): PhaseInfo[] {
  return phases.filter(p => p.grade === grade);
}
