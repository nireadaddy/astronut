'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zodiac, Heart, Users, Briefcase } from 'lucide-react';
import type { Compatibility } from '@/types';

interface CompatibilityChartProps {
  sign1: string;
  sign2: string;
}

export function CompatibilityChart({ sign1, sign2 }: CompatibilityChartProps) {
  const [compatibility, setCompatibility] = useState<Compatibility | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const analyzeCompatibility = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sign1, sign2 }),
      });

      if (!response.ok) throw new Error('Failed to analyze compatibility');

      const data = await response.json();
      setCompatibility(data);
    } catch (error) {
      console.error('Error analyzing compatibility:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!compatibility) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6 text-center">
        <Zodiac className="w-12 h-12 text-purple-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-4">
          วิเคราะห์ความเข้ากัน
        </h3>
        <Button
          onClick={analyzeCompatibility}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-500 to-blue-500"
        >
          {isLoading ? 'กำลังวิเคราะห์...' : 'เริ่มวิเคราะห์'}
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          ผลการวิเคราะห์ความเข้ากัน
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-medium">ความรัก</p>
            <p className="text-2xl font-bold text-white">
              {compatibility.scores.love}%
            </p>
          </div>

          <div className="text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-medium">มิตรภาพ</p>
            <p className="text-2xl font-bold text-white">
              {compatibility.scores.friendship}%
            </p>
          </div>

          <div className="text-center">
            <Briefcase className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-white font-medium">การงาน</p>
            <p className="text-2xl font-bold text-white">
              {compatibility.scores.work}%
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-white font-medium mb-2">จุดเด่น</h4>
            <ul className="list-disc list-inside text-white/80">
              {compatibility.analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">ความท้าทาย</h4>
            <ul className="list-disc list-inside text-white/80">
              {compatibility.analysis.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">คำแนะนำ</h4>
            <p className="text-white/80">{compatibility.analysis.advice}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
