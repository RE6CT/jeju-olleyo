'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/components/features/auth/auth-layout';
import AuthHeader from '@/components/features/auth/auth-header';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { EmailFormValues } from '@/types/auth.type';
import { resetPassword } from '@/lib/apis/auth-browser.api';
import { getForgotPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import useAuthStore from '@/zustand/auth.store';
import AuthErrorMessage from '@/components/features/auth/auth-error-message';

/**
 * 비밀번호 찾기 페이지 컴포넌트
 */
const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { setError, resetError, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    setIsLoading(true);
    resetError(); // 기존 에러 메시지 초기화

    try {
      const result = await resetPassword(data.email);

      if (result.error) {
        // auth-error-utils.ts의 getForgotPasswordErrorMessage 함수 사용
        const errorMessages = getForgotPasswordErrorMessage(
          result.error.message,
        );
        // 첫 번째 메시지만 스토어에 저장
        setError(errorMessages[0]);
        return;
      }

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('예외 발생:', error);
      const errorMessages = getForgotPasswordErrorMessage(
        error instanceof Error ? error.message : '알 수 없는 오류',
      );
      setError(errorMessages[0]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 다시 시도하기 버튼 핸들러
   */
  const handleRetry = () => {
    setIsSubmitted(false);
    resetError();
  };

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
        {isSubmitted ? (
          <div className="space-y-4">
            <div className="rounded-md border border-gray-400 p-3">
              <p className="text-center text-gray-400">
                {submittedEmail || 'abc123@email.com'}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Button className="text-balck w-full bg-gray-200" disabled={true}>
                메일 발송 완료!
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* 에러 메시지 표시 - 폼 바로 위에 배치 */}
            {error && <AuthErrorMessage messages={[error]} className="mb-6" />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          </>
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
