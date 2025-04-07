'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { RegisterFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';
import { getSignupErrorMessage } from '@/lib/utils/auth-error.util';
import { CardContent } from '@/components/ui/card';

/**
 * 회원가입 페이지 컴포넌트
 * - 회원가입 폼 제공
 * - 오류 메시지 처리
 * - 회원가입 성공 시 리다이렉트
 */
const SignUpPage = () => {
  const router = useRouter();
  const { handleRegister, isLoading, error, isAuthenticated } = useAuth();

  /**
   * 이미 로그인되어 있는 경우 홈으로 리다이렉트
   */
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  /**
   * 회원가입 폼 제출 핸들러
   * @param data - 회원가입 폼 데이터
   */
  const handleSubmit = async (data: RegisterFormValues) => {
    const success = await handleRegister(data);

    if (success) {
      // AuthProvider에서 자동으로 홈으로 리다이렉트되지만,
      // UI 응답성을 위해 명시적으로 처리
      router.push('/');
    }
  };

  // 에러 메시지 처리 - 사용자 친화적인 메시지로 변환
  const errorMessages = error ? getSignupErrorMessage(error) : [];

  return (
    <AuthLayout>
      <AuthHeader
        title="제주 올레요 회원가입"
        description="회원가입을 위한 정보를 입력해주세요."
      />

      <CardContent className="pb-0">
        {/* 에러 메시지 표시 - 폼 바로 위에 위치 */}
        {errorMessages.length > 0 && (
          <AuthErrorMessage messages={errorMessages} className="mb-6" />
        )}
      </CardContent>

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
