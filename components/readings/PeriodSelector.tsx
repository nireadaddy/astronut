'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScoreDisplay } from '../ui/ScoreDisplay';
import { formatThaiDate } from '@/lib/utils';
import type { TimePeriod } from '@/types';

interface PeriodSelectorProps {
  periods: TimePeriod[];
}

export function PeriodSelector({ periods }: PeriodSelectorProps) {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const currentPeriod = periods[selectedPeriodIndex];

  const periodLabels = {
    week: '7 วัน',
    month: '1 เดือน',
    '3months': '3 เดือน',
    '6months': '6 เดือน',
    year: '1 ปี',
  };

  const handlePrevious = () => {
    setSelectedPeriodIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedPeriodIndex((prev) => Math.min(periods.length - 1, prev + 1));
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          ดวงชะตาตามช่วงเวลา
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={selectedPeriodIndex === 0}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="text-white font-medium">
            {periodLabels[currentPeriod.period]}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedPeriodIndex === periods.length - 1}
            className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div className="text-center text-white/80">
        {formatThaiDate(currentPeriod.startDate)} -{' '}
        {formatThaiDate(currentPeriod.endDate)}
      </div>

      {/* Aspects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(currentPeriod.aspects).map(([key, aspect]) => (
          <div key={key} className="space-y-4">
            <h4 className="text-lg font-semibold text-white capitalize">
              {key === 'career'
                ? 'การงาน'
                : key === 'love'
                ? 'ความรัก'
                : key === 'finance'
                ? 'การเงิน'
                : 'สุขภาพ'}
            </h4>
            <ScoreDisplay
              score={aspect.score}
              label={`แนวโน้ม${
                key === 'career'
                  ? 'การงาน'
                  : key === 'love'
                  ? 'ความรัก'
                  : key === 'finance'
                  ? 'การเงิน'
                  : 'สุขภาพ'
              }`}
            />
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`
                ${
                  aspect.trend === 'up'
                    ? 'text-green-400'
                    : aspect.trend === 'down'
                    ? 'text-red-400'
                    : 'text-blue-400'
                }
              `}
              >
                {aspect.trend === 'up'
                  ? '↑ กำลังขึ้น'
                  : aspect.trend === 'down'
                  ? '↓ กำลังลง'
                  : '→ คงที่'}
              </span>
            </div>
            <p className="text-white/80 text-sm">{aspect.text}</p>
          </div>
        ))}
      </div>

      {/* Lucky Days */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">วันที่เป็นมงคล</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {currentPeriod.luckyDays.map((day, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">
                  {formatThaiDate(day.date)}
                </span>
                <span className="text-yellow-400 font-medium">
                  {day.score}/100
                </span>
              </div>
              <p className="text-white/70 text-sm">{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">
          คำแนะนำสำหรับช่วงนี้
        </h4>
        <p className="text-white/80 leading-relaxed">
          {currentPeriod.recommendations}
        </p>
      </div>
    </div>
  );
}
