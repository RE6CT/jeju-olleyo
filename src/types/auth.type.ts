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

export type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export type PasswordInputProps = {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
