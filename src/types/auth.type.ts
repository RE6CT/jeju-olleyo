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
  question: string;
  linkText: string;
  linkHref: string;
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
 * 인증 상태 관리를 위한 Zustand 스토어 타입
 */
export type AuthState = {
  user: UserInfo | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // 액션들
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetError: () => void;
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
 * 중복 결과를 알려주는 타입
 */
export type ExistsResult =
  | { exists: true }
  | { exists: false }
  | { error: { message: string; status: number } };

/**
 * 중복 결과를 알려주는 타입
 */

export type SeverUserInfo = {
  id: string;
  email?: string;
  avatar_url: string;
  nickname: string;
  phone: string;
};
