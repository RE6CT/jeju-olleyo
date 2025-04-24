import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * 인증 컴포넌트의 Props 타입
 */
export type AuthProps = {
  children: ReactNode;
};

/**
 * 인증 폼 컴포넌트의 Props 타입
 */
export type AuthFormProps<T extends LoginFormValues | RegisterFormValues> = {
  type: 'login' | 'register';
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  savedEmail?: string;
};

/**
 * 로그인 폼 값의 타입
 */
export type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

/**
 * 회원가입 폼 값의 타입
 */
export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phone: string;
  avatar_url?: string;
};

/**
 * 인증 페이지 헤더 컴포넌트의 Props 타입
 */
export type AuthHeaderProps = {
  title: string;
  description: string;
};

/**
 * 인증 페이지 푸터 컴포넌트의 Props 타입
 */
export type AuthFooterProps = {
  linkText: string;
  linkHref: string;
  onClick: () => void;
};

/**
 * 비밀번호 입력 필드 컴포넌트의 Props 타입
 */
export type PasswordInputProps = {
  id: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  /** react-hook-form의 register 반환값 */
  register: UseFormRegisterReturn;
  autoComplete: string;
};

/**
 * 비밀번호 재설정 폼 값의 타입
 */
export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

/**
 * 이메일 폼 값의 타입 (비밀번호 찾기 등에서 사용)
 */
export type EmailFormValues = {
  email: string;
};

/**
 * 사용자 정보 타입
 */
export type UserInfo = {
  id: string;
  email: string | null;
  nickname: string | null;
  phone: string | null;
  avatar_url: string | null;
};

/**
 * 인증 API 결과 타입
 */
export type AuthResult = {
  success: boolean;
  error?: {
    message: string;
    status: number;
  } | null;
};

/**
 * 에러 메시지 컴포넌트의 Props 타입
 */
export type AuthErrorMessageProps = {
  messages: string[];
  className?: string;
  variant?: 'default' | 'destructive';
};

/**
 * 비밀번호 재설정 성공 모달 컴포넌트 Props
 */
export type ResetPasswordSuccessModalProps = {
  open: boolean;
  countdown: number;
  redirectToHome: () => void;
};

export type ForgotPasswordState = {
  isSubmitted: boolean;
  submittedEmail: string;
  error: string | null;
  setIsSubmitted: (value: boolean) => void;
  setSubmittedEmail: (email: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

export type ResetPasswordState = {
  isSubmitted: boolean;
  countdown: number;
  error: string | null;
  setIsSubmitted: (value: boolean) => void;
  setCountdown: (value: number) => void;
  decrementCountdown: () => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

// 인증체크 프롭
export type UseAuthCheckProps = {
  redirectTo?: string;
  redirectIfFound?: boolean;
  skipCheck?: boolean;
};
