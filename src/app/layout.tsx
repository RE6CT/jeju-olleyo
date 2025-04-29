import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import AlertModal from '@/components/commons/alert-modal';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/config/auth-provider';
import Providers from '@/config/tq-provider';
import EasterEggWrapper from '@/components/commons/EasterEggWrapper';
import BottomNav from '@/components/layouts/bottom-nav';

export const metadata: Metadata = {
  title: '제주 올레요',
  description: '제주 여행을 떠나기 위한 일정 만들어요!',
  icons: {
    icon: '/logo/color_logo_single_bg.png',
  },
};

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} font-pretendard flex flex-col items-center justify-center antialiased`}
      >
        <Providers>
          <AuthProvider>
            <div className="flex h-full w-[375px] max-w-[1024px] flex-col bg-home-gradient pb-[85px] md:w-full md:bg-none">
              <Header />
              <div className="h-full w-full md:pb-0">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <BottomNav />
            </div>
            <AlertModal />
            <Toaster />
            <EasterEggWrapper />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
