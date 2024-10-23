'use client';

import { Star } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  label: string;
  description?: string;
}

export function ScoreDisplay({ score, label, description }: ScoreDisplayProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'from-green-500 to-green-400';
    if (value >= 60) return 'from-blue-500 to-blue-400';
    if (value >= 40) return 'from-yellow-500 to-yellow-400';
    return 'from-red-500 to-red-400';
  };

  const getScoreStatus = (value: number) => {
    if (value >= 80) return 'ดีมาก';
    if (value >= 60) return 'ดี';
    if (value >= 40) return 'ปานกลาง';
    return 'ต้องระวัง';
  };

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Star
            className={`w-5 h-5 ${
              score >= 60 ? 'text-yellow-400' : 'text-gray-400'
            }`}
          />
          <span className="text-white font-medium">{label}</span>
        </div>
        <span
          className={`text-lg font-bold bg-gradient-to-r ${getScoreColor(
            score
          )} bg-clip-text text-transparent`}
        >
          {score}/100
        </span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(
            score
          )} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className={`${score < 40 ? 'text-red-400' : 'text-white/60'}`}>
          {getScoreStatus(score)}
        </span>
        {description && <span className="text-white/60">{description}</span>}
      </div>
    </div>
  );
}
