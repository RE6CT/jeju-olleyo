'use client';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import { RegisterFormValues } from '@/types/auth.type';
import { register } from '@/lib/apis/auth-server.api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 회원가입 폼 제출 핸들러
   * @param data 회원가입 폼 데이터
   */
  const handleSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);

      // 서버 액션을 직접 호출
      const result = await register(data);

      // 성공 처리 (예: 로그인 페이지로 리다이렉트 등)
      if (result.user) {
        router.push('/');
      } else if (result.error) {
        console.error('회원가입 실패:', result.error);
        // 에러 처리 로직
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 회원가입 페이지 레이아웃
    <AuthLayout>
      {/* 회원가입 페이지 헤더 */}
      <AuthHeader
        title="제주 올레요 회원가입"
        description="회원가입을 위한 정보를 입력해주세요."
      />
      {/* 회원가입 폼 */}
      <AuthForm type="register" onSubmit={handleSubmit} isLoading={isLoading} />
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
