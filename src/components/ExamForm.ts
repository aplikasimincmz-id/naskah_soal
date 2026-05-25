import { useState, useCallback, useMemo } from 'react';
import { ExamConfig, GradeLevel, QuestionType, Difficulty, DifficultyDistribution } from '../types';
import { subjects, gradeLabels, questionTypeLabels, phases, getPhasesByGrade } from '../data/subjects';
import SubjectCard from './SubjectCard';
import {
  GraduationCap,
  FileQuestion,
  BarChart3,
  Hash,
  Clock,
  User,
  School,
  Calendar,
  BookOpenCheck,
  ChevronRight,
  ChevronLeft,
  Wand2,
  Layers,
  Milestone,
  Users,
  PenLine,
  X,
  Check,
} from 'lucide-react';

const DIFFICULTY_PRESETS: { label: string; dist: DifficultyDistribution }[] = [
  { label: 'Hanya Mudah', dist: { mudah: 100, sedang: 0, sulit: 0 } },
  { label: 'Hanya Sedang', dist: { mudah: 0, sedang: 100, sulit: 0 } },
  { label: 'Hanya Sulit', dist: { mudah: 0, sedang: 0, sulit: 100 } },
  { label: 'Seimbang', dist: { mudah: 34, sedang: 33, sulit: 33 } },
  { label: 'Mudah–Sedang', dist: { mudah: 50, sedang: 50, sulit: 0 } },
  { label: 'HOTS (Berpikir Tingkat Tinggi)', dist: { mudah: 10, sedang: 30, sulit: 60 } },
  { label: 'Standar Ujian', dist: { mudah: 30, sedang: 50, sulit: 20 } },
];

interface ExamFormProps {
  onGenerate: (config: ExamConfig) => void;
}

export default function ExamForm({ onGenerate }: ExamFormProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Partial<ExamConfig>>({
    title: '',
    subject: undefined,
    grade: undefined,
    phase: undefined,
    classLevel: undefined,
    topics: [],
    customMaterial: '',
    questionTypes: ['pilihan_ganda'],
    difficultyDist: { mudah: 30, sedang: 50, sulit: 20 },
    questionCount: 10,
    duration: 60,
    teacherName: '',
    schoolName: '',
    semester: 'Ganjil',
    academicYear: '2025/2026',
  });

  const selectedSubject = subjects.find((s) => s.key === config.subject);
  const selectedPhase = phases.find((p) => p.key === config.phase);
  const availablePhases = config.grade ? getPhasesByGrade(config.grade) : [];
  const availableClasses = selectedPhase ? selectedPhase.classes : [];
  const availableTopics = selectedSubject && config.phase ? selectedSubject.topics[config.phase] : [];

  const dist = config.difficultyDist || { mudah: 30, sedang: 50, sulit: 20 };
  const distTotal = dist.mudah + dist.sedang + dist.sulit;
  const isDistValid = distTotal === 100;

  // Calculate question counts per difficulty
  const qCount = config.questionCount || 10;
  const durationMinutes = config.duration || 60;
  const durationHours = Number((durationMinutes / 60).toFixed(1));
  
  const setDurationHours = (hours: number) => {
    const clampedHours = Math.max(0.5, Math.min(6, hours));
    updateConfig({ duration: Math.round(clampedHours * 60) });
  };

  const countPreview = useMemo(() => {
    const m = Math.round((dist.mudah / 100) * qCount);
    const s = Math.round((dist.sulit / 100) * qCount);
    const se = qCount - m - s;
    return { mudah: m, sedang: se, sulit: s };
  }, [dist, qCount]);

  const updateConfig = (updates: Partial<ExamConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  // Update one difficulty and auto-adjust others to keep total = 100
  const updateDifficulty = useCallback(
    (key: Difficulty, value: number) => {
      const clamped = Math.max(0, Math.min(100, value));
      const newDist = { ...dist, [key]: clamped };

      // Auto-adjust: distribute the remainder proportionally among the other two
      const others = (['mudah', 'sedang', 'sulit'] as Difficulty[]).filter((k) => k !== key);
      const remaining = 100 - clamped;
      const otherSum = others.reduce((s, k) => s + newDist[k], 0);

      if (otherSum === 0) {
        // Split evenly
        newDist[others[0]] = Math.floor(remaining / 2);
        newDist[others[1]] = remaining - newDist[others[0]];
      } else {
        // Proportional
        const ratio0 = newDist[others[0]] / otherSum;
        newDist[others[0]] = Math.round(remaining * ratio0);
        newDist[others[1]] = remaining - newDist[others[0]];
      }

      // Clamp negatives
      for (const k of others) {
        if (newDist[k] < 0) newDist[k] = 0;
      }

      // Fix rounding
      const finalTotal = newDist.mudah + newDist.sedang + newDist.sulit;
      if (finalTotal !== 100) {
        newDist[others[1]] += 100 - finalTotal;
      }

      updateConfig({ difficultyDist: newDist });
    },
    [dist]
  );

  const applyPreset = (preset: DifficultyDistribution) => {
    updateConfig({ difficultyDist: { ...preset } });
  };

  const toggleTopic = (topic: string) => {
    const currentTopics = config.topics || [];
    if (topic === 'semua') {
      if (currentTopics.includes('semua')) {
        updateConfig({ topics: [] });
      } else {
        updateConfig({ topics: ['semua'] });
      }
    } else {
      let newTopics = currentTopics.filter((t) => t !== 'semua');
      if (newTopics.includes(topic)) {
        newTopics = newTopics.filter((t) => t !== topic);
      } else {
        newTopics = [...newTopics, topic];
      }
      updateConfig({ topics: newTopics });
    }
  };

  const selectAllTopics = () => updateConfig({ topics: ['semua'] });
  const clearAllTopics = () => updateConfig({ topics: [] });

  const toggleQuestionType = (type: QuestionType) => {
    const current = config.questionTypes || [];
    if (current.includes(type)) {
      if (current.length > 1) {
        updateConfig({ questionTypes: current.filter((t) => t !== type) });
      }
    } else {
      updateConfig({ questionTypes: [...current, type] });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!config.subject;
      case 2:
        return !!config.grade && !!config.phase && !!config.classLevel;
      case 3:
        return (config.questionTypes?.length || 0) > 0 && isDistValid;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleGenerate = () => {
    const phaseLabel = selectedPhase ? `${selectedPhase.label}` : '';
    const classLabel = config.classLevel ? `Kelas ${config.classLevel}` : '';
    const title =
      config.title || `Soal ${selectedSubject?.name || ''} — ${phaseLabel} ${classLabel}`;
    onGenerate({ ...config, title } as ExamConfig);
  };

  const totalSteps = 4;
  const stepLabels = ['Mata Pelajaran', 'Fase & Kelas', 'Pengaturan', 'Info Ujian'];

  const selectedTopicsDisplay = () => {
    const topics = config.topics || [];
    if (topics.length === 0) return 'Belum dipilih';
    if (topics.includes('semua')) return 'Semua Topik';
    if (topics.length <= 2) return topics.join(', ');
    return `${topics.length} topik dipilih`;
  };

  const difficultyDistSummary = () => {
    const parts: string[] = [];
    if (dist.mudah > 0) parts.push(`Mudah ${dist.mudah}%`);
    if (dist.sedang > 0) parts.push(`Sedang ${dist.sedang}%`);
    if (dist.sulit > 0) parts.push(`Sulit ${dist.sulit}%`);
    return parts.join(' · ');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              {s < totalSteps && (
                <div
                  className={`mx-1 hidden h-1 w-12 rounded-full sm:block md:w-24 lg:w-32 ${
                    s < step ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          {stepLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      {/* Step 1: Subject Selection */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <BookOpenCheck className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Pilih Mata Pelajaran</h2>
            <p className="mt-1 text-gray-500">Pilih mata pelajaran untuk soal yang akan dibuat</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.key}
                subject={subject}
                isSelected={config.subject === subject.key}
                onClick={() => updateConfig({ subject: subject.key, topics: [], customMaterial: '' })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Grade, Phase & Class Selection */}
      {step === 2 && (
        <div className="animate-fadeIn space-y-8">
          <div>
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Jenjang, Fase & Kelas</h2>
              <p className="mt-1 text-gray-500">Pilih jenjang pendidikan, fase, dan kelas</p>
            </div>

            <div className="mb-6">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <GraduationCap className="h-4 w-4 text-indigo-500" />
                Jenjang Pendidikan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.entries(gradeLabels) as [GradeLevel, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() =>
                      updateConfig({ grade: key, phase: undefined, classLevel: undefined, topics: [], customMaterial: '' })
                    }
                    className={`group flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      config.grade === key
                        ? 'border-indigo-500 bg-indigo-50 shadow-md ring-2 ring-indigo-400/50'
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className={`text-3xl ${config.grade === key ? 'scale-110' : ''} transition-transform`}>
                      {key === 'sd' ? '🏫' : key === 'smp' ? '🎒' : '🎓'}
                    </div>
                    <span className={`text-sm font-semibold ${config.grade === key ? 'text-indigo-700' : 'text-gray-700'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {config.grade && (
              <div className="mb-6 animate-fadeIn">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Milestone className="h-4 w-4 text-emerald-500" />
                  Fase (Kurikulum Merdeka)
                </label>
                <div className={`grid gap-3 ${availablePhases.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {availablePhases.map((phase) => (
                    <button
                      key={phase.key}
                      onClick={() =>
                        updateConfig({ phase: phase.key, classLevel: undefined, topics: [], customMaterial: '' })
                      }
                      className={`group relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        config.phase === phase.key
                          ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-400/50'
                          : 'border-gray-200 bg-white hover:border-emerald-300'
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${phase.color} text-2xl shadow-md transition-transform group-hover:scale-110`}
                      >
                        {phase.emoji}
                      </div>
                      <div className="text-center">
                        <span
                          className={`block text-sm font-bold ${
                            config.phase === phase.key ? 'text-emerald-700' : 'text-gray-800'
                          }`}
                        >
                          {phase.label}
                        </span>
                        <span className="block text-xs text-gray-500">{phase.description}</span>
                      </div>
                      {config.phase === phase.key && (
                        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {config.phase && availableClasses.length > 0 && (
              <div className="animate-fadeIn">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Users className="h-4 w-4 text-blue-500" />
                  Kelas
                </label>
                <div className={`grid gap-3 ${availableClasses.length === 1 ? 'grid-cols-1 max-w-[200px]' : availableClasses.length === 2 ? 'grid-cols-2 max-w-[400px]' : 'grid-cols-3 max-w-[500px]'}`}>
                  {availableClasses.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => updateConfig({ classLevel: cls, topics: [], customMaterial: '' })}
                      className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        config.classLevel === cls
                          ? 'border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-400/50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                          config.classLevel === cls
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {cls}
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          config.classLevel === cls ? 'text-blue-700' : 'text-gray-600'
                        }`}
                      >
                        Kelas {cls}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {config.grade && config.phase && config.classLevel && (
              <div className="mt-6 animate-fadeIn rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-xl">✅</div>
                  <div>
                    <p className="text-sm font-bold text-emerald-800">Pilihan Anda</p>
                    <p className="text-sm text-emerald-600">
                      {gradeLabels[config.grade]} — {selectedPhase?.label} ({selectedPhase?.description}) — Kelas {config.classLevel}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Question Settings */}
      {step === 3 && (
        <div className="animate-fadeIn space-y-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <Layers className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Pengaturan Soal</h2>
            <p className="mt-1 text-gray-500">Pilih topik, jenis soal, dan tingkat kesulitan</p>
          </div>

          {/* Topics Multi-Select */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <BookOpenCheck className="h-4 w-4 text-blue-500" />
                Topik / Materi
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                  {selectedTopicsDisplay()}
                </span>
              </label>
              <div className="flex gap-2">
                <button onClick={selectAllTopics} className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100">
                  <Check className="h-3 w-3" /> Pilih Semua
                </button>
                <button onClick={clearAllTopics} className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200">
                  <X className="h-3 w-3" /> Hapus
                </button>
              </div>
            </div>
            <p className="mb-3 text-xs text-gray-500">
              Pilih satu atau beberapa topik (sesuai {selectedPhase?.label} - Kelas {config.classLevel})
            </p>
            <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <button
                onClick={() => toggleTopic('semua')}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm transition-all ${
                  config.topics?.includes('semua') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300'
                }`}
              >
                <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${config.topics?.includes('semua') ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}`}>
                  {config.topics?.includes('semua') && <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </span>
                <span className="font-medium">📚 Semua Topik</span>
              </button>
              {availableTopics.map((topic: string) => {
                const isSelected = config.topics?.includes(topic);
                const isDisabled = config.topics?.includes('semua');
                return (
                  <button key={topic} onClick={() => !isDisabled && toggleTopic(topic)} disabled={isDisabled}
                    className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm transition-all ${isDisabled ? 'cursor-not-allowed border-gray-100 bg-gray-50 text-gray-400' : isSelected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300'}`}
                  >
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${isDisabled ? 'border-gray-300 bg-gray-200' : isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400'}`}>
                      {(isSelected || isDisabled) && <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </span>
                    <span className={`truncate ${isSelected ? 'font-medium' : ''}`}>{topic}</span>
                  </button>
                );
              })}
            </div>
            {config.topics && config.topics.length > 0 && !config.topics.includes('semua') && (
              <div className="flex flex-wrap gap-2 rounded-lg bg-blue-50/50 p-3">
                <span className="text-xs font-medium text-blue-600">Topik terpilih:</span>
                {config.topics.map((topic) => (
                  <span key={topic} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                    {topic}
                    <button onClick={() => toggleTopic(topic)} className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Custom Material Input */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <PenLine className="h-4 w-4 text-purple-500" />
              Materi Pokok (Opsional)
            </label>
            <p className="mb-3 text-xs text-gray-500">Tulis materi pokok atau kompetensi dasar yang akan diujikan.</p>
            <textarea
              value={config.customMaterial}
              onChange={(e) => updateConfig({ customMaterial: e.target.value })}
              placeholder="Contoh: Operasi Hitung Bilangan Bulat, Mengenal Pecahan Senilai, dst..."
              rows={3}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 focus:outline-none"
            />
          </div>

          {/* Question Types */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileQuestion className="h-4 w-4 text-purple-500" />
              Jenis Soal (bisa pilih lebih dari satu)
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(Object.entries(questionTypeLabels) as [QuestionType, string][]).map(([key, label]) => (
                <button key={key} onClick={() => toggleQuestionType(key)}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all ${config.questionTypes?.includes(key) ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300'}`}
                >
                  {key === 'pilihan_ganda' && '🔘 '}
                  {key === 'pilihan_ganda_kompleks' && '☑️ '}
                  {key === 'essay' && '✍️ '}
                  {key === 'benar_salah' && '✅ '}
                  {key === 'isian_singkat' && '📝 '}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ===== NEW: Difficulty Distribution ===== */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <BarChart3 className="h-4 w-4 text-orange-500" />
              Tingkat Kesulitan
            </label>
            <p className="mb-4 text-xs text-gray-500">
              Atur komposisi tingkat kesulitan soal. Total harus 100%.
            </p>

            {/* Presets */}
            <div className="mb-5">
              <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">Preset Cepat</p>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTY_PRESETS.map((preset) => {
                  const isActive =
                    dist.mudah === preset.dist.mudah &&
                    dist.sedang === preset.dist.sedang &&
                    dist.sulit === preset.dist.sulit;
                  return (
                    <button
                      key={preset.label}
                      onClick={() => applyPreset(preset.dist)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        isActive
                          ? 'border-orange-400 bg-orange-50 text-orange-700 shadow-sm'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300 hover:bg-orange-50/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Distribution Bar */}
            <div className="mb-5">
              <div className="flex h-8 w-full overflow-hidden rounded-xl">
                {dist.mudah > 0 && (
                  <div
                    className="flex items-center justify-center bg-gradient-to-r from-green-400 to-green-500 text-xs font-bold text-white transition-all duration-300"
                    style={{ width: `${dist.mudah}%` }}
                  >
                    {dist.mudah >= 10 && `${dist.mudah}%`}
                  </div>
                )}
                {dist.sedang > 0 && (
                  <div
                    className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-amber-500 text-xs font-bold text-white transition-all duration-300"
                    style={{ width: `${dist.sedang}%` }}
                  >
                    {dist.sedang >= 10 && `${dist.sedang}%`}
                  </div>
                )}
                {dist.sulit > 0 && (
                  <div
                    className="flex items-center justify-center bg-gradient-to-r from-red-400 to-red-500 text-xs font-bold text-white transition-all duration-300"
                    style={{ width: `${dist.sulit}%` }}
                  >
                    {dist.sulit >= 10 && `${dist.sulit}%`}
                  </div>
                )}
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-gray-400">
                <span>🟢 Mudah</span>
                <span>🟡 Sedang</span>
                <span>🔴 Sulit</span>
              </div>
            </div>

            {/* Sliders + Inputs */}
            <div className="space-y-4">
              {([
                { key: 'mudah' as Difficulty, label: 'Mudah', emoji: '🟢', color: 'green', bg: 'bg-green-500' },
                { key: 'sedang' as Difficulty, label: 'Sedang', emoji: '🟡', color: 'yellow', bg: 'bg-amber-500' },
                { key: 'sulit' as Difficulty, label: 'Sulit', emoji: '🔴', color: 'red', bg: 'bg-red-500' },
              ]).map(({ key, label, emoji, bg }) => (
                <div key={key} className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{emoji}</span>
                      <span className="text-sm font-semibold text-gray-700">{label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={dist[key]}
                        onChange={(e) => updateDifficulty(key, parseInt(e.target.value) || 0)}
                        className="w-16 rounded-lg border border-gray-300 bg-white px-2 py-1 text-center text-sm font-bold text-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                      />
                      <span className="text-sm text-gray-500">%</span>
                      <span className="ml-1 min-w-[3rem] rounded bg-gray-200 px-2 py-0.5 text-center text-xs font-medium text-gray-600">
                        {countPreview[key]} soal
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={dist[key]}
                    onChange={(e) => updateDifficulty(key, parseInt(e.target.value))}
                    className="slider w-full cursor-pointer accent-gray-600"
                    style={{
                      accentColor:
                        key === 'mudah' ? '#22c55e' : key === 'sedang' ? '#f59e0b' : '#ef4444',
                    }}
                  />
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className={`h-full rounded-full ${bg} transition-all duration-200`} style={{ width: `${dist[key]}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Total Indicator */}
            <div className={`mt-4 flex items-center justify-between rounded-xl p-3 ${isDistValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {isDistValid ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
                <span className={`text-sm font-semibold ${isDistValid ? 'text-green-700' : 'text-red-600'}`}>
                  Total: {distTotal}%
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {isDistValid ? (
                  <span className="text-green-600">✓ Komposisi valid</span>
                ) : (
                  <span className="text-red-500">Harus tepat 100%</span>
                )}
              </div>
            </div>

            {/* Question Count Preview */}
            <div className="mt-3 rounded-xl bg-blue-50 border border-blue-200 p-3">
              <p className="text-xs font-medium text-blue-700 mb-2">
                📊 Distribusi dari {qCount} soal:
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="font-bold text-green-700">{countPreview.mudah}</span>
                  <span className="text-gray-500">Mudah</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                  <span className="font-bold text-amber-700">{countPreview.sedang}</span>
                  <span className="text-gray-500">Sedang</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="font-bold text-red-700">{countPreview.sulit}</span>
                  <span className="text-gray-500">Sulit</span>
                </span>
              </div>
            </div>
          </div>

          {/* ===== UPDATED: Question Count & Duration ===== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Hash className="h-4 w-4 text-blue-500" />
                Jumlah Soal
              </label>
              <div className="mb-3 flex flex-wrap gap-2">
                {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((v) => (
                  <button
                    key={v}
                    onClick={() => updateConfig({ questionCount: v })}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      config.questionCount === v
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <input type="number" min={1} max={100} value={config.questionCount}
                onChange={(e) => updateConfig({ questionCount: Math.min(100, Math.max(1, parseInt(e.target.value) || 1)) })}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <p className="mt-2 text-xs text-gray-500">Rekomendasi: 30-50 soal untuk ujian lengkap</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Clock className="h-4 w-4 text-green-500" />
                Jumlah Jam
              </label>
              <div className="mb-3 flex flex-wrap gap-2">
                {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map((v) => (
                  <button
                    key={v}
                    onClick={() => setDurationHours(v)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      durationHours === v
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                    }`}
                  >
                    {v} jam
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={0.5}
                max={6}
                step={0.5}
                value={durationHours}
                onChange={(e) => setDurationHours(parseFloat(e.target.value) || 1)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
              <p className="mt-2 text-xs text-gray-500">Setara {durationMinutes} menit (1,5-3 jam untuk ujian lengkap)</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Exam Info */}
      {step === 4 && (
        <div className="animate-fadeIn space-y-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <User className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Informasi Ujian</h2>
            <p className="mt-1 text-gray-500">Lengkapi informasi untuk header soal</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileQuestion className="h-4 w-4 text-blue-500" />
                Judul Ujian
              </label>
              <input type="text" placeholder={`Contoh: Ujian Tengah Semester ${selectedSubject?.name || ''}`}
                value={config.title} onChange={(e) => updateConfig({ title: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-purple-500" /> Nama Guru
                </label>
                <input type="text" placeholder="Masukkan nama guru" value={config.teacherName}
                  onChange={(e) => updateConfig({ teacherName: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <School className="h-4 w-4 text-indigo-500" /> Nama Sekolah
                </label>
                <input type="text" placeholder="Masukkan nama sekolah" value={config.schoolName}
                  onChange={(e) => updateConfig({ schoolName: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="h-4 w-4 text-green-500" /> Semester
                </label>
                <select value={config.semester} onChange={(e) => updateConfig({ semester: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
                >
                  <option value="Ganjil">Semester Ganjil</option>
                  <option value="Genap">Semester Genap</option>
                </select>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="h-4 w-4 text-orange-500" /> Tahun Ajaran
                </label>
                <input type="text" placeholder="2025/2026" value={config.academicYear}
                  onChange={(e) => updateConfig({ academicYear: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
            <h3 className="mb-3 font-bold text-blue-800">📋 Ringkasan Pengaturan</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
              <div>📘 Mapel: <strong>{selectedSubject?.name}</strong></div>
              <div>🎓 Jenjang: <strong>{gradeLabels[config.grade || 'sd']}</strong></div>
              <div>🏷️ Fase: <strong>{selectedPhase?.label}</strong></div>
              <div>👨‍🎓 Kelas: <strong>Kelas {config.classLevel}</strong></div>
              <div className="col-span-2">
                📚 Topik:{' '}
                <strong>
                  {config.topics?.includes('semua') ? 'Semua Topik' : config.topics && config.topics.length > 0 ? config.topics.join(', ') : 'Semua Topik'}
                </strong>
              </div>
              {config.customMaterial && (
                <div className="col-span-2">📝 Materi Pokok: <strong>{config.customMaterial}</strong></div>
              )}
              <div>📝 Jenis: <strong>{config.questionTypes?.map((t) => questionTypeLabels[t]).join(', ')}</strong></div>
              <div>📊 Kesulitan: <strong>{difficultyDistSummary()}</strong></div>
              <div>🔢 Jumlah: <strong>{config.questionCount} soal</strong></div>
              <div>⏱️ Durasi: <strong>{durationHours} jam ({durationMinutes} menit)</strong></div>
            </div>
            {/* Mini distribution bar in summary */}
            <div className="mt-3 flex h-3 w-full overflow-hidden rounded-full">
              {dist.mudah > 0 && <div className="bg-green-500 transition-all" style={{ width: `${dist.mudah}%` }} />}
              {dist.sedang > 0 && <div className="bg-amber-500 transition-all" style={{ width: `${dist.sedang}%` }} />}
              {dist.sulit > 0 && <div className="bg-red-500 transition-all" style={{ width: `${dist.sulit}%` }} />}
            </div>
            <div className="mt-1 flex gap-4 text-xs text-blue-600">
              <span>🟢 {countPreview.mudah} Mudah</span>
              <span>🟡 {countPreview.sedang} Sedang</span>
              <span>🔴 {countPreview.sulit} Sulit</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" /> Kembali
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button onClick={() => canProceed() && setStep((s) => s + 1)} disabled={!canProceed()}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${canProceed() ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl' : 'cursor-not-allowed bg-gray-300 text-gray-500'}`}
          >
            Lanjut <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={handleGenerate}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
          >
            <Wand2 className="h-5 w-5" /> Generate Soal
          </button>
        )}
      </div>
    </div>
  );
}
