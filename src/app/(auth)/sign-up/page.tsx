'use client';

import { useState } from 'react';
import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 여기에 회원가입 로직 구현
      console.log('회원가입 시도');
    } catch (error) {
      console.error('회원가입 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="회원가입"
        description="아래 정보를 입력하여 계정을 생성하세요"
      />
      <AuthForm type="signup" onSubmit={handleSubmit} isLoading={isLoading} />
      <AuthFooter
        question="이미 계정이 있으신가요?"
        linkText="로그인"
        linkHref="/sign-in"
      />
    </AuthLayout>
  );
};

export default SignUpPage;
