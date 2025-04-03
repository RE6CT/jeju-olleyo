'use client';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import { RegisterFormValues } from '@/types/auth.type';

const SignUpPage = () => {
  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      console.log('회원가입 데이터:', data);
      // 여기에 회원가입 로직 구현
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    // 회원가입 페이지 레이아웃
    <AuthLayout>
      {/* 회원가입 페이지 헤더 */}
      <AuthHeader
        title="회원가입"
        description="아래 정보를 입력하여 계정을 생성하세요"
      />
      {/* 회원가입 폼 */}
      <AuthForm type="register" onSubmit={handleSubmit} />
      {/* 소셜 로그인 옵션 */}
      <AuthFooter
        question="이미 계정이 있으신가요?"
        linkText="로그인"
        linkHref="/sign-in"
      />
    </AuthLayout>
  );
};

export default SignUpPage;
