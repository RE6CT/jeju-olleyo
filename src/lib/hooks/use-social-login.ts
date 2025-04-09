import { useState } from 'react';
import useAuth from '@/lib/hooks/use-auth';
import useRedirectParams from '@/lib/hooks/use-redirect-params';

/**
 * 소셜 로그인 처리를 위한 커스텀 훅
 *
 * @returns {Object} 소셜 로그인 관련 상태와 함수들
 */
const useSocialLogin = () => {
  const { handleGoogleLogin, handleKakaoLogin } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const redirectPath = useRedirectParams();

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
    redirectPath,
  };
};

export default useSocialLogin;
