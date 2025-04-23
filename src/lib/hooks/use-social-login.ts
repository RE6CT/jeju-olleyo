import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { SOCIAL_AUTH } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';
import { useSocialLoginUrl } from '@/lib/queries/auth-queries';

/**
 * 소셜 로그인 처리를 위한 커스텀 훅
 * TanStack Query 기반으로 리팩토링됨
 */
const useSocialLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || PATH.HOME;

  // TanStack Query 기반 훅 사용
  const socialLoginMutation = useSocialLoginUrl();

  /**
   * 구글 로그인 처리 함수
   */
  const handleGoogle = async () => {
    setError(null);

    try {
      await socialLoginMutation.mutateAsync({
        provider: SOCIAL_AUTH.PROVIDERS.GOOGLE,
        redirectTo,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '구글 로그인 중 오류가 발생했습니다.',
      );
    }
  };

  /**
   * 카카오 로그인 처리 함수
   */
  const handleKakao = async () => {
    setError(null);

    try {
      await socialLoginMutation.mutateAsync({
        provider: SOCIAL_AUTH.PROVIDERS.KAKAO,
        redirectTo,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : '카카오 로그인 중 오류가 발생했습니다.',
      );
    }
  };

  return {
    handleGoogle,
    handleKakao,
    isGoogleLoading: socialLoginMutation.isPending,
    isKakaoLoading: socialLoginMutation.isPending,
    error,
    redirectPath: redirectTo,
    resetError: () => setError(null),
  };
};

export default useSocialLogin;
