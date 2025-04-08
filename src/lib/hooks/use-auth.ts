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
  logoutUser,
} from '@/lib/apis/auth-browser.api';
import useAuthStore from '@/zustand/auth.store';
import { getBrowserClient } from '@/lib/supabase/client';
import { getLoginErrorMessage } from '../utils/auth-error.util';
import { fullPageRefresh } from '../utils/auth-refresh.util';

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
   * provider 정보를 쿠키에 저장하는 함수
   * @param provider 인증 제공자 이름
   */
  const setProviderCookie = async (provider: string) => {
    try {
      // 쿠키 설정을 위한 API 호출
      await fetch(`/api/set-provider?provider=${provider}`, {
        method: 'GET',
        credentials: 'include',
      });
    } catch (error) {
      console.error('쿠키 설정 오류:', error);
    }
  };

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

          // 이메일 로그인 시 provider 쿠키 설정
          await setProviderCookie('email');
        }

        // 로그인 성공 후 리다이렉트
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const redirectTo = urlParams.get('redirectTo') || '/';
          fullPageRefresh(redirectTo);
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

        // 회원가입 성공 시 provider 쿠키 설정
        if (response.user) {
          await setProviderCookie('email');
          fullPageRefresh('/');
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
   * @returns 로그아웃 성공 여부
   */
  const handleLogout = useCallback(async () => {
    setIsProcessing(true);
    resetError();

    try {
      // 먼저 상태를 정리
      clearUser();

      // 브라우저 클라이언트 측 로그아웃 (쿠키 삭제 포함)
      const { success, error } = await logoutUser();

      if (!success && error) {
        setError(error.message);
        return false;
      }

      // 서버 측 로그아웃 요청도 함께 보냄
      const serverResponse = await fetchLogout();

      if (serverResponse.error) {
        // 브라우저에서 이미 로그아웃했으므로 오류를 기록만 하고 계속 진행
        console.error('서버 로그아웃 오류:', serverResponse.error.message);
      }

      // 로그아웃 후 로그인 페이지로 강제 리다이렉트
      if (typeof window !== 'undefined') {
        fullPageRefresh('/sign-in?t=' + new Date().getTime());
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
