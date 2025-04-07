import { useState, useCallback } from 'react';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import { login, register, logout } from '@/lib/apis/auth-server.api';
import {
  googleLogin,
  kakaoLogin,
  formatUser,
  resetPassword,
  updateUserPassword,
} from '@/lib/apis/auth-browser.api';
import useAuthStore from '@/zustand/useAuthStore';
import { getBrowserClient } from '@/lib/supabase/client';

/**
 * 인증 관련 기능을 처리하는 커스텀 훅
 * @returns 인증 관련 상태와 함수들
 */
const useAuth = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    setUser,
    clearUser,
    setError,
    resetError,
    user,
    isLoading,
    error,
    isAuthenticated,
  } = useAuthStore();

  /**
   * 이메일 로그인 처리 함수
   * @param values - 로그인 폼 값
   * @returns 로그인 성공 여부
   */
  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const response = await login(values);

        if (response.error) {
          setError(response.error.message);
          return false;
        }

        // 로그인 성공 시 사용자 정보 설정
        if (response.user) {
          setUser({
            ...response.user,
            email: response.user.email ?? null,
          });
        }

        // 로그인 성공 후 홈페이지로 강제 리다이렉트
        if (typeof window !== 'undefined') {
          // URL에서 redirectTo 파라미터 추출
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get('redirectTo') || '/';

          console.log('이메일 로그인 성공 → 리다이렉트:', redirectTo);
          window.location.href = redirectTo;
        }

        return true;
      } catch (error: any) {
        setError('로그인 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError, setUser],
  );

  /**
   * 회원가입 처리 함수
   * @param values - 회원가입 폼 값
   * @returns 회원가입 성공 여부
   */
  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const response = await register(values);

        if (response.error) {
          setError(response.error.message);
          return false;
        }

        return true;
      } catch (error: any) {
        setError('회원가입 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError],
  );

  /**
   * 구글 로그인 처리 함수
   * @returns 로그인 성공 여부
   */
  const handleGoogleLogin = useCallback(async () => {
    setIsProcessing(true);
    resetError();

    try {
      const { error } = await googleLogin();
      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error: any) {
      setError(error.message || '구글 로그인 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [resetError, setError]);

  /**
   * 카카오 로그인 처리 함수
   * @returns 로그인 성공 여부
   */
  const handleKakaoLogin = useCallback(async () => {
    setIsProcessing(true);
    resetError();

    try {
      const { error } = await kakaoLogin();
      if (error) {
        setError(error.message);
        return false;
      }
      return true;
    } catch (error: any) {
      setError(error.message || '카카오 로그인 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [resetError, setError]);

  /**
   * 로그아웃 처리 함수
   * @returns 로그아웃 성공 여부
   */
  const handleLogout = useCallback(async () => {
    setIsProcessing(true);
    resetError();

    try {
      // 먼저 상태를 정리
      clearUser();

      // 그 다음 서버에 로그아웃 요청
      const { error } = await logout();

      if (error) {
        setError(error.message);
        return false;
      }

      console.log('로그아웃 성공 → 로그인 페이지로 리다이렉트');

      // 로그아웃 후 로그인 페이지로 강제 리다이렉트
      if (typeof window !== 'undefined') {
        // 브라우저 캐시를 무시하고 새로운 페이지 요청을 보내도록 함
        window.location.href = '/sign-in?t=' + new Date().getTime();
      }

      return true;
    } catch (error: any) {
      setError(error.message || '로그아웃 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [resetError, setError, clearUser]);

  /**
   * 비밀번호 재설정 이메일 발송 함수
   * @param email - 사용자 이메일
   * @returns 성공 여부
   */
  const handleResetPassword = useCallback(
    async (email: string) => {
      setIsProcessing(true);
      resetError();

      try {
        const { error } = await resetPassword(email);

        if (error) {
          setError(error.message);
          return false;
        }

        return true;
      } catch (error: any) {
        setError('비밀번호 재설정 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError],
  );

  /**
   * 비밀번호 업데이트 함수
   * @param password - 새 비밀번호
   * @returns 성공 여부
   */
  const handleUpdatePassword = useCallback(
    async (password: string) => {
      setIsProcessing(true);
      resetError();

      try {
        const { error } = await updateUserPassword(password);

        if (error) {
          setError(error.message);
          return false;
        }

        return true;
      } catch (error: any) {
        setError('비밀번호 업데이트 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError],
  );

  /**
   * 현재 세션 확인 함수
   * @returns 유효한 세션 존재 여부
   */
  const checkSession = useCallback(async () => {
    try {
      const supabase = await getBrowserClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        clearUser();
        return false;
      }

      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        const formattedUser = formatUser(userData.user);
        setUser(formattedUser);
        return true;
      }

      return false;
    } catch (error) {
      console.error('세션 확인 중 오류:', error);
      return false;
    }
  }, [clearUser, setUser]);

  return {
    user,
    isLoading: isLoading || isProcessing,
    error,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleKakaoLogin,
    handleLogout,
    handleResetPassword,
    handleUpdatePassword,
    checkSession,
  };
};

export default useAuth;
