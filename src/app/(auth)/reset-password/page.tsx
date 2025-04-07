'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { AUTH_TIMEOUTS } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/use-auth';
import PasswordInput from '@/components/features/auth/auth-password-input';
import useAuthStore from '@/zustand/auth.store';

const ResetPasswordPage = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(
    AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000,
  ); // 3초 카운트다운
  const router = useRouter();
  const { handleUpdatePassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSubmitted && countdown > 0) {
      // 카운트다운 타이머 시작
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/'); // 카운트가 끝나면 리다이렉트
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isSubmitted, countdown, router]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setErrorMessages([]);

    try {
      const success = await handleUpdatePassword(data.password);

      if (!success) {
        setErrorMessages(['기존의 비밀번호와 일치합니다.']);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      setErrorMessages(
        err instanceof Error
          ? [err.message]
          : getResetPasswordErrorMessage(
              '비밀번호 재설정 중 오류가 발생했습니다.',
            ),
      );
    }
  };

  // 비밀번호 변경 성공 화면
  if (isSubmitted) {
    return (
      <AuthLayout>
        <AuthHeader
          title="비밀번호 재설정 완료"
          description="비밀번호가 성공적으로 변경되었습니다"
        />
        <CardContent className="text-center">
          {errorMessages.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              {countdown}초 후 메인 페이지로 이동합니다.
            </p>
          )}
          <Button className="w-full" onClick={() => router.push('/')}>
            메인 페이지로 이동
          </Button>
        </CardContent>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <AuthHeader
        title="비밀번호 재설정"
        description="새로운 비밀번호를 입력해주세요"
      />

      {/* 비밀번호 입력 필드 */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="새로운 비밀번호를 입력하세요"
              register={register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
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
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

            <div className={`mb-4 flex justify-center rounded-md p-3`}>
              <div className="text-sm text-red-600">
                {errorMessages.map((message, index) => (
                  <p key={index} className={index > 0 ? 'mt-1' : ''}>
                    {message}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isLoading}
          >
            {isLoading ? '처리 중...' : '비밀번호 변경하기'}
          </Button>
        </form>
      </CardContent>

      {/* 비밀번호 재설정 링크 */}
      {errorMessages.length > 0 && (
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-600">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              비밀번호 재설정 링크 다시 받기
            </Link>
          </div>
        </CardFooter>
      )}
    </AuthLayout>
  );
};

export default ResetPasswordPage;
