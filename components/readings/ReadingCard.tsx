'use client';

import { Card } from '@/components/ui/card';
import { Sun, Moon, Star, Heart, Briefcase, Coins, Heart } from 'lucide-react';

interface ReadingCardProps {
  reading?: {
    content: string;
    aspects: {
      career: string;
      love: string;
      finance: string;
      health: string;
    };
  };
}

export function ReadingCard({ reading }: ReadingCardProps) {
  if (!reading) return null;

  const aspects = [
    { icon: Briefcase, title: 'การงาน', content: reading.aspects.career },
    { icon: Heart, title: 'ความรัก', content: reading.aspects.love },
    { icon: Coins, title: 'การเงิน', content: reading.aspects.finance },
    { icon: Heart, title: 'สุขภาพ', content: reading.aspects.health },
  ];

  return (
    <div className="space-y-6">
      {/* Main Reading */}
      <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sun className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">การวิเคราะห์โดยรวม</h2>
          <Moon className="w-6 h-6 text-blue-300" />
        </div>
        <div className="text-white space-y-4">
          {reading.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {/* Aspects */}
      <div className="grid md:grid-cols-2 gap-6">
        {aspects.map((aspect, index) => (
          <Card
            key={index}
            className="bg-white/10 backdrop-blur-lg border-0 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <aspect.icon className="w-5 h-5 text-purple-300" />
              <h3 className="text-lg font-bold text-white">{aspect.title}</h3>
            </div>
            <p className="text-white leading-relaxed">{aspect.content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
