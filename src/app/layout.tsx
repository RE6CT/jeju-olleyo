import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import AlertModal from '@/components/commons/alert-modal';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/config/auth-provider';
import Providers from '@/config/tq-provider';
export const metadata: Metadata = {
  title: '제주 올레요',
  description: '제주 여행을 떠나기 위한 일정 만들어요!',
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
    <html lang="en">
      <body
        className={`${pretendard.variable} font-pretendard flex min-h-screen w-full flex-col items-center justify-center antialiased`}
      >
        <AuthProvider>
          <Providers>
            <div className="flex w-full max-w-[1024px] flex-1 flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AlertModal />
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
