'use client';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import PasswordInput from '@/components/features/auth/auth-password-input';

import useResetPassword from '@/lib/hooks/use-reset-password';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';

const ResetPasswordPage = () => {
  const {
    isSubmitted,
    countdown,
    isLoading,
    error,
    register,
    errors,
    isValid,
    handleSubmit,
    handlePasswordUpdate,
    redirectToHome,
  } = useResetPassword();

  // 비밀번호 변경 성공 화면
  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center p-6">
          <div className="w-full">
            <div className="mb-4 text-center">
              <h2 className="bold-22">비밀번호 재설정</h2>
            </div>
            <div className="rounded-md bg-white">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
                  {/* 성공 아이콘 */}
                </div>
                <h3 className="mb-2 font-bold">
                  비밀번호가 성공적으로 재설정되었습니다.
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  {countdown}초 후 메인페이지로 돌아갑니다.
                </p>
                <Button className="w-full" onClick={redirectToHome}>
                  홈으로 돌아가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="비밀번호 재설정"
        description="새로운 비밀번호를 입력해주세요"
      />

      <CardContent>
        {error && <AuthErrorMessage messages={[error]} className="mb-4" />}

        <form
          onSubmit={handleSubmit(handlePasswordUpdate)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="새로운 비밀번호를 입력하세요"
              register={register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              register={register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isLoading}
          >
            {isLoading
              ? AUTH_BUTTON_TEXT.LOADING
              : AUTH_BUTTON_TEXT.RESET_PASSWORD.DEFAULT}
          </Button>
        </form>
      </CardContent>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
