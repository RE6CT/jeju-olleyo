'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { updateUserPassword } from '@/lib/apis/auth-browser.api';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error-utils';
import { PASSWORD_CHANGE_REDIRECT_DELAY_MS } from '@/constants/auth.constants';

/**
 * 비밀번호 재설정 페이지 컴포넌트
 */
const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

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
    const parseHashFragment = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          let errorMessage;

          switch (error) {
            case 'access_denied':
              if (errorDescription?.includes('expired')) {
                errorMessage = [
                  '비밀번호 재설정 링크가 만료되었습니다.',
                  '새 링크를 요청해주세요.',
                ];
              } else {
                errorMessage = [
                  '유효하지 않은 접근입니다.',
                  '비밀번호 재설정 링크를 다시 요청해주세요.',
                ];
              }
              break;
            default:
              errorMessage = getResetPasswordErrorMessage(
                errorDescription || error,
              );
          }

          setErrorMessages(errorMessage);
        }
      }
    };

    parseHashFragment();
  }, []);

  /**
   * 비밀번호 재설정 제출 핸들러
   * @param data - 비밀번호 데이터
   */
  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    try {
      setErrorMessages([]);

      const result = await updateUserPassword(data.password);

      if (result.error) {
        const errorMessage = getResetPasswordErrorMessage(
          result.error.message || '비밀번호 재설정 중 오류가 발생했습니다.',
        );
        throw new Error(errorMessage.join(''));
      }

      setIsSubmitted(true);

      useEffect(() => {
        const redirectTimer = setTimeout(() => {
          router.push('/sign-in');
        }, PASSWORD_CHANGE_REDIRECT_DELAY_MS);

        // 컴포넌트 언마운트 시 타이머 제거
        return () => clearTimeout(redirectTimer);
      }, []);
    } catch (err) {
      setErrorMessages(
        err instanceof Error
          ? [err.message]
          : getResetPasswordErrorMessage(
              '비밀번호 재설정 중 오류가 발생했습니다.',
            ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout>
        <AuthHeader
          title="비밀번호 재설정 완료"
          description="비밀번호가 성공적으로 변경되었습니다"
        />
        <CardContent>
          <Button className="w-full" onClick={() => router.push('/sign-in')}>
            로그인 페이지로 이동
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

      <CardContent>
        {errorMessages.length > 0 && (
          <div className="mb-4 text-sm text-red-500">{errorMessages}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              autoComplete="new-password"
              {...register('confirmPassword')}
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

      {errorMessages && (
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
