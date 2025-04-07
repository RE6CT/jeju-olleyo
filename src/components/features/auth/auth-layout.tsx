'use client';

import { Card } from '@/components/ui/card';
import { AuthProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 레이아웃 컴포넌트
 *
 * @param children 자식 요소
 */

const AuthLayout = ({ children }: AuthProps) => {
  return (
    // 인증 페이지 레이아웃
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-md">{children}</Card>
    </div>
  );
};

export default AuthLayout;
