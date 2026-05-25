import { GeneratedExam, Question } from '../types';
import { phases } from '../data/subjects';
import { calculateTotalPoints } from '../utils/generator';

interface QuestionCardsProps {
  exam: GeneratedExam;
  onBack: () => void;
}

export default function QuestionCards({ exam, onBack }: QuestionCardsProps) {
  const selectedPhase = phases.find((p) => p.key === exam.config.phase);
  const totalPoints = calculateTotalPoints(exam.questions);

  const renderQuestionCard = (q: Question, index: number) => {
    return (
      <div key={q.id} className="mb-6 break-inside-avoid rounded-xl border-2 border-gray-300 bg-white p-5 shadow-sm">
        {/* Card Header */}
        <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {index + 1}
            </div>
            <span className="text-xs font-medium text-gray-500">Kartu Soal #{index + 1}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="rounded bg-blue-100 px-2 py-1 font-medium text-blue-700">{q.topic}</span>
            <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-700 capitalize">{q.difficulty}</span>
            <span className="rounded bg-green-100 px-2 py-1 font-medium text-green-700">{q.points} poin</span>
          </div>
        </div>

        {/* Question Content */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">{q.text}</p>
        </div>

        {/* Options for PG / PG Kompleks */}
        {(q.type === 'pilihan_ganda' || q.type === 'pilihan_ganda_kompleks') && q.options && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-gray-500">Pilihan Jawaban:</p>
            <div className="space-y-1.5">
              {q.options.map((opt) => (
                <div
                  key={opt.label}
                  className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${
                    opt.isCorrect ? 'bg-green-50 border border-green-300' : 'bg-gray-50'
                  }`}
                >
                  <span className="font-bold text-gray-600">{opt.label}.</span>
                  <span className="text-gray-700">{opt.text}</span>
                  {opt.isCorrect && <span className="ml-auto text-xs font-bold text-green-600">✓ BENAR</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* True/False */}
        {q.type === 'benar_salah' && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-gray-500">Pilihan:</p>
            <div className="flex gap-4">
              <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${q.correctAnswer === 'Benar' ? 'bg-green-50 border border-green-300' : 'bg-gray-50'}`}>
                <span className="font-bold">A.</span> Benar
                {q.correctAnswer === 'Benar' && <span className="ml-2 text-xs font-bold text-green-600">✓</span>}
              </div>
              <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${q.correctAnswer === 'Salah' ? 'bg-green-50 border border-green-300' : 'bg-gray-50'}`}>
                <span className="font-bold">B.</span> Salah
                {q.correctAnswer === 'Salah' && <span className="ml-2 text-xs font-bold text-green-600">✓</span>}
              </div>
            </div>
          </div>
        )}

        {/* Short Answer */}
        {q.type === 'isian_singkat' && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-gray-500">Jawaban:</p>
            <div className="rounded-lg bg-gray-100 px-3 py-2 font-mono text-sm font-bold text-gray-700">
              {q.correctAnswer}
            </div>
          </div>
        )}

        {/* Essay */}
        {q.type === 'essay' && (
          <div className="mb-3">
            <p className="mb-2 text-xs font-medium text-gray-500">Kunci Jawaban:</p>
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-sm text-blue-800">{q.correctAnswer}</p>
            </div>
          </div>
        )}

        {/* Explanation */}
        {q.explanation && (
          <div className="mt-3 rounded-lg bg-yellow-50 p-3">
            <p className="text-xs font-semibold text-yellow-700">💡 Pembahasan:</p>
            <p className="mt-1 text-sm text-yellow-600">{q.explanation}</p>
          </div>
        )}

        {/* Card Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2">
          <div className="text-xs text-gray-500">
            {q.type === 'pilihan_ganda_kompleks' && <span>⚠️ PG Kompleks (bisa lebih dari 1 jawaban)</span>}
          </div>
          <div className="text-xs text-gray-400">ID: {q.id}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 print:px-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b-2 border-gray-800 pb-4 print:hidden">
        <h1 className="text-xl font-bold text-gray-800">Kartu Soal</h1>
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
            <span className="font-semibold">Jumlah Kartu:</span> {exam.questions.length}
          </div>
          <div>
            <span className="font-semibold">Total Skor:</span> {totalPoints} poin
          </div>
        </div>
      </div>

      {/* Question Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2">
        {exam.questions.map((q, idx) => renderQuestionCard(q, idx))}
      </div>

      {/* Print Button */}
      <div className="mt-6 flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-blue-700"
        >
          🖨️ Cetak Kartu Soal
        </button>
      </div>
    </div>
  );
}
