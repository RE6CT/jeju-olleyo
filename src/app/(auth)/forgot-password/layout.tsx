import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 찾기',
  description: '가입시 입력한 이메일로 비밀번호를 재설정하세요',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
