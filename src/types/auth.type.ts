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
  /** 폼 타입 (로그인 또는 회원가입) */
  type: 'login' | 'register';
  /** 폼 제출 핸들러 */
  onSubmit: (data: T) => void;
  /** 로딩 상태 여부 */
  isLoading?: boolean;
  /** 저장된 이메일 (로그인 페이지에서만 사용) */
  savedEmail?: string;
};

/**
 * 로그인 폼 값의 타입
 */
export type LoginFormValues = {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string;
  /** 아이디 저장 체크 여부 */
  remember: boolean;
};

/**
 * 회원가입 폼 값의 타입
 */
export type RegisterFormValues = {
  /** 사용자 이메일 */
  email: string;
  /** 사용자 비밀번호 */
  password: string;
  /** 비밀번호 확인 */
  confirmPassword: string;
  /** 사용자 닉네임 */
  nickname: string;
  /** 사용자 전화번호 */
  phone: string;
};

/**
 * 인증 페이지 헤더 컴포넌트의 Props 타입
 */
export type AuthHeaderProps = {
  /** 페이지 제목 */
  title: string;
  /** 페이지 설명 */
  description: string;
};

/**
 * 인증 페이지 푸터 컴포넌트의 Props 타입
 */
export type AuthFooterProps = {
  /** 질문 텍스트 */
  question: string;
  /** 링크 텍스트 */
  linkText: string;
  /** 링크 URL */
  linkHref: string;
};

/**
 * 비밀번호 입력 필드 컴포넌트의 Props 타입
 */
export type PasswordInputProps = {
  /** 필드 ID */
  id: string;
  /** 플레이스홀더 텍스트 */
  placeholder: string;
  /** 필수 여부 */
  required?: boolean;
  /** react-hook-form의 register 반환값 */
  register: UseFormRegisterReturn;
};

/**
 * 비밀번호 재설정 폼 값의 타입
 */
export type ResetPasswordFormValues = {
  /** 새 비밀번호 */
  password: string;
  /** 비밀번호 확인 */
  confirmPassword: string;
};

/**
 * 이메일 폼 값의 타입 (비밀번호 찾기 등에서 사용)
 */
export type EmailFormValues = {
  /** 사용자 이메일 */
  email: string;
};

/**
 * 사용자 정보 타입
 */
export type UserInfo = {
  /** 사용자 이메일 */
  email: string | null;
  /** 사용자 닉네임 */
  nickname: string | null;
  /** 사용자 전화번호 */
  phone: string | null;
  /** 사용자 프로필 이미지 URL */
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
