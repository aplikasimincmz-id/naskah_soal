import { FileText, BookOpen, GraduationCap, Award } from 'lucide-react';
import { questionBank } from '../data/questionBank';

export default function StatsBar() {
  const totalQuestions = questionBank.length;
  const subjects = new Set(questionBank.map((q) => q.subject)).size;
  const types = new Set(questionBank.map((q) => q.type)).size;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="font-bold text-blue-700">{totalQuestions}+</span>
            <span className="hidden sm:inline">Soal</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BookOpen className="h-4 w-4 text-green-500" />
            <span className="font-bold text-green-700">{subjects}</span>
            <span className="hidden sm:inline">Mapel</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="h-4 w-4 text-purple-500" />
            <span className="font-bold text-purple-700">3</span>
            <span className="hidden sm:inline">Jenjang</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Award className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-orange-700">{types}</span>
            <span className="hidden sm:inline">Tipe Soal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
