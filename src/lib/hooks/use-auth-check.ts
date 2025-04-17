import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';

/**
 * 인증 상태를 체크하고 적절한 리다이렉션을 처리하는 커스텀 훅
 */
const useAuthCheck = ({
  redirectTo = '/',
  redirectIfFound = false,
  skipCheck = false, // 추가: 인증 체크 건너뛰기 옵션
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
  skipCheck?: boolean;
} = {}) => {
  const [isLoading, setIsLoading] = useState(!skipCheck); // skipCheck가 true면 로딩 상태 false로 시작
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { clearUser } = useAuthStore();

  useEffect(() => {
    // skipCheck가 true면 체크하지 않음
    if (skipCheck) {
      setIsLoading(false);
      return;
    }

    const checkAuthStatus = async () => {
      try {
        const supabase = await getBrowserClient();
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        const hasSession = !!data.session;
        setIsAuthenticated(hasSession);

        // 인증된 상태에서 redirectIfFound가 true인 경우 리다이렉트
        if (hasSession && redirectIfFound) {
          router.push(redirectTo);
        }
        // 인증되지 않은 상태에서 redirectIfFound가 false인 경우 리다이렉트
        else if (!hasSession && !redirectIfFound) {
          router.push(redirectTo);
        }
      } catch (err) {
        console.error('세션 확인 오류:', err);
        clearUser();

        // 에러 발생 시 인증되지 않은 것으로 간주
        if (!redirectIfFound) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [redirectTo, redirectIfFound, router, clearUser, skipCheck]);

  return { isLoading, isAuthenticated };
};

export default useAuthCheck;
