import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import ProgressBar from '@/app/_Provider/ProgressBar';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TimetableIntegrityGate from '@/components/Wizard/TimetableIntegrityGate';
import NoticeAlert from '@/components/NoticeAlert';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '시간표 마법사 beta',
  description: '시간표 마법사는 간단하게 시간표를 만들어주는 웹 서비스입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="r766th2h5faMjIfYnPUTpD-8xpC7920UHRfOOgQKOVY"
        />
        <meta name="naver-site-verification" content="6afa6a19c3a3b924d485e2c8379e993526817663" />
      </head>
      <body className={`font-pretendard ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProgressBar>
          <Header />
          <TimetableIntegrityGate />
          <NoticeAlert message="종합강의시간표 데이터를 반영했습니다." href="/notice" />
          <main>{children}</main>
          <Footer />
        </ProgressBar>
        {/* Analytics */}
        <Analytics />
        <GoogleAnalytics gaId="GT-NC8XXWX3" />
      </body>
    </html>
  );
}
