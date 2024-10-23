'use client';

import { Logo } from './Logo';

export function Header() {
  return (
    <header className="bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <Logo />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
              ASTRO URANIAN
            </h1>
            <p className="text-sm text-white/70">โหราศาสตร์ยูเรเนียน AI</p>
          </div>
        </div>
      </div>
    </header>
  );
}
