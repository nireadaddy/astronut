'use client';

import { useState } from 'react';
import { User, Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import { LoadingScreen } from '../ui/LoadingScreen';
import { ScoreDisplay } from '../readings/ScoreDisplay';

interface Reading {
  powerScore: number;
  overall: string;
  aspects: {
    career: {
      score: number;
      text: string;
    };
    love: {
      score: number;
      text: string;
    };
    finance: {
      score: number;
      text: string;
    };
    health: {
      score: number;
      text: string;
    };
  };
  predictions: string;
}

export function BirthDataForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setLoadingProgress(0);

    try {
      // Initial progress
      setLoadingProgress(35);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setLoadingProgress(75);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || 'การวิเคราะห์ล้มเหลว กรุณาลองใหม่อีกครั้ง'
        );
      }

      setLoadingProgress(90);
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!data.reading) {
        throw new Error('ไม่สามารถประมวลผลได้ กรุณาลองใหม่อีกครั้ง');
      }

      setReading(data.reading);
      setLoadingProgress(100);

      setTimeout(() => {
        setIsLoading(false);
        document.getElementById('reading-results')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 500);
    } catch (error) {
      console.error('Error:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {isLoading && (
        <LoadingScreen
          progress={loadingProgress}
          messages={{
            0: 'กำลังเตรียมการวิเคราะห์...',
            35: 'กำลังวิเคราะห์ดวงดาว...',
            75: 'กำลังประมวลผลการวิเคราะห์...',
            90: 'กำลังสรุปผล...',
            100: 'เสร็จสมบูรณ์',
          }}
        />
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-white text-sm flex items-center gap-2">
              <User className="w-4 h-4" />
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="กรุณากรอกชื่อ-นามสกุล"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-white text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                วันเกิด
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-white text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                เวลาเกิด
              </label>
              <input
                type="time"
                value={formData.birthTime}
                onChange={(e) =>
                  setFormData({ ...formData, birthTime: e.target.value })
                }
                className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-white text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              สถานที่เกิด
            </label>
            <input
              type="text"
              value={formData.birthPlace}
              onChange={(e) =>
                setFormData({ ...formData, birthPlace: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/10 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="กรุณากรอกสถานที่เกิด"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์ดวงชะตา'}
          </button>
        </form>
      </div>

      {/* Results */}
      {reading && (
        <div id="reading-results" className="space-y-6 animate-fade-in-up">
          {/* Power Score */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">คะแนนพลังดวง</h3>
            <ScoreDisplay
              score={reading.powerScore}
              label="พลังดวงโดยรวม"
              description="คะแนนรวมทุกด้าน"
            />
          </div>

          {/* Overall Analysis */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              การวิเคราะห์โดยรวม
            </h3>
            <p className="text-white/90 leading-relaxed whitespace-pre-line">
              {reading.overall}
            </p>
          </div>

          {/* Aspects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Career */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
              <h4 className="text-lg font-bold text-white mb-4">การงาน</h4>
              <ScoreDisplay
                score={reading.aspects.career.score}
                label="ด้านการงาน"
              />
              <div className="mt-4">
                <p className="text-white/90 whitespace-pre-line">
                  {reading.aspects.career.text}
                </p>
              </div>
            </div>

            {/* Love */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
              <h4 className="text-lg font-bold text-white mb-4">ความรัก</h4>
              <ScoreDisplay
                score={reading.aspects.love.score}
                label="ด้านความรัก"
              />
              <div className="mt-4">
                <p className="text-white/90 whitespace-pre-line">
                  {reading.aspects.love.text}
                </p>
              </div>
            </div>

            {/* Finance */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
              <h4 className="text-lg font-bold text-white mb-4">การเงิน</h4>
              <ScoreDisplay
                score={reading.aspects.finance.score}
                label="ด้านการเงิน"
              />
              <div className="mt-4">
                <p className="text-white/90 whitespace-pre-line">
                  {reading.aspects.finance.text}
                </p>
              </div>
            </div>

            {/* Health */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
              <h4 className="text-lg font-bold text-white mb-4">สุขภาพ</h4>
              <ScoreDisplay
                score={reading.aspects.health.score}
                label="ด้านสุขภาพ"
              />
              <div className="mt-4">
                <p className="text-white/90 whitespace-pre-line">
                  {reading.aspects.health.text}
                </p>
              </div>
            </div>
          </div>

          {/* Predictions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6">
            <h3 className="text-xl font-bold text-white mb-4">การพยากรณ์</h3>
            <p className="text-white/90 leading-relaxed whitespace-pre-line">
              {reading.predictions}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
