'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AuthProps } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';

/**
 * 인증 관련 페이지의 레이아웃 컴포넌트
 * @param children 자식 요소
 */
const AuthLayout = ({ children }: AuthProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { resetError } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 반응형 감지 - 클라이언트 사이드에서만 실행
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // 초기 로드시 체크
      checkIfMobile();

      // 리사이즈 이벤트 리스너 추가
      window.addEventListener('resize', checkIfMobile);

      // 클린업
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, [isClient]);

  // 페이지가 변경될 때 에러 상태 초기화
  useEffect(() => {
    resetError();
  }, [pathname, resetError]);

  // 뒤로가기 핸들러
  const handleGoBack = () => {
    router.back();
  };

  // 초기 서버 렌더링 시 모바일 여부와 관계없이 동일한 레이아웃을 반환
  if (!isClient) {
    return (
      <div className="flex h-full w-full flex-col bg-white">
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md rounded-3xl border border-solid border-[color:var(--gray-100,#E7EDF0)] p-9">
            {children}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* 모바일에서만 표시되는 뒤로가기 버튼 */}
      {isMobile && (
        <div className="px-4 py-4">
          <button onClick={handleGoBack} aria-label="뒤로 가기">
            <Image
              src="/icons/arrow_full_left.svg"
              width={20}
              height={20}
              alt="뒤로 가기"
            />
          </button>
        </div>
      )}

      {/* 인증 페이지 레이아웃 */}
      <div className="flex flex-1 items-center justify-center">
        {isMobile ? (
          <div className="mx-4 h-full w-full max-w-md rounded-3xl px-4 py-4">
            {children}
          </div>
        ) : (
          <Card className="w-full max-w-md rounded-3xl border border-solid border-[color:var(--gray-100,#E7EDF0)] p-9">
            {children}
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
