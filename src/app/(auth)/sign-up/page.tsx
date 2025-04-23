'use client';

import AuthForm from '@/app/(auth)/_components/client/auth-form';
import AuthHeader from '@/app/(auth)/_components/server/auth-header';
import AuthLayout from '@/app/(auth)/_components/client/auth-layout';
import { CardContent } from '@/components/ui/card';
import useAuth from '@/lib/hooks/use-auth';
import { getSignupErrorMessage } from '@/lib/utils/auth-error.util';
import { RegisterFormValues } from '@/types/auth.type';
import AuthErrorMessage from '@/components/features/error-message/error-message';

/**
 * 회원가입 페이지 컴포넌트
 */
const SignUpPage = () => {
  const { handleRegister, isLoading, error } = useAuth();

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (data: RegisterFormValues) => {
    await handleRegister(data);
  };

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
        <section className="mt-[30px]" aria-label="회원가입 양식">
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
