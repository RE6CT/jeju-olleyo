'use client';

import { useRouter } from 'next/navigation';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { RegisterFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/useAuth';
import { getSignupErrorMessage } from '@/lib/utils/auth-error-utils';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const router = useRouter();
  const { handleRegister, isLoading, error } = useAuth();

  /**
   * 회원가입 폼 제출 핸들러
   * @param data - 회원가입 폼 데이터
   */
  const handleSubmit = async (data: RegisterFormValues) => {
    const success = await handleRegister(data);

    if (success) {
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

      {/* 에러 메시지 표시 */}
      {errorMessages.length > 0 && (
        <AuthErrorMessage messages={errorMessages} />
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
