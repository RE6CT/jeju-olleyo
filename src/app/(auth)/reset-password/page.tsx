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
import { updataUserPassword } from '@/lib/apis/auth-browser.api';

/**
 * 비밀번호 재설정 페이지 컴포넌트
 */
const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
          switch (error) {
            case 'access_denied':
              if (errorDescription?.includes('expired')) {
                setError(
                  '비밀번호 재설정 링크가 만료되었습니다. 새 링크를 요청해주세요.',
                );
              } else {
                setError(
                  '유효하지 않은 접근입니다. 비밀번호 재설정 링크를 다시 요청해주세요.',
                );
              }
              break;
            default:
              setError('비밀번호 재설정 중 오류가 발생했습니다.');
          }
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
      setError(null);

      const result = await updataUserPassword(data.password);

      if (result.error) {
        throw new Error(
          result.error.message || '비밀번호 재설정 중 오류가 발생했습니다.',
        );
      }

      setIsSubmitted(true);

      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(
        err instanceof Error
          ? err.message
          : '비밀번호 재설정 중 오류가 발생했습니다.',
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
          <div className="mb-4 text-sm text-green-500">
            비밀번호가 성공적으로 변경되었습니다.
          </div>
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
        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">새 비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
              autoComplete="new-password"
              disabled={!!error}
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
              disabled={!!error}
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
            disabled={!isValid || isLoading || !!error}
          >
            {isLoading ? '처리 중...' : '비밀번호 변경하기'}
          </Button>
        </form>
      </CardContent>

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
