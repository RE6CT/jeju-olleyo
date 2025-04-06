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

export type SocialProviderProps = {
  provider: 'google' | 'kakao';
  onClick: () => void;
};

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
