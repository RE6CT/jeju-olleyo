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
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { AUTH_TIMEOUTS } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/use-auth';
import useAuthStore from '@/zustand/auth.store';
import PasswordInput from '@/components/features/auth/auth-password-input';
import { motion } from 'framer-motion';

const ResetPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(
    AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000,
  ); // 3초 카운트다운
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
        <AuthHeader
          title="비밀번호 재설정 완료"
          description="비밀번호가 성공적으로 변경되었습니다"
        />
        <CardContent className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <div className="mx-auto mb-4 inline-flex rounded-full bg-green-50 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
          </motion.div>

          {!error && (
            <p className="mb-6 text-center text-sm text-muted-foreground">
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
        {/* 에러 메시지를 폼 상단에 배치 */}
        {error && <AuthErrorMessage messages={[error]} className="mb-6" />}

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

      {/* 비밀번호 재설정 링크 */}
      {error && (
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
