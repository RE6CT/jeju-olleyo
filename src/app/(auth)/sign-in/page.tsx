'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthForm from '@/components/features/auth/auth-form';
import SocialLogin from '@/components/features/auth/auth-social-login';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import { CardContent } from '@/components/ui/card';

import { LoginFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import useRememberEmail from '@/lib/hooks/use-remember-email';
import useRedirectParams from '@/lib/hooks/use-redirect-params';
import { getLoginErrorMessage } from '@/lib/utils/auth-error.util';
import Loading from '@/app/loading';
import Image from 'next/image';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  const redirectTo = useRedirectParams();
  const { handleLogin, isLoading, error } = useAuth();
  const { savedEmail } = useRememberEmail();
  const [shouldCheckAuth, setShouldCheckAuth] = useState(true);
  const searchParams = useSearchParams();

  // 로그아웃 후 접근 여부 확인 (t 파라미터 확인)
  useEffect(() => {
    const hasLogoutParam = searchParams.has('t');
    if (hasLogoutParam) {
      // 로그아웃 직후 접근한 경우 인증 체크 건너뛰기
      setShouldCheckAuth(false);
    }
  }, [searchParams]);

  // 인증 상태 체크 (로그아웃 직후가 아닌 경우만)
  const { isLoading: isCheckingAuth, isAuthenticated } = useAuthCheck({
    redirectIfFound: true,
    redirectTo,
    skipCheck: !shouldCheckAuth,
  });

  // 로그인 폼 제출 핸들러
  const handleSubmit = async (data: LoginFormValues) => {
    await handleLogin(data);
  };

  // 로딩 중이거나 이미 로그인된 경우 로딩 표시
  if (isCheckingAuth && isAuthenticated) {
    return <Loading />;
  }

  // 에러 메시지 처리
  const errorMessages = error ? getLoginErrorMessage(error) : [];

  return (
    <AuthLayout>
      <div className="flex h-[146px] w-full items-center justify-center">
        <Image
          src={'/logo/color_logo.svg'}
          alt="logo"
          width={146}
          height={76}
        />
      </div>

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
    </AuthLayout>
  );
};

export default LoginPage;
