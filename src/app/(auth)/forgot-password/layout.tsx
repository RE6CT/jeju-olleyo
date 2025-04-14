import { AUTH_PAGE_META } from '@/constants/auth.constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: AUTH_PAGE_META.FORGOT_PASSWORD.title,
  description: AUTH_PAGE_META.FORGOT_PASSWORD.description,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
