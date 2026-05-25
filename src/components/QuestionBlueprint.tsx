import { GeneratedExam } from '../types';
import { phases } from '../data/subjects';
import { calculateTotalPoints } from '../utils/generator';

interface QuestionBlueprintProps {
  exam: GeneratedExam;
  onBack: () => void;
}

interface TopicStats {
  mudah: number;
  sedang: number;
  sulit: number;
  total: number;
}

// Konversi tipe soal ke format standar
const formatQuestionType = (type: string): string => {
  switch (type) {
    case 'pilihan_ganda':
      return 'PG';
    case 'pilihan_ganda_kompleks':
      return 'PGK';
    case 'benar_salah':
      return 'BS';
    case 'isian_singkat':
      return 'Isian';
    case 'essay':
      return 'Uraian';
    default:
      return type;
  }
};

// Mapping level kognitif berdasarkan tingkat kesulitan dan tipe
const getCognitiveLevel = (difficulty: string, type: string): string => {
  if (type === 'essay') return 'C6-C5 (Evaluasi-Sintesis)';
  if (type === 'pilihan_ganda_kompleks') return 'C4-C5 (Analisis-Sintesis)';
  if (difficulty === 'sulit') return 'C4 (Analisis)';
  if (difficulty === 'sedang') return 'C3 (Aplikasi)';
  return 'C1-C2 (Pengetahuan-Pemahaman)';
};

export default function QuestionBlueprint({ exam, onBack }: QuestionBlueprintProps) {
  const selectedPhase = phases.find((p) => p.key === exam.config.phase);
  const totalPoints = calculateTotalPoints(exam.questions);

  // Group questions by topic
  const topicStats: Record<string, TopicStats> = {};
  const topicQuestions: Record<string, number[]> = {};
  
  exam.questions.forEach((q, idx) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { mudah: 0, sedang: 0, sulit: 0, total: 0 };
      topicQuestions[q.topic] = [];
    }
    topicStats[q.topic][q.difficulty]++;
    topicStats[q.topic].total++;
    topicQuestions[q.topic].push(idx + 1);
  });

  // Tabel Kisi-Kisi Standar Nasional Format Baru
  const renderNationalStandardTable = () => {
    return (
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-gray-800">Tabel Kisi-Kisi Ujian</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-800 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-800 px-3 py-2 text-center">No</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Tujuan Pembelajaran (TP)</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Kelas</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Materi Pokok</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Indikator Soal</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Level Kognitif</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Bentuk Soal</th>
                <th className="border border-gray-800 px-3 py-2 text-center">Nomor Soal</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(topicStats).map(([topic, stats], idx) => {
                const questionNumbers = topicQuestions[topic].join(', ');
                const sampleQuestion = exam.questions.find(q => q.topic === topic);
                const questionType = sampleQuestion ? formatQuestionType(sampleQuestion.type) : 'PG';
                const cognitiveLevel = sampleQuestion ? getCognitiveLevel(sampleQuestion.difficulty, sampleQuestion.type) : 'C1-C2';
                
                return (
                  <tr key={topic} className="hover:bg-gray-50">
                    <td className="border border-gray-800 px-3 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-800 px-3 py-2">
                      Peserta didik mampu memahami dan menerapkan konsep {topic.toLowerCase()}
                    </td>
                    <td className="border border-gray-800 px-3 py-2 text-center">
                      {exam.config.classLevel} ({selectedPhase?.label})
                    </td>
                    <td className="border border-gray-800 px-3 py-2">{topic}</td>
                    <td className="border border-gray-800 px-3 py-2">
                      - Mampu menjelaskan konsep {topic.toLowerCase()}<br/>
                      - Mampu menerapkan {topic.toLowerCase()} dalam konteks yang sesuai
                    </td>
                    <td className="border border-gray-800 px-3 py-2 text-center">
                      {cognitiveLevel}
                    </td>
                    <td className="border border-gray-800 px-3 py-2 text-center">
                      {questionType}
                    </td>
                    <td className="border border-gray-800 px-3 py-2 text-center font-bold">
                      {questionNumbers}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 font-bold">
                <td className="border border-gray-800 px-3 py-2 text-center" colSpan={7}>
                  TOTAL
                </td>
                <td className="border border-gray-800 px-3 py-2 text-center">{exam.questions.length} soal</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 print:px-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b-2 border-gray-800 pb-4 print:hidden">
        <h1 className="text-xl font-bold text-gray-800">Kisi-Kisi Ujian</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          ← Kembali ke Soal
        </button>
      </div>

      {/* Meta Info */}
      <div className="mb-6 rounded-xl border border-gray-800 bg-white p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Mata Pelajaran:</span> {exam.config.subject.replace('_', ' ').toUpperCase()}
          </div>
          <div>
            <span className="font-semibold">Kelas:</span> {exam.config.classLevel} ({selectedPhase?.label})
          </div>
          <div>
            <span className="font-semibold">Jumlah Soal:</span> {exam.questions.length}
          </div>
          <div>
            <span className="font-semibold">Total Skor:</span> {totalPoints}
          </div>
          <div>
            <span className="font-semibold">Waktu:</span> {exam.config.duration} menit
          </div>
          {exam.config.teacherName && (
            <div>
              <span className="font-semibold">Guru:</span> {exam.config.teacherName}
            </div>
          )}
        </div>
      </div>

      {/* Tables */}
      {renderNationalStandardTable()}

      {/* Print Button */}
      <div className="mt-6 flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-blue-700"
        >
          🖨️ Cetak Kisi-Kisi
        </button>
      </div>
    </div>
  );
}
