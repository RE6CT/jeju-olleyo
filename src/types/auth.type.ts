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
