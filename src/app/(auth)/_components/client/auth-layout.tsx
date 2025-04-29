'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { AuthProps } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';
import { PATH } from '@/constants/path.constants';

/**
 * 인증 관련 페이지의 레이아웃 컴포넌트
 *
 * @param children 자식 요소
 */
const AuthLayout = ({ children }: AuthProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetError } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  const isSignInPage = pathname.includes(PATH.SIGNIN.substring(1));

  // 반응형 감지
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 로드시 체크
    checkIfMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', checkIfMobile);

    // 클린업
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // 페이지가 변경될 때 에러 상태 초기화
  useEffect(() => {
    resetError();
  }, [pathname, resetError]);

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`flex ${isSignInPage ? 'h-full' : ''} w-full flex-col`}>
      {/* 모바일에서만 표시되는 뒤로가기 버튼 */}
      {isMobile && (
        <div className="px-4 py-4">
          <button onClick={handleGoBack}>
            <img src="/icons/arrow_full_left.svg" width={20} height={20} />
          </button>
        </div>
      )}

      {/* 인증 페이지 레이아웃 */}
      <div className="flex flex-1 items-center justify-center">
        {isMobile ? (
          <div className="mx-4 h-full w-full max-w-md rounded-3xl bg-white px-4">
            {children}
          </div>
        ) : (
          <Card className="w-full max-w-md rounded-3xl border border-solid border-[color:var(--gray-100,#E7EDF0)] bg-white p-9">
            {children}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
