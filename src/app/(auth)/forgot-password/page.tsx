'use client';

import Link from 'next/link';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import useForgotPassword from '@/lib/hooks/use-forgot-password';
import { PATH } from '@/constants/path.constants';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';

/**
 * 비밀번호 찾기 페이지 컴포넌트
 */
const ForgotPasswordPage = () => {
  const {
    isLoading,
    isSubmitted,
    submittedEmail,
    error,
    register,
    errors,
    handleSubmit,
    handleResetPassword,
  } = useForgotPassword();

  return (
    <AuthLayout>
      <AuthHeader
        title="비밀번호 찾기"
        description={
          isSubmitted
            ? '비밀번호 재설정 링크를 이메일로 발송했어요.'
            : '등록된 이메일을 입력하여 비밀번호를 재설정하세요'
        }
      />

      <CardContent className="mt-7">
        {error && <AuthErrorMessage messages={[error]} className="mb-4" />}

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-12 border border-gray-200 p-3">
              <p className="medium-16 text-start text-gray-400">
                {submittedEmail || 'abc123@email.com'}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                className="w-full bg-gray-200 text-gray-800"
                disabled={true}
              >
                메일 발송 완료!
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              <div className="h-5">
                {errors.email && (
                  <p className="text-14 text-red">{errors.email.message}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="mt-[5px] flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-primary-500 p-2.5 pt-3 hover:bg-primary-600"
              disabled={isLoading}
            >
              {isLoading
                ? AUTH_BUTTON_TEXT.LOADING
                : AUTH_BUTTON_TEXT.FORGOT_PASSWORD.DEFAULT}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="text-14 text-gray-600">
          <Link
            href={PATH.SIGNIN}
            className="medium-12 p-2.5 text-secondary-300"
          >
            로그인으로 돌아가기
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
