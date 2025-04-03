import { UseFormRegisterReturn } from 'react-hook-form';

export type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
};

export type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterFormValues = LoginFormValues & {
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
