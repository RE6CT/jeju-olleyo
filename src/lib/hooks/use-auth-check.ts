import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/lib/queries/auth-queries';

interface UseAuthCheckProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
  skipCheck?: boolean;
}

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
  const { data: user, isLoading, isError } = useCurrentUser();

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

    // 인증된 상태에서 redirectIfFound가 true인 경우 리다이렉트
    if (isAuthenticated && redirectIfFound) {
      router.push(redirectTo);
    }
    // 인증되지 않은 상태에서 redirectIfFound가 false인 경우 리다이렉트
    else if (!isAuthenticated && !redirectIfFound) {
      router.push(redirectTo);
    }

    setIsChecked(true);
  }, [
    isAuthenticated,
    isLoading,
    redirectIfFound,
    redirectTo,
    router,
    skipCheck,
  ]);

  return {
    isLoading: isLoading || !isChecked,
    isAuthenticated,
    user,
  };
};

export default useAuthCheck;
