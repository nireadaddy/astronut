'use client';

import { useEffect, useState } from 'react';
import { Moon, Stars, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
  messages: {
    [key: number]: string;
  };
}

export function LoadingScreen({ progress, messages }: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((current) => {
        if (current < progress) {
          return Math.min(current + 1, progress);
        }
        return current;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    const thresholds = Object.keys(messages)
      .map(Number)
      .sort((a, b) => a - b);
    const currentThreshold = thresholds.reduce((acc, threshold) => {
      if (displayProgress >= threshold) return threshold;
      return acc;
    }, 0);

    setCurrentMessage(messages[currentThreshold]);
  }, [displayProgress, messages]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
          <Moon className="w-24 h-24 text-white absolute inset-0 animate-pulse" />
          <Stars
            className="w-8 h-8 text-yellow-300 absolute -top-2 right-0 animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <Stars
            className="w-6 h-6 text-purple-300 absolute top-2 -left-2 animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
          <Sparkles
            className="w-7 h-7 text-blue-300 absolute bottom-0 right-0 animate-bounce"
            style={{ animationDelay: '0.6s' }}
          />
        </div>

        {/* Message */}
        <div className="h-8">
          <p className="text-white text-lg animate-fade-in">{currentMessage}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-white text-xl font-semibold">{displayProgress}%</p>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/50 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
