'use client';

import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScoreDisplay } from '../ui/ScoreDisplay';
import type { DateRangePredictions } from '@/types';

interface DateRangePredictorProps {
  dateRanges: DateRangePredictions;
}

export function DateRangePredictor({ dateRanges }: DateRangePredictorProps) {
  const [selectedRange, setSelectedRange] =
    useState<keyof DateRangePredictions>('week');

  const ranges = {
    week: { title: '7 วันข้างหน้า', data: dateRanges.week },
    month: { title: '1 เดือนข้างหน้า', data: dateRanges.month },
    threeMonths: { title: '3 เดือนข้างหน้า', data: dateRanges.threeMonths },
    sixMonths: { title: '6 เดือนข้างหน้า', data: dateRanges.sixMonths },
  };

  return (
    <div className="space-y-6">
      {/* Range Selector */}
      <div className="flex items-center justify-center gap-2">
        {Object.entries(ranges).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setSelectedRange(key as keyof DateRangePredictions)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedRange === key
                ? 'bg-purple-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Selected Range Display */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {ranges[selectedRange].title}
          </h4>
          <span className="text-white/60 text-sm">
            {new Date(ranges[selectedRange].data.startDate).toLocaleDateString(
              'th-TH'
            )}{' '}
            -
            {new Date(ranges[selectedRange].data.endDate).toLocaleDateString(
              'th-TH'
            )}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <ScoreDisplay
              score={ranges[selectedRange].data.aspects.career.score}
              label="การงาน"
            />
          </div>
          <div>
            <ScoreDisplay
              score={ranges[selectedRange].data.aspects.love.score}
              label="ความรัก"
            />
          </div>
          <div>
            <ScoreDisplay
              score={ranges[selectedRange].data.aspects.finance.score}
              label="การเงิน"
            />
          </div>
          <div>
            <ScoreDisplay
              score={ranges[selectedRange].data.aspects.health.score}
              label="สุขภาพ"
            />
          </div>
        </div>

        <p className="text-white/90 leading-relaxed whitespace-pre-line">
          {ranges[selectedRange].data.description}
        </p>
      </div>
    </div>
  );
}
