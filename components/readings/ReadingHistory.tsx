'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Filter } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils/dateUtils';
import { ReadingHistoryCard } from './ReadingHistoryCard';

type Reading = {
  id: string;
  createdAt: string;
  content: string;
  aspects: {
    career: string;
    love: string;
    finance: string;
    health: string;
  };
};

export function ReadingHistory() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchReadings() {
      try {
        const response = await fetch('/api/readings');
        const data = await response.json();
        setReadings(data.readings);
      } catch (error) {
        console.error('Error fetching readings:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReadings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-purple-300" />
            <span className="text-white">กรองข้อมูล</span>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'ghost'}
              className="text-white"
            >
              ทั้งหมด
            </Button>
            <Button
              onClick={() => setFilter('month')}
              variant={filter === 'month' ? 'default' : 'ghost'}
              className="text-white"
            >
              เดือนนี้
            </Button>
          </div>
        </div>
      </Card>

      {/* Reading History List */}
      <div className="space-y-4">
        {readings.map((reading) => (
          <ReadingHistoryCard key={reading.id} reading={reading} />
        ))}
      </div>
    </div>
  );
}
