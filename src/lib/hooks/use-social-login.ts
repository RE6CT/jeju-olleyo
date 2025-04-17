import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchSocialLoginUrl } from '@/lib/apis/auth/auth-server.api';
import { SOCIAL_AUTH } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';
import useAuthStore from '@/zustand/auth.store';

/**
 * 소셜 로그인 처리를 위한 커스텀 훅
 */
const useSocialLogin = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const { setError } = useAuthStore();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || PATH.HOME;

  /**
   * 구글 로그인 처리 함수
   */
  const handleGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      const { url, error } = await fetchSocialLoginUrl(
        SOCIAL_AUTH.PROVIDERS.GOOGLE,
        redirectTo,
      );

      if (error) {
        setError(error.message);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      setError(error.message || '구글 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  /**
   * 카카오 로그인 처리 함수
   */
  const handleKakao = async () => {
    try {
      setIsKakaoLoading(true);
      const { url, error } = await fetchSocialLoginUrl(
        SOCIAL_AUTH.PROVIDERS.KAKAO,
        redirectTo,
      );

      if (error) {
        setError(error.message);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      setError(error.message || '카카오 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsKakaoLoading(false);
    }
  };

  return {
    handleGoogle,
    handleKakao,
    isGoogleLoading,
    isKakaoLoading,
    redirectPath: redirectTo,
  };
};

export default useSocialLogin;
