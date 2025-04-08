'use client';

import { useRouter } from 'next/navigation';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthForm from '@/components/features/auth/auth-form';
import AuthFooter from '@/components/features/auth/auth-footer';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import { CardContent } from '@/components/ui/card';

import { RegisterFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import { getSignupErrorMessage } from '@/lib/utils/auth-error.util';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const router = useRouter();
  const { handleRegister, isLoading, error } = useAuth();

  // 이미 로그인되어 있는 경우 홈으로 리다이렉트
  const { isLoading: isCheckingAuth } = useAuthCheck({
    redirectIfFound: true,
    redirectTo: '/',
  });

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: RegisterFormValues) => {
    const success = await handleRegister(data);

    if (success) {
      router.push('/');
    }
  };

  // 인증 체크 중이면 로딩 화면 표시
  if (isCheckingAuth) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            <p>인증 상태 확인 중...</p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // 에러 메시지 처리
  const errorMessages = error ? getSignupErrorMessage(error) : [];

  return (
    <AuthLayout>
      <AuthHeader
        title="제주 올레요 회원가입"
        description="회원가입을 위한 정보를 입력해주세요."
      />

      {errorMessages.length > 0 && (
        <CardContent className="pb-0">
          <AuthErrorMessage messages={errorMessages} className="mb-4" />
        </CardContent>
      )}

      <AuthForm type="register" onSubmit={handleSubmit} isLoading={isLoading} />

      <AuthFooter
        question="이미 계정이 있으신가요?"
        linkText="로그인"
        linkHref="/sign-in"
      />
    </AuthLayout>
  );
};

export default SignUpPage;
