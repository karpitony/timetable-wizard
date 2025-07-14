'use client';

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 좌측: 로고 */}
        <Link href="/" className="flex items-end space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">시간표 마법사</h1>
          <span className="text-sm text-orange-500 font-medium">beta</span>
        </Link>

        {/* 우측: CTA 버튼 */}
        <nav className="flex gap-4">
          <Link 
            href="/"
            className="text-base font-medium hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
          >
            홈
          </Link>
          <Link 
            href="/wizard"
            className="text-base font-medium hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
          >
            마법사 시작
          </Link>
          <Link 
            href="/timetable"
            className="text-base font-medium hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
          >
            내 시간표 보기
          </Link>
        </nav>

      </div>
    </header>
  );
}
