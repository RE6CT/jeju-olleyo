import type { Metadata } from 'next';
import './globals.css';

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
      <body>{children}</body>
    </html>
  );
}
