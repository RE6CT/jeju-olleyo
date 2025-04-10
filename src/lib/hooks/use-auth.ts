import { PATH } from '@/constants/path.constants';
import { SOCIAL_AUTH, STORAGE_KEY } from '@/constants/auth.constants';
import { useState, useCallback } from 'react';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import { getBrowserClient } from '@/lib/supabase/client';
import {
  socialLogin,
  updateUserPassword,
  logoutUser,
  setProviderCookie,
} from '@/lib/apis/auth/auth-browser.api';
import useAuthStore from '@/zustand/auth.store';

/**
 * 인증 관련 기능을 처리하는 커스텀 훅
 */
const useAuth = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { resetError, setError, user, error, isAuthenticated, clearUser } =
    useAuthStore();

  /**
   * 이메일 로그인 처리 함수
   */
  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const supabase = getBrowserClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          setError(error.message);
          return false;
        }

        // 이메일 로그인 성공 시 provider 쿠키 설정
        await setProviderCookie('email');

        // 이메일 저장 처리
        if (values.remember && typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, values.email);
          localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
        } else if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
          localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
        }

        return true;
      } catch (error: any) {
        setError(error.message || '로그인 중 오류가 발생했습니다.');
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [resetError, setError],
  );

  /**
   * 회원가입 처리 함수
   */
  const handleRegister = useCallback(
    async (values: RegisterFormValues) => {
      setIsProcessing(true);
      resetError();

      try {
        const supabase = await getBrowserClient();
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              nickname: values.nickname,
              phone: values.phone,
            },
          },
        });

        if (error) {
          setError(error.message);
          return false;
        }

        return true;
      } catch (error: any) {
        setError(error.message || '회원가입 중 오류가 발생했습니다.');
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
      const { error } = await socialLogin(SOCIAL_AUTH.PROVIDERS.GOOGLE);
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
      const { error } = await socialLogin(SOCIAL_AUTH.PROVIDERS.KAKAO);
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
      // 먼저 클라이언트 상태 초기화
      clearUser();

      // 로그아웃 실행
      const { success, error } = await logoutUser();

      if (!success && error) {
        setError(error.message);
        return false;
      }

      // 명시적인 페이지 전환 (인증 체크 건너뛰도록 t 파라미터 추가)
      if (typeof window !== 'undefined') {
        window.location.href = `${PATH.SIGNIN}?t=` + Date.now();
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

  return {
    user,
    isLoading: isProcessing,
    error,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleKakaoLogin,
    handleLogout,
    handleUpdatePassword,
  };
};

export default useAuth;
