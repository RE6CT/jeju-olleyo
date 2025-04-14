import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/config/tq-provider';
import Header from '@/components/layouts/header';
import AuthProvider from '@/config/auth-provider';
import localFont from 'next/font/local';
import Footer from '@/components/layouts/footer';

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
        className={`${pretendard.variable} font-pretendard flex min-h-screen w-full flex-col antialiased`}
      >
        <AuthProvider>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
