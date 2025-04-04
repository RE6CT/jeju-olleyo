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
import { resetPassword } from '@/lib/apis/auth-server.api';
import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { EmailFormValues } from '@/types/auth.type';

/**
 * 비밀번호 찾기 페이지 컴포넌트
 */
const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
   * 비밀번호 재설정 요청 처리 함수
   */
  const onSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    try {
      const result = await resetPassword(data.email);

      if (result.error) {
        console.error('비밀번호 재설정 오류:', result.error);
        alert(`비밀번호 재설정 요청 실패: ${result.error.message}`);
        return;
      }

      setIsSubmitted(true);
      alert('비밀번호 재설정 링크가 이메일로 전송되었습니다');
    } catch (error) {
      console.error('예외 발생:', error);
      alert(
        `비밀번호 재설정 요청 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    } finally {
      setIsLoading(false);
    }
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
              비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을
              확인해주세요.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              다시 시도하기
            </Button>
          </div>
        ) : (
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
