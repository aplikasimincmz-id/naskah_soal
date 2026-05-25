import { SubjectInfo } from '../types';

interface SubjectCardProps {
  subject: SubjectInfo;
  isSelected: boolean;
  onClick: () => void;
}

export default function SubjectCard({ subject, isSelected, onClick }: SubjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100 ring-2 ring-blue-400/50'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
      }`}
    >
      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.color} text-3xl shadow-md transition-transform group-hover:scale-110`}>
        {subject.icon}
      </div>
      <span className={`text-sm font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
        {subject.name}
      </span>
      {isSelected && (
        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
}
