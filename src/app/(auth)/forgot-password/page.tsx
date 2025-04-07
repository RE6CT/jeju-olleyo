'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { EmailFormValues } from '@/types/auth.type';
import useAuth from '@/lib/hooks/useAuth';
import { getForgotPasswordErrorMessage } from '@/lib/utils/auth-error-utils';

/**
 * 비밀번호 찾기 페이지 컴포넌트
 * - 이메일 입력 폼 제공
 * - 비밀번호 재설정 링크 발송
 * - 성공/실패 메시지 표시
 */
const ForgotPasswordPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { handleResetPassword, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  /**
   * 비밀번호 재설정 요청 핸들러
   * @param data - 이메일 데이터
   */
  const onSubmit = async (data: EmailFormValues) => {
    setErrorMessages([]);

    try {
      const success = await handleResetPassword(data.email);

      if (!success) {
        setErrorMessages(['비밀번호 재설정 중 오류가 발생했습니다.']);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('예외 발생:', error);
      const errorMessage = getForgotPasswordErrorMessage(
        error instanceof Error ? error.message : '알 수 없는 오류',
      );
      setErrorMessages(errorMessage);
    }
  };

  /**
   * 다시 시도하기 버튼 클릭 핸들러
   */
  const handleRetry = () => {
    setIsSubmitted(false);
    setErrorMessages([]);
    reset();
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="비밀번호 찾기"
        description="계정에 등록된 이메일을 입력하여 비밀번호를 재설정하세요"
      />

      <CardContent>
        {isSubmitted ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-600">
              비밀번호 재설정 링크가 이메일로 전송되었습니다.
              <br /> 이메일을 확인해주세요.
            </p>
            <Button variant="outline" className="w-full" onClick={handleRetry}>
              다시 시도하기
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errorMessages.length > 0 && (
              <div className="mb-4 text-sm text-red-500">
                {errorMessages.map((msg, idx) => (
                  <p key={idx}>{msg}</p>
                ))}
              </div>
            )}

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
          로그인 페이지로 돌아가기
          <Link
            href="/sign-in"
            className="ml-1 text-blue-600 hover:text-blue-800"
          >
            로그인
          </Link>
        </div>
      </CardFooter>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
