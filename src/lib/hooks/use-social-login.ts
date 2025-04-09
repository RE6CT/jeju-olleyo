import { useState } from 'react';
import useAuth from '@/lib/hooks/use-auth';
import { useSearchParams } from 'next/navigation';

/**
 * 소셜 로그인 처리를 위한 커스텀 훅
 */
const useSocialLogin = () => {
  const { handleGoogleLogin, handleKakaoLogin } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  /**
   * 구글 로그인 처리 함수
   */
  const handleGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await handleGoogleLogin();
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
      await handleKakaoLogin();
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
