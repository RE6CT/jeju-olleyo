import { useState, useCallback } from 'react';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
} from '@/lib/apis/auth-server.api';
import {
  googleLogin,
  kakaoLogin,
  formatUser,
  resetPassword,
  updateUserPassword,
} from '@/lib/apis/auth-browser.api';
import useAuthStore from '@/zustand/auth.store';
import { getBrowserClient } from '@/lib/supabase/client';
import { getLoginErrorMessage } from '../utils/auth-error.util';

/**
 * 인증 관련 기능을 처리하는 커스텀 훅
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
   */
  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const response = await fetchLogin(values);

        if (response.error) {
          const errorMessage = getLoginErrorMessage(response.error.message);
          setError(
            Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
          );
          return false;
        }

        // 로그인 성공 시 사용자 정보 설정
        if (response.user) {
          setUser({
            ...response.user,
            email: response.user.email ?? null,
          });
        }

        // 로그인 성공 후 리다이렉트
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get('redirectTo') || '/';
          window.location.href = redirectTo;
        }

        return true;
      } catch (error: any) {
        const errorMessage = getLoginErrorMessage(
          error.message || '로그인 중 오류가 발생했습니다.',
        );
        setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError, setUser],
  );

  /**
   * 회원가입 처리 함수
   */
  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const response = await fetchRegister(values);

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
   */
  const handleLogout = useCallback(async () => {
    setIsProcessing(true);
    resetError();

    try {
      // 먼저 상태를 정리
      clearUser();

      // 그 다음 서버에 로그아웃 요청
      const { error } = await fetchLogout();

      if (error) {
        setError(error.message);
        return false;
      }

      // 로그아웃 후 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
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
   */
  const handleUpdatePassword = useCallback(
    async (password: string) => {
      setIsProcessing(true);
      resetError();

      try {
        const { error } = await updateUserPassword(password);

        if (error) {
          return {
            success: false,
            errorMessage: error.message,
          };
        }

        return {
          success: true,
        };
      } catch (error: any) {
        return {
          success: false,
          errorMessage:
            error.message || '비밀번호 업데이트 중 오류가 발생했습니다.',
        };
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError],
  );

  /**
   * 현재 세션 확인 함수
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
