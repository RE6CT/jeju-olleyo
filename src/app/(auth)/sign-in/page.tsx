'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { LoginFormValues } from '@/types/auth.type';
import { login } from '@/lib/apis/auth-server.api';
import { getLoginErrorMessage } from '@/lib/utils/auth-error-utils';
import { STORAGE_KEY } from '@/constants/auth.constants';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [savedEmail, setSavedEmail] = useState<string>('');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  /**
   * 컴포넌트 마운트 시 로컬 스토리지에서 저장된 이메일 불러오기
   * 그리고 URL 파라미터에서 성공 메시지를 확인
   */
  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 함
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
      if (rememberedEmail) {
        setSavedEmail(rememberedEmail);
      }
    }
  }, []);

  /**
   * 로그인 폼 제출 핸들러
   * @param data 로그인 폼 데이터
   */
  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      // 이전 에러 초기화
      setErrorMessages([]);

      // 아이디 저장 처리
      if (data.remember) {
        localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
        localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, data.email);
      } else {
        localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
        localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
      }

      const result = await login(data);

      if (result.user) {
        // 로그인 성공 시 홈 페이지로 리다이렉트
        router.push('/');
      } else if (result.error) {
        // 에러 메시지 설정 - 사용자 친화적인 메시지로 변환
        setErrorMessages(getLoginErrorMessage(result.error.message));
        console.error('로그인 실패:', result.error);
      }
    } catch (error: any) {
      console.error('로그인 오류:', error);

      // 예상치 못한 에러 처리
      setErrorMessages(['로그인 중 오류가 발생했습니다., 다시 시도해주세요.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="로그인"
        description="계정 정보를 입력하여 로그인하세요"
      />

      {/* 에러 메시지 표시 */}
      {errorMessages.length > 0 && (
        <AuthErrorMessage messages={errorMessages} />
      )}

      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        savedEmail={savedEmail}
      />

      <SocialLogin />

      <AuthFooter
        question="계정이 없으신가요?"
        linkText="회원가입"
        linkHref="/sign-up"
      />
    </AuthLayout>
  );
};

export default LoginPage;
