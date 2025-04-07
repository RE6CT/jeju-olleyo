import { UseFormRegisterReturn } from 'react-hook-form';

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
 * 소셜 로그인 제공자 컴포넌트의 Props 타입
 */
export interface SocialProviderProps {
  /** 소셜 로그인 제공자 (구글, 카카오) */
  provider: 'google' | 'kakao';
  /** 클릭 이벤트 핸들러 */
  onClick: () => Promise<boolean>;
}

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
 * 인증 메시지 컴포넌트의 Props 타입
 */
export type AuthMessageProps = {
  /** 표시할 메시지 */
  message: string;
};

/**
 * 기본 사용자 정보 타입
 */
export type UserInfo = {
  /** 사용자 고유 ID */
  id: string;
  /** 사용자 이메일 */
  email: string | null;
  /** 사용자 닉네임 */
  nickname: string | null;
  /** 사용자 전화번호 */
  phone: string | null;
  /** 사용자 프로필 이미지 URL */
  avatar_url?: string | null;
};

/**
 * 소셜 로그인을 포함한 사용자 정보 타입
 */
export type SocialUserInfo = UserInfo & {
  /** 인증 제공자 (email, google, kakao 등) */
  provider?: string | null;
};

/**
 * 인증 상태 관리를 위한 Zustand 스토어의 타입
 */
export type UserState = {
  /** 사용자 정보 */
  user: UserInfo | null;
  /** 로그인 여부 */
  isLogin: boolean;
  /** 사용자 정보 설정 함수 */
  setUser: (user: UserInfo) => void;
  /** 사용자 정보 초기화 함수 */
  clearUser: () => void;
};

/**
 * 서버에서 반환되는 직렬화된 사용자 정보
 */
export interface SerializedUser {
  /** 사용자 고유 ID */
  id: string;
  /** 사용자 이메일 */
  email: string;
  /** 사용자 닉네임 */
  nickname: string | null;
  /** 사용자 전화번호 */
  phone: string | null;
  /** 사용자 프로필 이미지 URL */
  avatar_url?: string | null;
  /** 인증 제공자 */
  provider: string;
}

/**
 * 인증 응답 타입
 */
export interface AuthResponse {
  /** 사용자 정보 */
  user: SerializedUser | null;
  /** 오류 정보 */
  error: {
    /** 오류 메시지 */
    message: string;
    /** HTTP 상태 코드 */
    status: number;
  } | null;
}

/**
 * 사용자 프로필 업데이트 데이터 타입
 */
export interface ProfileUpdateData {
  /** 사용자 닉네임 */
  nickname?: string;
  /** 사용자 전화번호 */
  phone?: string;
  /** 사용자 프로필 이미지 URL */
  avatar_url?: string;
}
