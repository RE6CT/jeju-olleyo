import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '계정 정보를 입력하여 로그인하세요',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
