import { useState, useCallback } from 'react';
import { ExamConfig, GeneratedExam } from './types';
import { generateExam } from './utils/generator';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import ExamForm from './components/ExamForm';
import ExamPreview from './components/ExamPreview';
import QuestionBlueprint from './components/QuestionBlueprint';
import QuestionCards from './components/QuestionCards';
import QuestionDistribution from './components/QuestionDistribution';
import LoadingAnimation from './components/LoadingAnimation';

type AppView = 'form' | 'loading' | 'preview' | 'blueprint' | 'cards' | 'distribution';

export default function App() {
  const [view, setView] = useState<AppView>('form');
  const [exam, setExam] = useState<GeneratedExam | null>(null);
  const [currentConfig, setCurrentConfig] = useState<ExamConfig | null>(null);
  const [generationWarning, setGenerationWarning] = useState<string | null>(null);

  // Mengubah menjadi async untuk mendukung pemanggilan database di generator
  const handleGenerate = useCallback(async (config: ExamConfig) => {
    setCurrentConfig(config);
    setView('loading');
    setGenerationWarning(null);

    // Simulate generation time for UX (Tetap dipertahankan sesuai kode asli Anda)
    setTimeout(async () => {
      try {
        // Memanggil fungsi generator yang sekarang mengambil data dari database
        const generatedExam = await generateExam(config);
        
        // Check if we got enough questions from selected topics
        if (config.topics.length > 0 && !config.topics.includes('semua')) {
          const questionsFromSelectedTopics = generatedExam.questions.filter(q => 
            config.topics.includes(q.topic)
          ).length;
          
          if (questionsFromSelectedTopics < config.questionCount) {
            const shortage = config.questionCount - questionsFromSelectedTopics;
            const warningMsg = `⚠️ Hanya ${questionsFromSelectedTopics} soal ditemukan dari ${config.topics.length} topik yang dipilih. ` +
              `Kurang ${shortage} soal. Menambahkan soal dari topik terkait.`;
            console.warn(`[Guru Soal] ${warningMsg}`);
            setGenerationWarning(warningMsg);
          }
        }
        
        // Always ensure exact count
        if (generatedExam.questions.length !== config.questionCount) {
          const shortage = config.questionCount - generatedExam.questions.length;
          if (shortage > 0 && generatedExam.questions.length > 0) {
            const baseQuestions = generatedExam.questions;
            const filler = Array.from({ length: shortage }, (_, i) => {
              const base = baseQuestions[i % baseQuestions.length];
              return {
                ...base,
                id: `${base.id}-filler-${i}`,
                text: `[DUPLIKAT] ${base.text}`,
              };
            });
            generatedExam.questions = [...generatedExam.questions, ...filler];
          }
        }
        
        // Ensure exact count
        generatedExam.questions = generatedExam.questions.slice(0, config.questionCount);
        
        // Re-index to ensure sequential numbering
        generatedExam.questions = generatedExam.questions.map((q, idx) => ({
          ...q,
          id: `exam-${idx + 1}`,
        }));
        
        setExam(generatedExam);
        setView('preview');
      } catch (error) {
        console.error("Gagal men-generate soal:", error);
        setGenerationWarning("⚠️ Terjadi kesalahan saat mengambil soal dari database.");
        setView('form');
      }
    }, 2500);
  }, []);

  // Mengubah menjadi async untuk mendukung pemanggilan database di generator
  const handleRegenerate = useCallback(async () => {
    if (currentConfig) {
      setView('loading');
      setGenerationWarning(null);
      
      setTimeout(async () => {
        try {
          const generatedExam = await generateExam(currentConfig);
          
          // Re-apply checks
          if (currentConfig.topics.length > 0 && !currentConfig.topics.includes('semua')) {
            const questionsFromSelectedTopics = generatedExam.questions.filter(q => 
              currentConfig.topics.includes(q.topic)
            ).length;
            
            if (questionsFromSelectedTopics < currentConfig.questionCount) {
              const shortage = currentConfig.questionCount - questionsFromSelectedTopics;
              const warningMsg = `⚠️ Hanya ${questionsFromSelectedTopics} soal ditemukan dari topik yang dipilih. ` +
                `Kurang ${shortage} soal.`;
              console.warn(`[Guru Soal] ${warningMsg}`);
              setGenerationWarning(warningMsg);
            }
          }
          
          if (generatedExam.questions.length !== currentConfig.questionCount) {
            const shortage = currentConfig.questionCount - generatedExam.questions.length;
            if (shortage > 0 && generatedExam.questions.length > 0) {
              const baseQuestions = generatedExam.questions;
              const filler = Array.from({ length: shortage }, (_, i) => {
                const base = baseQuestions[i % baseQuestions.length];
                return {
                  ...base,
                  id: `${base.id}-filler-${i}`,
                  text: `[DUPLIKAT] ${base.text}`,
                };
              });
              generatedExam.questions = [...generatedExam.questions, ...filler];
            }
          }
          
          generatedExam.questions = generatedExam.questions.slice(0, currentConfig.questionCount);
          generatedExam.questions = generatedExam.questions.map((q, idx) => ({
            ...q,
            id: `exam-${idx + 1}`,
          }));
          
          setExam(generatedExam);
          setView('preview');
        } catch (error) {
          console.error("Gagal men-generate ulang soal:", error);
          setView('preview');
        }
      }, 1500);
    }
  }, [currentConfig]);

  const handleBack = useCallback(() => {
    setView('form');
    setGenerationWarning(null);
  }, []);

  const handleReset = useCallback(() => {
    setView('form');
    setExam(null);
    setCurrentConfig(null);
    setGenerationWarning(null);
  }, []);

  const navigateToBlueprint = useCallback(() => {
    if (exam) {
      setView('blueprint');
    }
  }, [exam]);

  const navigateToCards = useCallback(() => {
    if (exam) {
      setView('cards');
    }
  }, [exam]);

  const navigateToDistribution = useCallback(() => {
    if (exam) {
      setView('distribution');
    }
  }, [exam]);

  const navigateToPreview = useCallback(() => {
    setView('preview');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 print:bg-white">
      <div className="print:hidden">
        <Header onReset={handleReset} />
        {view === 'form' && <StatsBar />}
      </div>

      <main>
        {view === 'form' && <ExamForm onGenerate={handleGenerate} />}
        {view === 'loading' && <LoadingAnimation />}
        {view === 'preview' && exam && (
          <ExamPreview 
            exam={exam} 
            onRegenerate={handleRegenerate} 
            onBack={handleBack}
            onShowBlueprint={navigateToBlueprint}
            onShowCards={navigateToCards}
            onShowDistribution={navigateToDistribution}
            warning={generationWarning}
          />
        )}
        {view === 'blueprint' && exam && (
          <QuestionBlueprint exam={exam} onBack={navigateToPreview} />
        )}
        {view === 'cards' && exam && (
          <QuestionCards exam={exam} onBack={navigateToPreview} />
        )}
        {view === 'distribution' && exam && (
          <QuestionDistribution exam={exam} onBack={navigateToPreview} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400 print:hidden">
        <p>© 2025 Guru Soal — Generator Soal Otomatis untuk Guru Indonesia 🇮🇩</p>
      </footer>
    </div>
  );
}
