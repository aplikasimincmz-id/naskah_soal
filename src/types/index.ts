export type QuestionType = 'pilihan_ganda' | 'pilihan_ganda_kompleks' | 'essay' | 'benar_salah' | 'isian_singkat';
export type Difficulty = 'mudah' | 'sedang' | 'sulit';
export type SubjectKey =
  | 'matematika'
  | 'ipa'
  | 'ipas'
  | 'ips'
  | 'bahasa_indonesia'
  | 'bahasa_inggris'
  | 'pkn'
  | 'quran_hadis'
  | 'aqidah_akhlak'
  | 'fikih'
  | 'ski'
  | 'bahasa_arab'
  | 'pjok'
  | 'sbdp';
export type GradeLevel = 'sd' | 'smp' | 'sma';
export type Phase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface QuestionOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: Difficulty;
  subject: SubjectKey;
  grade: GradeLevel;
  phase: Phase;
  classLevel: string; // e.g. "1", "2", ... "12"
  topic: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface DifficultyDistribution {
  mudah: number;   // percentage 0-100
  sedang: number;  // percentage 0-100
  sulit: number;   // percentage 0-100
}

export interface ExamConfig {
  title: string;
  subject: SubjectKey;
  grade: GradeLevel;
  phase: Phase;
  classLevel: string;
  topics: string[]; // multiple topics selection
  customMaterial: string; // manual input for main material
  questionTypes: QuestionType[];
  difficultyDist: DifficultyDistribution;
  questionCount: number;
  duration: number; // in minutes
  teacherName: string;
  schoolName: string;
  semester: string;
  academicYear: string;
}

export interface GeneratedExam {
  config: ExamConfig;
  questions: Question[];
  createdAt: Date;
}

export interface PhaseInfo {
  key: Phase;
  label: string;
  description: string;
  grade: GradeLevel;
  classes: string[];
  color: string;
  emoji: string;
}

export interface SubjectInfo {
  key: SubjectKey;
  name: string;
  icon: string;
  color: string;
  topics: Record<Phase, string[]>;
}
