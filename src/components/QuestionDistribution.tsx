import { GeneratedExam } from '../types';
import { calculateTotalPoints } from '../utils/generator';

interface QuestionDistributionProps {
  exam: GeneratedExam;
  onBack: () => void;
}

export default function QuestionDistribution({ exam, onBack }: QuestionDistributionProps) {
  const totalPoints = calculateTotalPoints(exam.questions);

  // Calculate distribution by difficulty
  const difficultyDist = { mudah: 0, sedang: 0, sulit: 0 };
  const typeDist: Record<string, number> = {};
  
  exam.questions.forEach((q) => {
    difficultyDist[q.difficulty]++;
    typeDist[q.type] = (typeDist[q.type] || 0) + 1;
  });

  // Calculate by topic
  const topicDist: Record<string, { count: number; points: number }> = {};
  exam.questions.forEach((q) => {
    if (!topicDist[q.topic]) {
      topicDist[q.topic] = { count: 0, points: 0 };
    }
    topicDist[q.topic].count++;
    topicDist[q.topic].points += q.points;
  });

  // Pie chart data for difficulty
  const pieData = [
    { label: 'Mudah', value: difficultyDist.mudah, color: 'bg-green-500' },
    { label: 'Sedang', value: difficultyDist.sedang, color: 'bg-yellow-500' },
    { label: 'Sulit', value: difficultyDist.sulit, color: 'bg-red-500' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 print:px-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between border-b-2 border-gray-800 pb-4 print:hidden">
        <h1 className="text-xl font-bold text-gray-800">Sebaran Soal</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
        >
          ← Kembali ke Soal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="text-xs font-medium text-blue-600">Total Soal</div>
          <div className="text-2xl font-bold text-blue-800">{exam.questions.length}</div>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="text-xs font-medium text-green-600">Total Skor</div>
          <div className="text-2xl font-bold text-green-800">{totalPoints}</div>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
          <div className="text-xs font-medium text-purple-600">Durasi</div>
          <div className="text-lg font-bold text-purple-800">{exam.config.duration} menit</div>
        </div>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
          <div className="text-xs font-medium text-orange-600">Rata-rata Bobot</div>
          <div className="text-lg font-bold text-orange-800">
            {(totalPoints / exam.questions.length).toFixed(1)}
          </div>
        </div>
      </div>

      {/* Difficulty Distribution */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800">Sebaran Berdasarkan Tingkat Kesulitan</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Pie Chart */}
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {pieData.map((segment, idx) => {
                  const startAngle = idx === 0 ? 0 : pieData.slice(0, idx).reduce((sum, s) => sum + (s.value / exam.questions.length) * 360, 0);
                  const angle = (segment.value / exam.questions.length) * 360;
                  const endAngle = startAngle + angle;
                  const largeArcFlag = angle > 180 ? 1 : 0;
                  const startX = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const startY = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const endX = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const endY = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                  return (
                    <path
                      key={segment.label}
                      d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      className={segment.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800">{exam.questions.length}</div>
                  <div className="text-xs text-gray-500">Soal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {pieData.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded ${item.color}`}></div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">{item.value}</div>
                  <div className="text-xs text-gray-500">
                    {((item.value / exam.questions.length) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Type Distribution */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800">Sebaran Berdasarkan Tipe Soal</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(typeDist).map(([type, count]) => (
            <div key={type} className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="text-lg font-bold text-gray-800">
                {type
                  .replace('_', ' ')
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
              <div className="text-2xl font-bold text-blue-600">{count}</div>
              <div className="text-xs text-gray-500">soal</div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Distribution */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-bold text-gray-800">Sebaran Berdasarkan Topik</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2">No</th>
                <th className="border border-gray-300 px-3 py-2">Topik/Materi</th>
                <th className="border border-gray-300 px-3 py-2">Jumlah Soal</th>
                <th className="border border-gray-300 px-3 py-2">Total Bobot</th>
                <th className="border border-gray-300 px-3 py-2">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(topicDist).map(([topic, data], idx) => (
                <tr key={topic} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">{topic}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-bold">{data.count}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">{data.points}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {((data.count / exam.questions.length) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="mt-6 flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-lg hover:bg-blue-700"
        >
          🖨️ Cetak Analisis
        </button>
      </div>
    </div>
  );
}
