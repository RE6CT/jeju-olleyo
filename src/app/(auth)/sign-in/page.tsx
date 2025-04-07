'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { LoginFormValues } from '@/types/auth.type';
import { STORAGE_KEY } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/useAuth';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { handleLogin, isLoading, error } = useAuth();
  const [savedEmail, setSavedEmail] = useState<string>('');

  /**
   * 컴포넌트 마운트 시 로컬 스토리지에서 저장된 이메일 불러오기
   */
  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 함
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
      if (rememberedEmail) {
        setSavedEmail(rememberedEmail);
      }
    }
  }, []);

  /**
   * 로그인 폼 제출 핸들러
   * @param data - 로그인 폼 데이터
   */
  const handleSubmit = async (data: LoginFormValues) => {
    // 아이디 저장 처리
    if (data.remember) {
      localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
      localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, data.email);
    } else {
      localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
      localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
    }

    // useAuth의 handleLogin 사용
    const success = await handleLogin(data);

    // 로그인 성공 시 리다이렉트
    if (success) {
      router.push(redirectTo);
    }
  };

  // 에러 메시지 배열로 변환
  const errorMessages = error ? [error] : [];

  return (
    <AuthLayout>
      <AuthHeader
        title="로그인"
        description="계정 정보를 입력하여 로그인하세요"
      />

      {/* 에러 메시지 표시 */}
      {errorMessages.length > 0 && (
        <AuthErrorMessage messages={errorMessages} />
      )}

      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        savedEmail={savedEmail}
      />

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
