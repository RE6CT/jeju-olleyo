import { Metadata } from 'next';

import { AUTH_PAGE_META } from '@/constants/auth.constants';

export const metadata: Metadata = {
  title: AUTH_PAGE_META.SIGNIN.title,
  description: AUTH_PAGE_META.SIGNIN.description,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
