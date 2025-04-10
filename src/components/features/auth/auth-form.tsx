'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthFormProps } from '@/types/auth.type';
import PasswordInput from './auth-password-input';
import { useForm, Controller } from 'react-hook-form';
import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import { useCallback, useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/lib/schemas/auth-schema';
import { PATH } from '@/constants/path.constants';
import ErrorMessage from './auth-form-error-message';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';

/**
 * 인증 관련 페이지의 폼 컴포넌트
 *
 * @param type 로그인 또는 회원가입 타입
 * @param onSubmit 폼 제출 핸들러
 * @param isLoading 로딩 상태 여부
 * @param savedEmail 저장된 이메일 (로그인 페이지에서만 사용)
 */

const AuthForm = <T extends LoginFormValues | RegisterFormValues>({
  type,
  onSubmit,
  isLoading = false,
  savedEmail = '',
}: AuthFormProps<T> & { saveEmail?: string }) => {
  const isLogin = type === 'login';

  // useMemo를 이용한 버튼 텍스트 최적화
  const buttonText = useMemo(
    () => (isLogin ? '로그인' : '회원가입'),
    [isLogin],
  );

  // 로그인 폼 설정
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    control: controlLogin,
    formState: { errors: errorsLogin },
    setValue: setLoginValue,
  } = useForm<LoginFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  // 회원가입 폼 설정
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm<RegisterFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      phone: '',
    },
  });

  // 저장된 이메일이 있을 경우 폼에 설정
  useEffect(() => {
    if (isLogin && savedEmail) {
      setLoginValue('email', savedEmail);
      setLoginValue('remember', true);
    }
  }, [isLogin, savedEmail, setLoginValue]);

  // 제출 핸들러 - 타입에 맞게 처리 (useCallback 사용)
  const handleFormSubmit = useCallback(
    isLogin
      ? (data: LoginFormValues) => onSubmit(data as T)
      : (data: RegisterFormValues) => onSubmit(data as T),
    [isLogin, onSubmit],
  );

  return (
    <CardContent>
      {isLogin ? (
        // 로그인 폼
        <form
          className="space-y-2"
          onSubmit={handleSubmitLogin(
            handleFormSubmit as (data: LoginFormValues) => void,
          )}
        >
          {/* 이메일 입력 필드 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...registerLogin('email')}
            />
            <ErrorMessage message={errorsLogin.email?.message} />
          </div>

          <div className="space-y-2">
            {/* 비밀번호 입력 필드 */}
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
            </div>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              register={registerLogin('password')}
            />
            <ErrorMessage message={errorsLogin.password?.message} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* 아이디 저장 체크박스 */}
              <Controller
                name="remember"
                control={controlLogin}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
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
              {/* 비밀번호 찾기 링크 */}
              <Link
                href={PATH.FORGOT_PASSWORD}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>

          {/* 폼 제출 버튼 영역 */}
          <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
            {isLoading ? AUTH_BUTTON_TEXT.LOADING : buttonText}
          </Button>
        </form>
      ) : (
        // 회원가입 폼
        <form
          onSubmit={handleSubmitSignup(
            handleFormSubmit as (data: RegisterFormValues) => void,
          )}
        >
          {/* 이메일 입력 필드 */}
          <div className="space-y-1">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...registerSignup('email')}
            />
            <ErrorMessage message={errorsSignup.email?.message} />
          </div>

          <div className="space-y-1">
            {/* 비밀번호 입력 필드 */}
            <Label htmlFor="password">비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              register={registerSignup('password')}
            />
            <ErrorMessage message={errorsSignup.password?.message} />
          </div>

          <div className="space-y-1">
            {/* 비밀번호 확인 입력 필드 */}
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              register={registerSignup('confirmPassword')}
            />
            <ErrorMessage message={errorsSignup.confirmPassword?.message} />
          </div>

          <div className="space-y-1">
            {/* 닉네임 입력 필드 */}
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              {...registerSignup('nickname')}
            />
            <ErrorMessage message={errorsSignup.nickname?.message} />
          </div>

          <div className="space-y-1">
            {/* 전화번호 입력 필드 */}
            <Label htmlFor="phone">전화번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="01012345678"
              {...registerSignup('phone')}
            />
            <ErrorMessage message={errorsSignup.phone?.message} />
          </div>

          {/* 폼 제출 버튼 영역 */}
          <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
            {isLoading ? AUTH_BUTTON_TEXT.LOADING : buttonText}
          </Button>
        </form>
      )}
    </CardContent>
  );
};

export default AuthForm;
