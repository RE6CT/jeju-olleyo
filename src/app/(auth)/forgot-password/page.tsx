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
            : '계정에 등록된 이메일을 입력하여 비밀번호를 재설정하세요'
        }
      />

      <CardContent>
        {error && <AuthErrorMessage messages={[error]} className="mb-4" />}

        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-md border border-gray-400 p-3">
              <p className="text-center text-gray-400">
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
          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '처리 중...' : '비밀번호 재설정 링크 받기'}
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-600">
          <Link href="/sign-in" className="ml-1 text-black hover:text-blue-800">
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
