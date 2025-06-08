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
  title: { default: '제주 올레요', template: '%s - 제주 올레요' },
  description: '제주 여행을 떠나기 위한 일정 만들어요!',
  twitter: {
    card: 'summary_large_image',
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
        className={`${pretendard.variable} font-pretendard h-full antialiased`}
      >
        <Providers>
          <AuthProvider>
            <div className="mx-auto flex h-full w-full min-w-[375px] max-w-[375px] flex-col overflow-hidden bg-home-gradient pb-[86px] md:max-w-[769px] md:bg-none md:pb-0 lg:max-w-[1024px]">
              <Header />
              <div className="hide-scrollbar flex h-full w-full flex-col overflow-auto overflow-x-hidden md:pb-0">
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
