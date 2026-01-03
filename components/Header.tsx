'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', text: '홈' },
  { href: '/wizard', text: '마법사 시작' },
  { href: '/timetable', text: '내 시간표 보기' },
  { href: '/course-competition', text: '강의 경쟁률' },
  { href: '/notice', text: '공지사항' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* 좌측: 로고 */}
        <Link href="/" className="flex items-end space-x-2">
          <h1 className="text-2xl font-bold tracking-tight">시간표 마법사</h1>
          <span className="text-sm text-orange-500 font-medium">beta</span>
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex gap-4">
          {NAV_ITEMS.map(item => (
            <NavLink key={item.href} href={item.href} text={item.text} />
          ))}
        </nav>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {open && (
        <nav className="md:hidden flex flex-col gap-2 px-4 pb-4">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              text={item.text}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, text, onClick }: { href: string; text: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="text-base font-medium hover:bg-gray-200 px-3 py-2 rounded-md transition-colors"
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
