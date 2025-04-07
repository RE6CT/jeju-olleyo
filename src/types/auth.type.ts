import { UseFormRegisterReturn } from 'react-hook-form';

export type AuthFormProps<T extends LoginFormValues | RegisterFormValues> = {
  type: 'login' | 'register';
  onSubmit: (data: T) => void;
  isLoading?: boolean;
  savedEmail?: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phone: string;
};

export type AuthHeaderProps = {
  title: string;
  description: string;
};

export type AuthFooterProps = {
  question: string;
  linkText: string;
  linkHref: string;
};

export interface SocialProviderProps {
  provider: 'google' | 'kakao';
  onClick: () => Promise<boolean>;
}

export type PasswordInputProps = {
  id: string;
  placeholder: string;
  required?: boolean;
  register: UseFormRegisterReturn;
};

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type EmailFormValues = {
  email: string;
};

export type AuthMessageProps = {
  message: string;
};

export type UserInfo = {
  id: string;
  email: string | null;
  nickname: string | null;
  phone: string | null;
  avatar_url?: string | null;
};

export type SocialUserInfo = UserInfo & {
  provider?: string | null;
};

// Zustand를 사용해 인증 상태를 관리할 때 사용할 스토어의 타입
export type UserState = {
  user: UserInfo | null;
  isLogin: boolean;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
};

/**
 * 서버에서 반환되는 직렬화된 사용자 정보
 */
export interface SerializedUser {
  id: string;
  email: string;
  nickname: string | null;
  phone: string | null;
  avatar_url?: string | null;
  provider: string;
}

/**
 * 인증 응답 타입
 */
export interface AuthResponse {
  user: SerializedUser | null;
  error: {
    message: string;
    status: number;
  } | null;
}
