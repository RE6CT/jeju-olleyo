'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AUTH_BUTTON_TEXT } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';
import { loginSchema, registerSchema } from '@/lib/schemas/auth-schema';
import {
  AuthFormProps,
  LoginFormValues,
  RegisterFormValues,
} from '@/types/auth.type';
import ErrorMessage from '@/components/features/error-message/input-error-message';
import PasswordInput from '@/components/features/input/password-input';

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
          onSubmit={handleSubmitLogin(
            handleFormSubmit as (data: LoginFormValues) => void,
          )}
          aria-label="로그인 양식"
        >
          {/* 이메일 입력 필드 */}
          <fieldset>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...registerLogin('email')}
              aria-required="true"
              aria-invalid={errorsLogin.email ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsLogin.email?.message} />
          </fieldset>

          <fieldset>
            {/* 비밀번호 입력 필드 */}
            <Label htmlFor="password">비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              register={registerLogin('password')}
              aria-required="true"
              aria-invalid={errorsLogin.password ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsLogin.password?.message} />
          </fieldset>

          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              {/* 아이디 저장 체크박스 */}
              <Controller
                name="remember"
                control={controlLogin}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="flex h-5 w-5 items-center justify-center border border-solid border-[color:var(--gray-100,#E7EDF0)] bg-white"
                  />
                )}
              />
              <Label htmlFor="remember" className="regular-12 color-[#797979]">
                아이디 저장
              </Label>
            </div>
          </div>

          {/* 폼 제출 버튼 영역 */}
          <Button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-primary-500 p-2.5 pt-3 hover:bg-primary-600"
            disabled={isLoading}
          >
            {isLoading ? AUTH_BUTTON_TEXT.LOADING : buttonText}
          </Button>
          <nav className="flex flex-row justify-center">
            {/* 비밀번호 찾기 링크 */}
            <Link
              href={PATH.FORGOT_PASSWORD}
              className="regular-12 p-2.5 text-gray-600"
            >
              비밀번호 찾기
            </Link>
            <Link
              href={PATH.SIGNUP}
              className="medium-12 p-2.5 text-secondary-300"
            >
              회원가입
            </Link>
          </nav>
        </form>
      ) : (
        // 회원가입 폼
        <form
          onSubmit={handleSubmitSignup(
            handleFormSubmit as (data: RegisterFormValues) => void,
          )}
          aria-label="회원가입 양식"
        >
          {/* 이메일 입력 필드 */}
          <fieldset>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...registerSignup('email')}
              aria-required="true"
              aria-invalid={errorsSignup.email ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsSignup.email?.message} />
          </fieldset>

          <fieldset>
            {/* 비밀번호 입력 필드 */}
            <Label htmlFor="password">비밀번호</Label>
            <PasswordInput
              id="password"
              placeholder="비밀번호를 입력하세요"
              register={registerSignup('password')}
              autoComplete="new-password"
              aria-required="true"
              aria-invalid={errorsSignup.password ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsSignup.password?.message} />
          </fieldset>

          <fieldset>
            {/* 비밀번호 확인 입력 필드 */}
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              register={registerSignup('confirmPassword')}
              autoComplete="new-password"
              aria-required="true"
              aria-invalid={errorsSignup.confirmPassword ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsSignup.confirmPassword?.message} />
          </fieldset>

          <fieldset>
            {/* 전화번호 입력 필드 */}
            <Label htmlFor="phone">휴대폰 번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010 1234 5678"
              {...registerSignup('phone')}
              aria-required="true"
              aria-invalid={errorsSignup.phone ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsSignup.phone?.message} />
          </fieldset>

          <fieldset>
            {/* 닉네임 입력 필드 */}
            <Label htmlFor="nickname">닉네임</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="한글, 영문, 숫자"
              {...registerSignup('nickname')}
              aria-required="true"
              aria-invalid={errorsSignup.nickname ? 'true' : 'false'}
            />
            <ErrorMessage message={errorsSignup.nickname?.message} />
          </fieldset>

          {/* 폼 제출 버튼 영역 */}
          <Button
            type="submit"
            className="mt-4 flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-primary-500 p-2.5 pt-3 hover:bg-primary-600"
            disabled={isLoading}
          >
            {isLoading ? AUTH_BUTTON_TEXT.LOADING : buttonText}
          </Button>
        </form>
      )}
    </CardContent>
  );
};

export default AuthForm;
