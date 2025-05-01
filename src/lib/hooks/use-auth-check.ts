'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { UseAuthCheckProps } from '@/types/auth.type';

/**
 * 인증 상태를 체크하고 적절한 리다이렉션을 처리하는 커스텀 훅
 * TanStack Query 기반으로 리팩토링됨
 */
const useAuthCheck = ({
  redirectTo = '/',
  redirectIfFound = false,
  skipCheck = false,
}: UseAuthCheckProps = {}) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(skipCheck);

  // 현재 사용자 정보 가져오기
  const {
    data: user,
    isLoading,
    isError,
  } = useCurrentUser({
    enabled: !skipCheck,
    // 오류 발생 시 자동으로 처리
    onError: () => {
      console.error('인증 상태 확인 중 오류 발생');
      return null;
    },
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    // skipCheck가 true면 체크하지 않음
    if (skipCheck) {
      setIsChecked(true);
      return;
    }

    // 로딩 중이면 아직 체크하지 않음
    if (isLoading) {
      return;
    }

    // login 페이지에서 redirectTo 파라미터가 있는 경우 리다이렉션 로직 건너뛰기
    if (typeof window !== 'undefined') {
      const isLoginPage = window.location.pathname.includes('/sign-in');
      const hasRedirectParam = new URLSearchParams(window.location.search).has(
        'redirectTo',
      );

      if (isLoginPage && hasRedirectParam) {
        setIsChecked(true);
        return;
      }
    }

    // 오류가 발생했거나 로딩이 완료된 경우 적절한 리다이렉션 처리
    if (isAuthenticated && redirectIfFound) {
      router.push(redirectTo);
    } else if (!isAuthenticated && !redirectIfFound) {
      router.push(redirectTo);
    }

    setIsChecked(true);
  }, [
    isAuthenticated,
    isLoading,
    isError,
    redirectIfFound,
    redirectTo,
    router,
    skipCheck,
  ]);

  return {
    isChecking: isLoading || !isChecked,
    isAuthenticated,
    user,
  };
};

export default useAuthCheck;
