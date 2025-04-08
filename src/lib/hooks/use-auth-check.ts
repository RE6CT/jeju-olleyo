import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';
import { formatUser } from '@/lib/apis/auth/auth-browser.api';

/**
 * 인증 상태를 체크하고 적절한 리다이렉션을 처리하는 커스텀 훅
 *
 * @param {Object} options - 옵션 객체
 * @param {string} options.redirectTo - 인증된 경우 리다이렉트할 경로 (기본값: '/')
 * @param {boolean} options.redirectIfFound - true인 경우 인증된 사용자를 리다이렉트 (기본값: false)
 * @returns {Object} 인증 상태 체크 결과
 */
const useAuthCheck = ({
  redirectTo = '/',
  redirectIfFound = false,
}: {
  redirectTo?: string;
  redirectIfFound?: boolean;
} = {}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const supabase = await getBrowserClient();
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        const hasSession = !!data.session;
        setIsAuthenticated(hasSession);

        if (hasSession) {
          // 사용자 세션이 있는 경우
          const { data: userData, error: userError } =
            await supabase.auth.getUser();

          if (userError) {
            throw userError;
          }

          if (userData.user) {
            const formattedUser = formatUser(userData.user);
            setUser(formattedUser);
          }

          // 인증된 상태에서 redirectIfFound가 true인 경우 리다이렉트
          if (redirectIfFound) {
            router.push(redirectTo);
          }
        } else {
          // 사용자 세션이 없는 경우
          clearUser();

          // 인증되지 않은 상태에서 redirectIfFound가 false인 경우 리다이렉트
          if (!redirectIfFound) {
            router.push(redirectTo);
          }
        }
      } catch (err) {
        console.error('세션 확인 오류:', err);
        clearUser();

        // 에러 발생 시 인증되지 않은 것으로 간주하고, redirectIfFound가 false인 경우 리다이렉트
        if (!redirectIfFound) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [redirectTo, redirectIfFound, router, setUser, clearUser]);

  return { isLoading, isAuthenticated };
};

export default useAuthCheck;
