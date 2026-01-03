import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import NoticeAlert from '@/components/NoticeAlert';

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {/* <NoticeAlert
          message="도움이 되셨다면 GitHub에 별⭐️을 눌러주세요. 큰 힘이 됩니다!"
          href="https://github.com/karpitony/timetable-wizard"
        /> */}
        <main>{children}</main>
        <Footer />
        {/* Analytics */}
        <Analytics />
        <GoogleAnalytics gaId="GT-NC8XXWX3" />
      </body>
    </html>
  );
}
