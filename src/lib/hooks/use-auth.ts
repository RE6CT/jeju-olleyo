import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { PATH } from '@/constants/path.constants';
import {
  saveEmailToStorage,
  clearClientAuthData,
} from '@/lib/apis/auth/auth-browser.api';
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
} from '@/lib/apis/auth/auth-server.api';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import useAuthStore from '@/zustand/auth.store';

/**
 * 인증 관련 기능을 처리하는 커스텀 훅
 */
const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { resetError, setError, user, error, isAuthenticated, clearUser } =
    useAuthStore();

  /**
   * 이메일 로그인 처리 함수
   */
  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setIsLoading(true);
      resetError();

      try {
        // 서버 액션 호출
        const { error } = await fetchLogin(values);

        if (error) {
          setError(error.message);
          return false;
        }

        // 이메일 저장 처리
        saveEmailToStorage(values.email, values.remember);

        // 명시적 리다이렉션 추가
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const redirectTo = params.get('redirectTo') || PATH.HOME;
          window.location.href = redirectTo;
        }

        return true;
      } catch (error: any) {
        setError(error.message || '로그인 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [resetError, setError],
  );

  /**
   * 회원가입 처리 함수
   */
  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      setIsLoading(true);
      resetError();

      try {
        // 서버 액션 호출
        const { error } = await fetchRegister(values);

        if (error) {
          setError(error.message);
          return false;
        }

        // 자동 로그인 정책에 따라 홈페이지로 리다이렉션
        if (typeof window !== 'undefined') {
          if (user) {
            window.location.href = PATH.HOME;
          }
        }

        return true;
      } catch (error: any) {
        setError(error.message || '회원가입 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [resetError, setError, user],
  );

  /**
   * 로그아웃 처리 함수
   */
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    resetError();

    try {
      // 클라이언트 상태 초기화
      clearUser();

      // 서버 액션 호출
      const { success, error } = await fetchLogout();

      if (!success && error) {
        setError(error.message);
        return false;
      }

      // 클라이언트 측 데이터 정리
      clearClientAuthData();

      // 로그인 페이지로 리다이렉트
      router.push(PATH.SIGNIN);

      return true;
    } catch (error: any) {
      setError(error.message || '로그아웃 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [resetError, setError, clearUser, router]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuth;
