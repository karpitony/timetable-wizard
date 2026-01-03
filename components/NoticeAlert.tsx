'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'noticeHidden_2025_08_01';

export default function NoticeAlert({ message, href }: { message: string; href?: string }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') setHidden(true);
    else setHidden(false);
  }, []);

  const handleClose = () => {
    setHidden(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (hidden) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 max-w-4xl w-full bg-green-200 border border-green-400 p-2 md:p-4 rounded shadow-md flex justify-between items-center z-50">
      <Link
        href={href || '/notice'}
        className="flex-1 pr-1 text-gray-600 underline text-sm md:text-base font-semibold hover:text-gray-800 animate-pulse"
        onClick={handleClose}
      >
        {message}
      </Link>
      <Button variant="ghost" size="sm" onClick={handleClose} aria-label="닫기">
        X
      </Button>
    </div>
  );
}
