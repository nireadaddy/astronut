'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Mail, UserPlus } from 'lucide-react';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Add login logic here
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
      <h2 className="text-xl font-bold text-white mb-6">เข้าสู่ระบบ</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white text-sm mb-1 block">อีเมล</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <Input
              type="email"
              className="pl-10 bg-white/20 text-white placeholder:text-white/50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="text-white text-sm mb-1 block">รหัสผ่าน</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <Input
              type="password"
              className="pl-10 bg-white/20 text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </Button>
      </form>
    </Card>
  );
}

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Add registration logic here
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการลงทะเบียน');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0 p-6">
      <h2 className="text-xl font-bold text-white mb-6">ลงทะเบียน</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-white text-sm mb-1 block">ชื่อ-นามสกุล</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <Input
              type="text"
              className="pl-10 bg-white/20 text-white placeholder:text-white/50"
              placeholder="ชื่อ นามสกุล"
            />
          </div>
        </div>

        <div>
          <label className="text-white text-sm mb-1 block">อีเมล</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <Input
              type="email"
              className="pl-10 bg-white/20 text-white placeholder:text-white/50"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label className="text-white text-sm mb-1 block">รหัสผ่าน</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
            <Input
              type="password"
              className="pl-10 bg-white/20 text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
        </Button>
      </form>
    </Card>
  );
}
