'use client';

import ResetPasswordSuccessModal from '@/components/commons/reset-password-success-modal';
import AuthHeader from '@/app/(auth)/_components/server/auth-header';
import AuthLayout from '@/app/(auth)/_components/client/auth-layout';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';
import useResetPassword from '@/lib/hooks/use-reset-password';
import AuthErrorMessage from '@/components/features/error-message/error-message';
import PasswordInput from '@/components/features/input/password-input';
import ErrorMessage from '@/components/features/error-message/input-error-message';

/**
 * 비밀번호 재설정 페이지 컴포넌트
 */
const ResetPasswordPage = () => {
  const {
    isSubmitted,
    countdown,
    isLoading,
    error,
    register,
    errors,
    handleSubmit,
    handlePasswordUpdate,
    redirectToHome,
  } = useResetPassword();

  return (
    <AuthLayout>
      <AuthHeader
        title="비밀번호 재설정"
        description="새로운 비밀번호를 입력해주세요"
      />

      <CardContent className="mt-7">
        {error && <AuthErrorMessage messages={[error]} className="mb-4" />}

        <section aria-label="비밀번호 재설정 양식">
          <form onSubmit={handleSubmit(handlePasswordUpdate)} noValidate>
            <div>
              <Label htmlFor="password">새 비밀번호</Label>
              <PasswordInput
                id="password"
                placeholder="8~12자 영문,숫자,특수문자"
                register={register('password')}
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              <div className="h-6">
                <ErrorMessage message={errors.password?.message} />
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="8~12자 영문,숫자,특수문자"
                register={register('confirmPassword')}
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              />
              <div className="h-6">
                <ErrorMessage message={errors.confirmPassword?.message} />
              </div>
            </div>

            <Button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-primary-500 p-2.5 pt-3 hover:bg-primary-600"
              disabled={isLoading}
            >
              {isLoading
                ? AUTH_BUTTON_TEXT.LOADING
                : AUTH_BUTTON_TEXT.RESET_PASSWORD.DEFAULT}
            </Button>
          </form>
        </section>
      </CardContent>

      {/* 성공 모달 컴포넌트 */}
      <ResetPasswordSuccessModal
        open={isSubmitted}
        countdown={countdown}
        redirectToHome={redirectToHome}
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
