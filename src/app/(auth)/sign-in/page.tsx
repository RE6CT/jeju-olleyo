'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { LoginFormValues } from '@/types/auth.type';
import { STORAGE_KEY } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/use-auth';
import { getBrowserClient } from '@/lib/supabase/client';
import { getLoginErrorMessage } from '@/lib/utils/auth-error.util';
import { CardContent } from '@/components/ui/card';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { handleLogin, isLoading, error } = useAuth();
  const [savedEmail, setSavedEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 이미 로그인되어 있는지 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const supabase = await getBrowserClient();
        const { data, error } = await supabase.auth.getSession();

        if (data?.session && !error) {
          setIsLoggedIn(true);
          window.location.href = redirectTo;
        }
      } catch (err) {
        console.error('세션 확인 오류:', err);
      }
    };

    checkAuthStatus();
  }, [redirectTo]);

  // 컴포넌트 마운트 시 로컬 스토리지에서 저장된 이메일 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
      if (rememberedEmail) {
        setSavedEmail(rememberedEmail);
      }
    }
  }, []);

  // 로그인 폼 제출 핸들러
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

    if (success) {
      // 성공 시 홈으로 리다이렉트
      window.location.href = redirectTo;
    }
  };

  // 로딩 중이거나 이미 로그인된 경우 로딩 표시
  if (isLoggedIn) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            <p>이미 로그인되어 있습니다. 리다이렉트 중...</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // 에러 메시지 처리
  const errorMessages = error ? getLoginErrorMessage(error) : [];

  return (
    <AuthLayout>
      <AuthHeader
        title="로그인"
        description="계정 정보를 입력하여 로그인하세요"
      />

      {errorMessages.length > 0 && (
        <CardContent className="pb-0">
          <AuthErrorMessage messages={errorMessages} className="mb-4" />
        </CardContent>
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
