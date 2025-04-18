import { Metadata } from 'next';

import { AUTH_PAGE_META } from '@/constants/auth.constants';

export const metadata: Metadata = {
  title: AUTH_PAGE_META.RESET_PASSWORD.title,
  description: AUTH_PAGE_META.RESET_PASSWORD.description,
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
