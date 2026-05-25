import { BookOpen, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={onReset} className="flex items-center gap-3 transition-transform hover:scale-105">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Guru Soal</h1>
              <p className="text-xs text-blue-200 sm:text-sm">Generator Soal Otomatis</p>
            </div>
          </button>
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur-sm sm:text-sm">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
}
