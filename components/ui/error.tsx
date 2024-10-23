'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-lg bg-red-500/10 p-4 text-red-400">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <p>{message}</p>
      </div>
    </div>
  );
}

export function ErrorScreen({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-white">
      <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">เกิดข้อผิดพลาด</h2>
      <p className="text-white/70 mb-6">กรุณาลองใหม่อีกครั้ง</p>
      <Button onClick={reset} className="flex items-center gap-2">
        <RefreshCcw className="h-4 w-4" />
        ลองใหม่
      </Button>
    </div>
  );
}
