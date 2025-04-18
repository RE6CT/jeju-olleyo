'use client';

import ResetPasswordSuccessModal from '@/components/commons/reset-password-success-modal';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthLayout from '@/components/features/auth/auth-layout';
import PasswordInput from '@/components/features/auth/auth-password-input';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';
import useResetPassword from '@/lib/hooks/use-reset-password';

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

        <form onSubmit={handleSubmit(handlePasswordUpdate)}>
          <div>
            <Label htmlFor="password">새 비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="8~12자 영문,숫자,특수문자"
              register={register('password')}
              autoComplete="new-password"
            />
            <div className="h-6">
              {errors.password && (
                <p className="regular-14 text-red">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="8~12자 영문,숫자,특수문자"
              register={register('confirmPassword')}
              autoComplete="new-password"
            />
            <div className="h-6">
              {errors.confirmPassword && (
                <p className="regular-14 text-red">
                  {errors.confirmPassword.message}
                </p>
              )}
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
