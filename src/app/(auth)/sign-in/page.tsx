'use client';

import { useState, useEffect } from 'react';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import { CardContent } from '@/components/ui/card';

import { LoginFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import useRememberEmail from '@/lib/hooks/use-remember-email';
import useRedirectParams from '@/lib/hooks/use-redirect-params';
import { getLoginErrorMessage } from '@/lib/utils/auth-error.util';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  const redirectTo = useRedirectParams();
  const { handleLogin, isLoading, error } = useAuth();
  const { savedEmail } = useRememberEmail();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 인증 상태 체크
  const { isLoading: isCheckingAuth, isAuthenticated } = useAuthCheck({
    redirectIfFound: true,
    redirectTo,
  });

  // 인증 체크가 완료되면 로그인 상태 설정
  useEffect(() => {
    if (!isCheckingAuth) {
      setIsLoggedIn(isAuthenticated);
    }
  }, [isCheckingAuth, isAuthenticated]);

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (data: LoginFormValues) => {
    // useRememberEmail 훅을 사용할 수도 있지만 이미 useAuth의 handleLogin 내부에서 관리하고 있음
    const success = await handleLogin(data);

    if (success) {
      // 성공 시 홈으로 리다이렉트
      window.location.href = redirectTo;
    }
  };

  // 로딩 중이거나 이미 로그인된 경우 로딩 표시
  if (isCheckingAuth || isLoggedIn) {
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
