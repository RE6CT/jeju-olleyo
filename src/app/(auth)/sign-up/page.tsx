'use client';

import Loading from '@/app/loading';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import AuthForm from '@/components/features/auth/auth-form';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthLayout from '@/components/features/auth/auth-layout';
import { CardContent } from '@/components/ui/card';
import { PATH } from '@/constants/path.constants';
import useAuth from '@/lib/hooks/use-auth';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import { getSignupErrorMessage } from '@/lib/utils/auth-error.util';
import { RegisterFormValues } from '@/types/auth.type';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const { handleRegister, isLoading, error } = useAuth();

  // 이미 로그인되어 있는 경우 홈으로 리다이렉트
  const { isLoading: isCheckingAuth } = useAuthCheck({
    redirectIfFound: true,
    redirectTo: PATH.HOME,
  });

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: RegisterFormValues) => {
    await handleRegister(data);
  };

  // 인증 체크 중이면 로딩 화면 표시
  if (isCheckingAuth) {
    return <Loading />;
  }

  // 에러 메시지 처리
  const errorMessages = error ? getSignupErrorMessage(error) : [];

  return (
    <AuthLayout>
      <div className="flex h-[602px] flex-col">
        <AuthHeader
          title="제주 올레요 회원가입"
          description="회원가입을 위한 정보를 입력해주세요."
        />

        {errorMessages.length > 0 && (
          <CardContent className="pb-0">
            <AuthErrorMessage messages={errorMessages} className="mb-4" />
          </CardContent>
        )}
        <section className="mt-[30px]">
          <AuthForm
            type="register"
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </section>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
