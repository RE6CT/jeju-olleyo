import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/config/tq-provider';

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
