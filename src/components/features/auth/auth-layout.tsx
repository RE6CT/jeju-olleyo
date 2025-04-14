'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { AuthProps } from '@/types/auth.type';
import useAuthStore from '@/zustand/auth.store';
import { usePathname } from 'next/navigation';

/**
 * 인증 관련 페이지의 레이아웃 컴포넌트
 *
 * @param children 자식 요소
 */
const AuthLayout = ({ children }: AuthProps) => {
  const pathname = usePathname();
  const { resetError } = useAuthStore();

  // 페이지가 변경될 때 에러 상태 초기화
  useEffect(() => {
    resetError();
  }, [pathname, resetError]);

  return (
    // 인증 페이지 레이아웃
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">{children}</Card>
    </div>
  );
};

export default AuthLayout;
