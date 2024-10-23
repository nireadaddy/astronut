'use client';

import { Moon, Stars, Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Logo Icon */}
      <div className="relative w-24 h-24">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse" />

        {/* Main Moon */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Moon className="w-20 h-20 text-white" />

          {/* Decorative Stars */}
          <Stars
            className="w-8 h-8 text-yellow-300 absolute -top-2 right-0 animate-twinkle"
            style={{ animationDelay: '0.5s' }}
          />
          <Stars
            className="w-6 h-6 text-purple-300 absolute top-2 -left-2 animate-twinkle"
            style={{ animationDelay: '0.8s' }}
          />
          <Sparkles
            className="w-7 h-7 text-blue-300 absolute bottom-1 right-2 animate-twinkle"
            style={{ animationDelay: '1.2s' }}
          />
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 text-transparent bg-clip-text animate-gradient">
          ASTRO URANIAN
        </h1>
        <p className="text-white/80 font-medium mt-1">โหราศาสตร์ยูเรเนียน</p>
      </div>
    </div>
  );
}
