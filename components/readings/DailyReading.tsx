'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sun, Moon, Clock } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils/dateUtils';

export function DailyReading() {
  const [reading, setReading] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyReading() {
      try {
        const response = await fetch('/api/daily');
        const data = await response.json();
        setReading(data.reading);
      } catch (error) {
        console.error('Error fetching daily reading:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDailyReading();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sun className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">
            ดวงประจำวันที่ {formatThaiDate(new Date().toISOString())}
          </h2>
          <Moon className="w-6 h-6 text-blue-300" />
        </div>
        <Clock className="w-5 h-5 text-purple-300" />
      </div>

      <div className="text-white space-y-4">
        {reading.split('\n\n').map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </Card>
  );
}
