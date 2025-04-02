'use client';

import { useState } from 'react';
import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 여기에 로그인 로직 구현
      console.log('로그인 시도');
    } catch (error) {
      console.error('로그인 오류:', error);
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
      <AuthForm type="login" onSubmit={handleSubmit} isLoading={isLoading} />
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
