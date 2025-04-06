'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { RegisterFormValues } from '@/types/auth.type';
import { register } from '@/lib/apis/auth-server.api';
import { getSignupErrorMessage } from '@/lib/utils/auth-error-utils';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  /**
   * 회원가입 폼 제출 핸들러
   * @param data 회원가입 폼 데이터
   */
  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      // 이전 에러 메시지 초기화
      setErrorMessages([]);

      // 서버 액션을 직접 호출
      const result = await register(data);

      // 성공 처리 (예: 로그인 페이지로 리다이렉트 등)
      if (result.user) {
        // 회원가입 성공 시 홈으로 리다이렉트
        router.push('/');
      } else if (result.error) {
        // 에러 메시지 설정 - 사용자 친화적인 메시지로 변환
        setErrorMessages(getSignupErrorMessage(result.error.message));
        console.error('회원가입 실패:', result.error);
      }
    } catch (error: any) {
      console.error('회원가입 오류:', error);

      // 예상치 못한 에러 처리
      setErrorMessages(['회원가입 중 오류가 발생했습니다.', '다시 시도해주세요.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="제주 올레요 회원가입"
        description="회원가입을 위한 정보를 입력해주세요."
      />

      {/* 에러 메시지 표시 */}
      {errorMessages.length > 0 && <AuthErrorMessage messages={errorMessages} />}

      <AuthForm type="register" onSubmit={handleSubmit} isLoading={isLoading} />

      <AuthFooter
        question="이미 계정이 있으신가요?"
        linkText="로그인"
        linkHref="/sign-in"
      />
    </AuthLayout>
  );
};

export default SignUpPage;