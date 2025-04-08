'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';
import PasswordInput from '@/components/features/auth/auth-password-input';

import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { AUTH_TIMEOUTS } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/use-auth';
import useAuthStore from '@/zustand/auth.store';

const ResetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(
    AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000,
  );
  const router = useRouter();
  const { handleUpdatePassword, isLoading } = useAuth();
  const { setError, resetError, error } = useAuthStore();

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

  // URL 해시에서 오류 정보 파싱
  useEffect(() => {
    const parseHashFragment = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          // 에러 메시지 변환 후 저장
          const errorMessages = getResetPasswordErrorMessage(
            errorDescription || error,
          );
          setError(errorMessages[0]);
        }
      }
    };

    parseHashFragment();

    // 컴포넌트 언마운트 시 에러 상태 초기화
    return () => resetError();
  }, [setError, resetError]);

  // 카운트다운 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSubmitted && countdown > 0) {
      // 카운트다운 타이머 시작
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isSubmitted, countdown, router]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    resetError(); // 이전 에러 메시지 초기화

    try {
      const result = await handleUpdatePassword(data.password);

      if (result.success === false) {
        // 서버에서 반환된 실제 에러 메시지를 사용
        const errorMessages = getResetPasswordErrorMessage(
          result.errorMessage || '비밀번호 변경 중 오류가 발생했습니다.',
        );
        setError(errorMessages[0]);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      // 예외 처리 (네트워크 오류 등)
      const errorMessages = getResetPasswordErrorMessage(
        err instanceof Error
          ? err.message
          : '비밀번호 재설정 중 오류가 발생했습니다.',
      );
      setError(errorMessages[0]);
    }
  };

  // 비밀번호 변경 성공 화면
  if (isSubmitted) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center p-6">
          <div className="w-full">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold">비밀번호 재설정</h2>
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
                <Button className="w-full" onClick={() => router.push('/')}>
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
    </AuthLayout>
  );
};

export default ResetPasswordPage;
