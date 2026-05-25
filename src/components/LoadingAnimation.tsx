import { useEffect, useState } from 'react';

const loadingMessages = [
  '🔍 Menganalisis kurikulum...',
  '📚 Menyiapkan bank soal...',
  '🧠 Mengolah tingkat kesulitan...',
  '✨ Menyusun soal ujian...',
  '📝 Memformat lembar soal...',
  '✅ Memverifikasi kunci jawaban...',
];

export default function LoadingAnimation() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
    }, 200);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      {/* Animated circles */}
      <div className="relative mb-8">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">📄</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4 h-2 w-64 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading message */}
      <p className="text-sm font-medium text-gray-600 transition-opacity duration-300">
        {loadingMessages[messageIndex]}
      </p>
      <p className="mt-2 text-xs text-gray-400">Mohon tunggu sebentar...</p>
    </div>
  );
}
