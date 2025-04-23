'use client';

import AuthHeader from '@/app/(auth)/_components/server/auth-header';
import AuthLayout from '@/app/(auth)/_components/client/auth-layout';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';
import useForgotPassword from '@/lib/hooks/use-forgot-password';
import AuthFooter from '../_components/server/auth-footer';
import AuthErrorMessage from '@/components/features/error-message/error-message';
import ErrorMessage from '@/components/features/error-message/input-error-message';

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
          <article className="space-y-4">
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
          </article>
        ) : (
          <section aria-label="비밀번호 재설정 요청 양식">
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register('email')}
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                <div className="h-5">
                  <ErrorMessage message={errors.email?.message} />
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
          </section>
        )}
      </CardContent>
      <footer>
        <AuthFooter linkHref={PATH.SIGNIN} linkText="로그인으로 돌아가기" />
      </footer>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
