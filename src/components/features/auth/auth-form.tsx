'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthFormProps } from '@/types/auth.type';
import PasswordInput from './auth-password-input';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 폼 컴포넌트
 *
 * @param type 로그인 또는 회원가입 타입
 * @param onSubmit 폼 제출 핸들러
 */

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const isLogin = type === 'login';
  const buttonText = isLogin ? '로그인' : '회원가입';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues | RegisterFormValues>({
    defaultValues: isLogin
      ? {
          email: '',
          password: '',
          remember: false,
        }
      : {
          email: '',
          password: '',
          confirmPassword: '',
          nickname: '',
          phone: '',
        },
  });

  const processSubmit: SubmitHandler<LoginFormValues | RegisterFormValues> = (
    data,
  ) => {
    // 폼 데이터를 콘솔에 출력
    console.log(data);

    // 상위 컴포넌트에 데이터 전달
    if (typeof onSubmit === 'function') {
      onSubmit(data as any);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email', { required: true })}
          />
        </div>

        {isLogin ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <PasswordInput
                id="password"
                placeholder="비밀번호를 입력하세요"
                register={register('password', { required: true })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  아이디 저장
                </Label>
              </div>
              <div>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <PasswordInput
                id="password"
                placeholder="비밀번호를 입력하세요"
                register={register('password', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="비밀번호를 다시 입력하세요"
                register={register('confirmPassword', {
                  required: true,
                  validate: (value) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다',
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력하세요"
                {...register('nickname', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="01012345678"
                {...register('phone', { required: true })}
              />
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          {buttonText}
        </Button>
      </form>
    </CardContent>
  );
};

export default AuthForm;
