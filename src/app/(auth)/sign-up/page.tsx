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
 */
const SignUpPage = () => {
  const router = useRouter();
  const { handleRegister, isLoading, error, isAuthenticated } = useAuth();

  // 이미 로그인되어 있는 경우 홈으로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: RegisterFormValues) => {
    const success = await handleRegister(data);

    if (success) {
      router.push('/');
    }
  };

  // 에러 메시지 처리
  const errorMessages = error ? getSignupErrorMessage(error) : [];

  return (
    <AuthLayout>
      <AuthHeader
        title="제주 올레요 회원가입"
        description="회원가입을 위한 정보를 입력해주세요."
      />

      {errorMessages.length > 0 && (
        <CardContent className="pb-0">
          <AuthErrorMessage messages={errorMessages} className="mb-4" />
        </CardContent>
      )}

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
