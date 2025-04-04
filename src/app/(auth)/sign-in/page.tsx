'use client';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import { LoginFormValues } from '@/types/auth.type';
import { login } from '@/lib/apis/auth-server.api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 로그인 폼 제출 핸들러
   * @param data 로그인 폼 데이터
   */
  const handleSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      const result = await login(data);

      if (result.user) {
        // 로그인 성공 시 홈 페이지로 리다이렉트
        router.push('/');
      } else if (result.error) {
        console.error('로그인 실패:', result.error);
        // 에러 처리 로직
      }
    } catch (error) {
      console.error('로그인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 로그인 페이지 레이아웃
    <AuthLayout>
      {/* 로그인 페이지 헤더 */}
      <AuthHeader
        title="로그인"
        description="계정 정보를 입력하여 로그인하세요"
      />
      {/* 로그인 폼 */}
      <AuthForm type="login" onSubmit={handleSubmit} isLoading={isLoading} />
      {/* 소셜 로그인 옵션 */}
      <SocialLogin />
      {/* 로그인 페이지 푸터 */}
      <AuthFooter
        question="계정이 없으신가요?"
        linkText="회원가입"
        linkHref="/sign-up"
      />
    </AuthLayout>
  );
};

export default LoginPage;
