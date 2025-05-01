'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Loading from '@/app/loading';
import AuthForm from '@/app/(auth)/_components/client/auth-form';
import AuthLayout from '@/app/(auth)/_components/client/auth-layout';
import SocialLogin from '@/app/(auth)/sign-in/_components/client/auth-social-login';
import { CardContent } from '@/components/ui/card';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import useRememberEmail from '@/lib/hooks/use-remember-email';
import { getLoginErrorMessage } from '@/lib/utils/auth-error.util';
import { LoginFormValues } from '@/types/auth.type';
import AuthErrorMessage from '@/components/features/error-message/error-message';

// 동적 렌더링 설정 (필요한 경우)
export const dynamic = 'force-dynamic';

/**
 * 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
  // 로그인 후 리다이렉트할 경로를 window.location.search에서 직접 추출
  const getRedirectTo = () => {
    // 서버 사이드 렌더링 시에는 window가 없으므로 예외 처리
    if (typeof window === 'undefined') return '/';

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('redirectTo') || '/';
  };

  const { handleLogin, isLoading, error } = useAuth();
  const { savedEmail } = useRememberEmail();
  const [shouldCheckAuth, setShouldCheckAuth] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);

    // URL 파라미터에서 t 파라미터 확인
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const hasLogoutParam = urlParams.has('t');
      if (hasLogoutParam) {
        // 로그아웃 직후 접근한 경우 인증 체크 건너뛰기
        setShouldCheckAuth(false);
      }
    }
  }, []);

  // 인증 상태 체크 (로그아웃 직후가 아닌 경우만)
  const redirectTo = getRedirectTo();
  const { isChecking: isCheckingAuth, isAuthenticated } = useAuthCheck({
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

  // 초기 서버 렌더링 상태
  if (!isClient) {
    return (
      <AuthLayout>
        <div className="flex h-[146px] items-center justify-center">
          {/* 초기 로딩 중 이미지 렌더링 스켈레톤 */}
          <div className="h-[76px] w-[146px] bg-gray-100" />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <header className="flex h-[146px] items-center justify-center">
        <Link href={'/'}>
          <Image
            src={'/logo/color_logo.png'}
            alt="logo"
            width={146}
            height={76}
            priority
          />
        </Link>
      </header>

      {errorMessages.length > 0 && (
        <CardContent className="pb-0">
          <AuthErrorMessage messages={errorMessages} className="mb-4" />
        </CardContent>
      )}

      <section aria-label="로그인 양식">
        <AuthForm
          type="login"
          onSubmit={handleSubmit}
          isLoading={isLoading}
          savedEmail={savedEmail}
        />
      </section>

      <section className="mt-[34px]" aria-label="소셜 로그인">
        <SocialLogin />
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
