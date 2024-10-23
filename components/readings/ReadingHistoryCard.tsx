'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils/dateUtils';
import Link from 'next/link';

interface ReadingHistoryCardProps {
  reading: {
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
}

export function ReadingHistoryCard({ reading }: ReadingHistoryCardProps) {
  // Get first paragraph as preview
  const preview = reading.content.split('\n')[0];

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-300" />
          <span className="text-white">
            {formatThaiDate(reading.createdAt)}
          </span>
        </div>
        <Link href={`/reading/${reading.id}`}>
          <Button variant="ghost" className="text-white">
            ดูรายละเอียด
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      <p className="text-white/80 line-clamp-3">{preview}</p>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(reading.aspects).map(([key, value]) => (
          <div key={key} className="text-white/70">
            <span className="font-medium capitalize">{key}: </span>
            <span className="line-clamp-1">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
