import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/config/tq-provider';
import Header from '@/components/layouts/header';
import AuthProvider from '@/config/auth-provider';

export const metadata: Metadata = {
  title: '제주 올레요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <Header />
            <main className="py-[100px]">{children}</main>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
