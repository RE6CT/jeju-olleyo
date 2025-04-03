'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AuthLayoutProps {
  children: ReactNode;
}

/**
 * 인증 관련 페이지의 레이아웃 컴포넌트
 *
 * @param children 자식 요소
 */

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">{children}</Card>
    </div>
  );
};

export default AuthLayout;
