import { useCallback, useState } from 'react';
import {
  useCurrentUser,
  useLogin,
  useRegister,
  useLogout,
} from '@/lib/queries/auth-queries';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';

/**
 * 인증 관련 기능을 처리하는 커스텀 훅
 */
const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  // TanStack Query 기반 훅 사용
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  // 이메일 로그인 처리 함수
  const handleLogin = useCallback(
    async (values: LoginFormValues & { redirectTo?: string }) => {
      setError(null);

      try {
        await loginMutation.mutateAsync({
          email: values.email,
          password: values.password,
          remember: values.remember,
          redirectTo: values.redirectTo,
        });
        return true;
      } catch (error) {
        // 오류 처리...
      }
    },
    [loginMutation],
  );

  // 회원가입 처리 함수
  const handleRegister = async (values: RegisterFormValues) => {
    setError(null);

    try {
      await registerMutation.mutateAsync(values);
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '회원가입 중 오류가 발생했습니다.',
      );
      return false;
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    setError(null);

    try {
      await logoutMutation.mutateAsync();
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '로그아웃 중 오류가 발생했습니다.',
      );
      return false;
    }
  };

  // 에러 상태 초기화
  const resetError = () => setError(null);

  return {
    user,
    isLoading:
      isUserLoading ||
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    error,
    isAuthenticated: !!user,
    handleLogin,
    handleRegister,
    handleLogout,
    resetError,
  };
};

export default useAuth;
