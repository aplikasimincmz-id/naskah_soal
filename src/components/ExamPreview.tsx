import { useState } from 'react';
import { GeneratedExam, Question } from '../types';
import { gradeLabels, phases } from '../data/subjects';
import { calculateTotalPoints } from '../utils/generator';
import {
  Printer,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  BookOpen,
  LayoutGrid,
  PieChart,
} from 'lucide-react';

interface ExamPreviewProps {
  exam: GeneratedExam;
  onRegenerate: () => void;
  onBack: () => void;
  onShowBlueprint: () => void;
  onShowCards: () => void;
  onShowDistribution: () => void;
  warning?: string | null;
}

export default function ExamPreview({ exam, onRegenerate, onBack, onShowBlueprint, onShowCards, onShowDistribution, warning }: ExamPreviewProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalPoints = calculateTotalPoints(exam.questions);
  const selectedPhase = phases.find((p) => p.key === exam.config.phase);
  const durationHours = Number((exam.config.duration / 60).toFixed(1));

  const pgQuestions = exam.questions.filter((q) => q.type === 'pilihan_ganda');
  const pgKompleksQuestions = exam.questions.filter((q) => q.type === 'pilihan_ganda_kompleks');
  const bsQuestions = exam.questions.filter((q) => q.type === 'benar_salah');
  const isianQuestions = exam.questions.filter((q) => q.type === 'isian_singkat');
  const essayQuestions = exam.questions.filter((q) => q.type === 'essay');

  let globalIndex = 0;

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = () => {
    let text = `${exam.config.title}\n`;
    text += `${exam.config.schoolName}\n`;
    text += `Mata Pelajaran: ${exam.config.subject}\n`;
    text += `Fase: ${selectedPhase?.label} | Kelas: ${exam.config.classLevel}\n`;
    if (exam.config.topics.length > 0 && !exam.config.topics.includes('semua')) {
      text += `Topik: ${exam.config.topics.join(', ')}\n`;
    }
    if (exam.config.customMaterial) {
      text += `Materi Pokok: ${exam.config.customMaterial}\n`;
    }
    text += `Waktu: ${durationHours} jam (${exam.config.duration} menit)\n\n`;

    let num = 1;
    exam.questions.forEach((q) => {
      text += `${num}. ${q.text}\n`;
      if (q.options) {
        q.options.forEach((opt) => {
          text += `   ${opt.label}. ${opt.text}\n`;
        });
      }
      text += '\n';
      num++;
    });

    if (showAnswers) {
      text += '\n=== KUNCI JAWABAN ===\n';
      num = 1;
      exam.questions.forEach((q) => {
        text += `${num}. ${q.correctAnswer}\n`;
        num++;
      });
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderQuestion = (q: Question, idx: number) => {
    return (
      <div key={q.id} className="mb-5 break-inside-avoid">
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {idx}
          </span>
          <div className="flex-1">
            <p className="mb-2 text-sm leading-relaxed text-gray-800 whitespace-pre-line">{q.text}</p>
            {q.type === 'pilihan_ganda' && q.options && (
              <div className="ml-1 space-y-1.5">
                {q.options.map((opt) => (
                  <div
                    key={opt.label}
                    className={`flex items-start gap-2 rounded-lg px-3 py-1.5 text-sm ${
                      showAnswers && opt.isCorrect
                        ? 'bg-green-50 font-semibold text-green-700'
                        : 'text-gray-700'
                    }`}
                  >
                    <span
                      className={`font-semibold ${
                        showAnswers && opt.isCorrect ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {opt.label}.
                    </span>
                    <span>{opt.text}</span>
                    {showAnswers && opt.isCorrect && (
                      <CheckCircle2 className="ml-auto h-4 w-4 flex-shrink-0 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
            {q.type === 'pilihan_ganda_kompleks' && q.options && (
              <div className="ml-1 space-y-1.5">
                <p className="mb-2 text-xs italic text-blue-600">
                  ⚠️ Pilih semua jawaban yang benar (bisa lebih dari satu)
                </p>
                {q.options.map((opt) => (
                  <div
                    key={opt.label}
                    className={`flex items-start gap-2 rounded-lg px-3 py-1.5 text-sm ${
                      showAnswers && opt.isCorrect
                        ? 'bg-green-50 font-semibold text-green-700'
                        : 'text-gray-700'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
                        showAnswers && opt.isCorrect
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-400'
                      }`}
                    >
                      {showAnswers && opt.isCorrect && (
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="font-semibold text-gray-500">{opt.label}.</span>
                    <span>{opt.text}</span>
                  </div>
                ))}
                {showAnswers && (
                  <div className="mt-2 rounded-lg bg-green-100 px-3 py-2 text-sm">
                    <span className="font-semibold text-green-700">Jawaban: </span>
                    <span className="text-green-600">{q.correctAnswer}</span>
                  </div>
                )}
              </div>
            )}
            {q.type === 'benar_salah' && (
              <div className="ml-1 flex gap-4">
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm ${
                    showAnswers && q.correctAnswer === 'Benar'
                      ? 'bg-green-50 font-semibold text-green-700'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-gray-400" />
                  Benar
                </div>
                <div
                  className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm ${
                    showAnswers && q.correctAnswer === 'Salah'
                      ? 'bg-green-50 font-semibold text-green-700'
                      : 'text-gray-700'
                  }`}
                >
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-gray-400" />
                  Salah
                </div>
              </div>
            )}
            {q.type === 'isian_singkat' && (
              <div className="ml-1 mt-1">
                <div className="border-b-2 border-dotted border-gray-400 py-2">
                  {showAnswers && (
                    <span className="text-sm font-semibold text-green-600">Jawaban: {q.correctAnswer}</span>
                  )}
                </div>
              </div>
            )}
            {q.type === 'essay' && (
              <div className="ml-1 mt-1">
                {showAnswers ? (
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs font-semibold text-green-700">Kunci Jawaban:</p>
                    <p className="mt-1 text-sm text-green-600">{q.correctAnswer}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((line) => (
                      <div key={line} className="border-b border-dotted border-gray-300 py-2" />
                    ))}
                  </div>
                )}
              </div>
            )}
            {showAnswers && q.explanation && (
              <div className="mt-2 rounded-lg bg-blue-50 p-3">
                <p className="text-xs font-semibold text-blue-700">💡 Pembahasan:</p>
                <p className="mt-1 text-sm text-blue-600">{q.explanation}</p>
              </div>
            )}
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
              <span className="rounded bg-gray-100 px-1.5 py-0.5">{q.points} poin</span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5">{q.topic}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const subjectDisplayName = exam.config.subject
    .replace('_', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Action Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 rounded-xl border border-blue-300 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-100 hover:shadow-md"
        >
          <RefreshCw className="h-4 w-4" />
          Acak Ulang
        </button>
        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all hover:shadow-md ${
            showAnswers
              ? 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {showAnswers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showAnswers ? 'Sembunyikan Jawaban' : 'Tampilkan Jawaban'}
        </button>
        
        {/* New Navigation Buttons */}
        <button
          onClick={onShowBlueprint}
          className="flex items-center gap-2 rounded-xl border border-purple-300 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-100 hover:shadow-md"
        >
          <BookOpen className="h-4 w-4" />
          Kisi-Kisi
        </button>
        <button
          onClick={onShowCards}
          className="flex items-center gap-2 rounded-xl border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition-all hover:bg-orange-100 hover:shadow-md"
        >
          <LayoutGrid className="h-4 w-4" />
          Kartu Soal
        </button>
        <button
          onClick={onShowDistribution}
          className="flex items-center gap-2 rounded-xl border border-teal-300 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-100 hover:shadow-md"
        >
          <PieChart className="h-4 w-4" />
          Sebaran
        </button>
        
        <div className="flex-1" />
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Tersalin!' : 'Salin'}
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl"
        >
          <Printer className="h-4 w-4" />
          Cetak / PDF
        </button>
      </div>

      {/* Warning Message */}
      {warning && (
        <div className="mb-6 rounded-xl border border-yellow-400 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white">!</div>
            <div>
              <p className="text-sm font-medium text-yellow-800">{warning}</p>
              <p className="mt-1 text-xs text-yellow-600">
                Tips: Pilih topik yang lebih umum atau kurangi jumlah soal untuk menghindari duplikasi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exam Paper */}
      <div
        className="rounded-2xl border border-gray-200 bg-white shadow-xl print:border-0 print:shadow-none"
        id="exam-paper"
      >
        {/* Header */}
        <div className="border-b-4 border-double border-gray-800 p-6 text-center print:p-4">
          {exam.config.schoolName && (
            <h2 className="text-lg font-bold uppercase tracking-wide text-gray-800">
              {exam.config.schoolName}
            </h2>
          )}
          <h1 className="mt-1 text-xl font-bold text-gray-900">{exam.config.title}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Tahun Ajaran {exam.config.academicYear} — Semester {exam.config.semester}
          </p>
        </div>

        {/* Info Bar */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-gray-300 px-6 py-3 text-sm text-gray-700 sm:grid-cols-3 print:px-4 print:py-2 print:text-xs">
          <div>
            <span className="text-gray-500">Mata Pelajaran:</span> <strong>{subjectDisplayName}</strong>
          </div>
          <div>
            <span className="text-gray-500">Kelas:</span>{' '}
            <strong>
              {exam.config.classLevel} ({gradeLabels[exam.config.grade]})
            </strong>
          </div>
          <div>
            <span className="text-gray-500">Fase:</span>{' '}
            <strong>{selectedPhase?.label}</strong>
          </div>
          <div>
            <span className="text-gray-500">Waktu:</span> <strong>{durationHours} jam ({exam.config.duration} menit)</strong>
          </div>
          <div>
            <span className="text-gray-500">Total Skor:</span> <strong>{totalPoints}</strong>
          </div>
          <div>
            <span className="text-gray-500">Jumlah Soal:</span> <strong>{exam.questions.length}</strong>
          </div>
        </div>

        {/* Difficulty Distribution Bar */}
        <div className="border-b border-gray-300 px-6 py-2 print:px-4 print:py-1">
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span className="text-gray-500">Komposisi:</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500"></span> Mudah {exam.config.difficultyDist.mudah}%</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500"></span> Sedang {exam.config.difficultyDist.sedang}%</span>
            <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500"></span> Sulit {exam.config.difficultyDist.sulit}%</span>
          </div>
          <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full print:hidden">
            {exam.config.difficultyDist.mudah > 0 && <div className="bg-green-500" style={{ width: `${exam.config.difficultyDist.mudah}%` }} />}
            {exam.config.difficultyDist.sedang > 0 && <div className="bg-amber-500" style={{ width: `${exam.config.difficultyDist.sedang}%` }} />}
            {exam.config.difficultyDist.sulit > 0 && <div className="bg-red-500" style={{ width: `${exam.config.difficultyDist.sulit}%` }} />}
          </div>
        </div>

        {exam.config.teacherName && (
          <div className="border-b border-gray-200 px-6 py-2 text-sm text-gray-600 print:px-4 print:text-xs">
            Guru Pengampu: <strong>{exam.config.teacherName}</strong>
          </div>
        )}

        {/* Topics & Custom Material */}
        {(exam.config.topics.length > 0 || exam.config.customMaterial) && (
          <div className="border-b border-gray-200 px-6 py-2 text-sm text-gray-600 print:px-4 print:text-xs">
            {exam.config.topics.length > 0 && !exam.config.topics.includes('semua') && (
              <div>
                <span className="text-gray-500">Topik:</span>{' '}
                <strong>{exam.config.topics.join(', ')}</strong>
              </div>
            )}
            {exam.config.customMaterial && (
              <div className="mt-1">
                <span className="text-gray-500">Materi Pokok:</span>{' '}
                <strong>{exam.config.customMaterial}</strong>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 print:px-4 print:py-2">
          <p className="text-sm font-semibold text-gray-700">Petunjuk Umum:</p>
          <ul className="mt-1 space-y-0.5 text-xs text-gray-600">
            <li>• Tuliskan nama, kelas, dan nomor absen pada lembar jawaban.</li>
            <li>• Baca setiap soal dengan teliti sebelum menjawab.</li>
            <li>• Kerjakan soal yang dianggap mudah terlebih dahulu.</li>
            <li>• Periksa kembali jawaban sebelum dikumpulkan.</li>
          </ul>
        </div>

        {/* Questions */}
        <div className="px-6 py-5 print:px-4 print:py-3">
          {pgQuestions.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 print:hidden" />
                <h3 className="text-base font-bold text-gray-800">I. Pilihan Ganda</h3>
                <span className="text-xs text-gray-500">({pgQuestions.length} soal)</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 italic">Pilihlah satu jawaban yang paling tepat!</p>
              {pgQuestions.map((q) => {
                globalIndex++;
                return renderQuestion(q, globalIndex);
              })}
            </div>
          )}

          {pgKompleksQuestions.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600 print:hidden" />
                <h3 className="text-base font-bold text-gray-800">
                  {pgQuestions.length > 0 ? 'II' : 'I'}. Pilihan Ganda Kompleks
                </h3>
                <span className="text-xs text-gray-500">({pgKompleksQuestions.length} soal)</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 italic">
                Pilihlah semua jawaban yang benar (bisa lebih dari satu)!
              </p>
              {pgKompleksQuestions.map((q) => {
                globalIndex++;
                return renderQuestion(q, globalIndex);
              })}
            </div>
          )}

          {bsQuestions.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600 print:hidden" />
                <h3 className="text-base font-bold text-gray-800">
                  {['I', 'II', 'III'][[pgQuestions, pgKompleksQuestions].filter((a) => a.length > 0).length]}. Benar / Salah
                </h3>
                <span className="text-xs text-gray-500">({bsQuestions.length} soal)</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 italic">
                Tentukan apakah pernyataan berikut Benar atau Salah!
              </p>
              {bsQuestions.map((q) => {
                globalIndex++;
                return renderQuestion(q, globalIndex);
              })}
            </div>
          )}

          {isianQuestions.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600 print:hidden" />
                <h3 className="text-base font-bold text-gray-800">
                  {['I', 'II', 'III', 'IV'][[pgQuestions, pgKompleksQuestions, bsQuestions].filter((a) => a.length > 0).length]}. Isian Singkat
                </h3>
                <span className="text-xs text-gray-500">({isianQuestions.length} soal)</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 italic">
                Isilah titik-titik berikut dengan jawaban yang tepat!
              </p>
              {isianQuestions.map((q) => {
                globalIndex++;
                return renderQuestion(q, globalIndex);
              })}
            </div>
          )}

          {essayQuestions.length > 0 && (
            <div className="mb-6">
              <div className="mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600 print:hidden" />
                <h3 className="text-base font-bold text-gray-800">
                  {['I', 'II', 'III', 'IV', 'V'][[pgQuestions, pgKompleksQuestions, bsQuestions, isianQuestions].filter((a) => a.length > 0).length]}. Essay / Uraian
                </h3>
                <span className="text-xs text-gray-500">({essayQuestions.length} soal)</span>
              </div>
              <p className="mb-4 text-xs text-gray-500 italic">
                Jawablah pertanyaan berikut dengan lengkap dan jelas!
              </p>
              {essayQuestions.map((q) => {
                globalIndex++;
                return renderQuestion(q, globalIndex);
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-center print:px-4">
          <p className="text-xs text-gray-400">— Selamat Mengerjakan —</p>
          {exam.config.teacherName && (
            <div className="mt-8 flex justify-end print:mt-16">
              <div className="text-center">
                <p className="text-xs text-gray-500">Guru Mata Pelajaran,</p>
                <div className="mt-12 border-b border-gray-400 px-8" />
                <p className="mt-1 text-sm font-semibold text-gray-700">{exam.config.teacherName}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Answer Key */}
      {showAnswers && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-white p-6 shadow-lg print:break-before-page print:border print:shadow-none">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            Kunci Jawaban
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {exam.questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm">
                <span className="font-bold text-green-700">{i + 1}.</span>
                <span className="text-green-600">
                  {q.type === 'pilihan_ganda' || q.type === 'benar_salah'
                    ? q.correctAnswer
                    : q.type === 'isian_singkat'
                    ? q.correctAnswer
                    : '(Lihat pembahasan)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
