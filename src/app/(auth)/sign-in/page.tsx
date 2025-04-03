'use client';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import { LoginFormValues } from '@/types/auth.type';

const LoginPage = () => {
  const handleSubmit = async (data: LoginFormValues) => {
    try {
      console.log('로그인 데이터:', data);
      // 여기에 회원가입 로직 구현
    } catch (error) {
      console.error('로그인 오류:', error);
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
      <AuthForm type="login" onSubmit={handleSubmit} />
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
