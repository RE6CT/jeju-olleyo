import { useState } from 'react';
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
   */
  const handleLogin = async (values: LoginFormValues) => {
    setIsProcessing(true);
    resetError();

    try {
      const response = await login(values);

      if (response.error) {
        setError(response.error.message);
        return false;
      }
      return true;
    } catch (error: any) {
      setError('로그인 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 회원가입 처리 함수
   * @param values - 회원가입 폼 값
   */
  const handleRegister = async (values: RegisterFormValues) => {
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
  };

  /**
   * 구글 로그인 처리 함수
   */
  const handleGoogleLogin = async () => {
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
  };

  /**
   * 카카오 로그인 처리 함수
   */
  const handleKakaoLogin = async () => {
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
  };

  /**
   * 로그아웃 처리 함수
   */
  const handleLogout = async () => {
    setIsProcessing(true);
    resetError();

    try {
      const { error } = await logout();

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch (error: any) {
      setError(error.message || '로그아웃 중 오류가 발생했습니다.');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 비밀번호 재설정 이메일 발송 함수
   * @param email - 사용자 이메일
   */
  const handleResetPassword = async (email: string) => {
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
  };

  /**
   * 비밀번호 업데이트 함수
   * @param password - 새 비밀번호
   */
  const handleUpdatePassword = async (password: string) => {
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
  };

  /**
   * 현재 세션 확인 함수
   */
  const checkSession = async () => {
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
  };

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
