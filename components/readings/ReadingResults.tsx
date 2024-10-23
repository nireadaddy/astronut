'use client';

import { useState } from 'react';
import {
  Star,
  Calendar,
  MessageCircle,
  Send,
  ChevronRight,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface Score {
  value: number;
  trend: 'up' | 'down' | 'stable';
  details: string;
}

interface DetailedScore {
  career: Score;
  love: Score;
  finance: Score;
  health: Score;
  luck: Score;
}

interface TimePeriod {
  period: '7d' | '1m' | '6m';
  scores: DetailedScore;
  predictions: string;
}

interface ReadingResultProps {
  reading: {
    overall: string;
    powerScore: number; // Overall power score
    luckyElements: string[]; // Lucky elements
    unluckyElements: string[]; // Things to avoid
    goodDays: string[]; // Lucky days
    goodTime: string[]; // Lucky hours
    aspects: {
      career: string;
      love: string;
      finance: string;
      health: string;
    };
    detailedScores: DetailedScore;
    timePeriods: TimePeriod[];
  };
}

export function ReadingResults({ reading }: ReadingResultProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '1m' | '6m'>(
    '7d'
  );
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<
    Array<{ question: string; answer: string }>
  >([]);

  // Function to render score with trend indicator
  const renderScore = (score: Score) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {/* Star Rating */}
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < score.value
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-white/20'
              }`}
            />
          ))}
        </div>
        {/* Trend Indicator */}
        <span
          className={`text-sm ${
            score.trend === 'up'
              ? 'text-green-400'
              : score.trend === 'down'
              ? 'text-red-400'
              : 'text-blue-400'
          }`}
        >
          {score.trend === 'up' ? '↑' : score.trend === 'down' ? '↓' : '→'}
        </span>
      </div>
      <p className="text-white/70 text-sm">{score.details}</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Power Score and Overall Analysis */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">คะแนนพลังดวง</h3>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {reading.powerScore}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-white/90 leading-relaxed">{reading.overall}</p>

          {/* Lucky Elements */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium">สิ่งที่เป็นมงคล</h4>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                {reading.luckyElements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">สิ่งที่ควรหลีกเลี่ยง</h4>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                {reading.unluckyElements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lucky Times */}
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium">วันที่เป็นมงคล</h4>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                {reading.goodDays.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-medium">เวลาที่เป็นมงคล</h4>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                {reading.goodTime.map((time, index) => (
                  <li key={index}>{time}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">คะแนนรายด้าน</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-white font-medium">การงาน</h4>
            {renderScore(reading.detailedScores.career)}
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">ความรัก</h4>
            {renderScore(reading.detailedScores.love)}
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">การเงิน</h4>
            {renderScore(reading.detailedScores.finance)}
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">สุขภาพ</h4>
            {renderScore(reading.detailedScores.health)}
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">โชคลาภ</h4>
            {renderScore(reading.detailedScores.luck)}
          </div>
        </div>
      </div>

      {/* Time Period Analysis */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">
            การพยากรณ์ตามช่วงเวลา
          </h3>
          <div className="flex gap-2">
            {(['7d', '1m', '6m'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedPeriod === period
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {period === '7d'
                  ? '7 วัน'
                  : period === '1m'
                  ? '1 เดือน'
                  : '6 เดือน'}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Period Analysis */}
        {reading.timePeriods.map(
          (periodData) =>
            periodData.period === selectedPeriod && (
              <div key={periodData.period} className="space-y-6">
                <p className="text-white/90 leading-relaxed">
                  {periodData.predictions}
                </p>

                {/* Period Specific Scores */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">การงาน</h4>
                    {renderScore(periodData.scores.career)}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">ความรัก</h4>
                    {renderScore(periodData.scores.love)}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">การเงิน</h4>
                    {renderScore(periodData.scores.finance)}
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* Question Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">ถามเพิ่มเติม</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none"
              placeholder="พิมพ์คำถามของคุณที่นี่..."
            />
            <button
              onClick={() => {
                /* handle question */
              }}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              ถาม
            </button>
          </div>

          {/* Previous Q&A */}
          <div className="space-y-4">
            {answers.map((item, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70 text-sm mb-2">Q: {item.question}</p>
                <p className="text-white">A: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
