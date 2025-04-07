import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: '이용정보를 입력하여 회원가입하세요',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
