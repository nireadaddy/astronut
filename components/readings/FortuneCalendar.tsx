'use client';

import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface FortuneCalendarProps {
  monthlyFortune: MonthlyFortune[];
}

export function FortuneCalendar({ monthlyFortune }: FortuneCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(0);

  const fortune = monthlyFortune[currentMonth];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          ปฏิทินโชคชะตา
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth((prev) => Math.max(0, prev - 1))}
            disabled={currentMonth === 0}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-medium">{fortune.month}</span>
          <button
            onClick={() =>
              setCurrentMonth((prev) =>
                Math.min(monthlyFortune.length - 1, prev + 1)
              )
            }
            disabled={currentMonth === monthlyFortune.length - 1}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Monthly Score */}
        <ScoreDisplay
          score={fortune.score.value}
          label="คะแนนรวมประจำเดือน"
          description={fortune.score.description}
        />

        {/* Good Days */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">วันที่ดี</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fortune.goodDays.map((day, index) => (
              <div key={index} className="bg-green-500/10 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{day.date}</span>
                  <span className="text-green-400">{day.score}/100</span>
                </div>
                <p className="text-sm text-white/70">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bad Days */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-white">วันที่ควรระวัง</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fortune.badDays.map((day, index) => (
              <div key={index} className="bg-red-500/10 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{day.date}</span>
                  <span className="text-red-400">{day.score}/100</span>
                </div>
                <p className="text-sm text-white/70">{day.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">
            คำแนะนำประจำเดือน
          </h4>
          <p className="text-white/80">{fortune.recommendations}</p>
        </div>
      </div>
    </div>
  );
}
