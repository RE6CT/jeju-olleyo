import { PATH } from './path.constants';

/**
 * 공통 에러 메시지 상수
 */
export const ERROR_MESSAGES = {
  // 이메일 관련
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  EMAIL_EXISTS: '이미 사용 중인 이메일입니다.',
  EMAIL_NOT_FOUND: '등록되지 않은 이메일입니다.',
  EMAIL_NOT_REGISTERED_MESSAGE: '가입되지 않은 이메일입니다.',
  EMAIL_ADDRESS_IS_INVALID: '유효하지 않은 이메일입니다.',

  // 비밀번호 관련
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
  MIN_PASSWORD_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
  PASSWORD_LETTER: '비밀번호는 최소 하나의 문자를 포함해야 합니다.',
  PASSWORD_NUMBER: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
  PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_REQUIREMENTS_ERROR: '비밀번호가 보안 요구사항을 충족하지 않습니다.',
  PASSWORD_RESET_LINK_EXPIRED_ERROR: '비밀번호 재설정 링크가 만료되었습니다.',
  PASSWORD_SAME_AS_OLD: '이전과 동일한 비밀번호는 사용할 수 없습니다.',

  // 닉네임 관련
  REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
  MIN_NICKNAME_LENGTH: '닉네임은 최소 2자 이상이어야 합니다.',
  MAX_NICKNAME_LENGTH: '닉네임은 최대 10자까지 가능합니다.',
  NICKNAME_EXISTS: '이미 사용 중인 닉네임입니다.',

  // 전화번호 관련
  REQUIRED_PHONE: '휴대폰 번호를 입력해주세요.',
  INVALID_PHONE: '올바른 형식의 휴대폰 번호를 입력해주세요.',
  PHONE_EXISTS: '이미 등록된 휴대폰 번호입니다.',

  // 일반 오류
  NETWORK_ERROR: '네트워크 연결에 문제가 있습니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
  TOO_MANY_REQUESTS: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  SESSION_EXPIRED: '세션이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_EMAIL_OR_PASSWORD_ERROR: '이메일 또는 비밀번호가 올바르지 않습니다.',
};

/**
 * 인증 페이지 메타데이터
 */
export const AUTH_PAGE_META = {
  SIGNIN: {
    title: '로그인',
    description: '계정 정보를 입력하여 로그인하세요',
  },
  SIGNUP: {
    title: '회원가입',
    description: '이용정보를 입력하여 회원가입하세요',
  },
  FORGOT_PASSWORD: {
    title: '비밀번호 찾기',
    description: '가입시 입력한 이메일로 비밀번호를 재설정하세요',
  },
  RESET_PASSWORD: {
    title: '비밀번호 재설정',
    description: '새로운 비밀번호를 설정해주세요',
  },
};

/**
 * 폼 버튼 텍스트
 */
export const AUTH_BUTTON_TEXT = {
  LOGIN: {
    DEFAULT: '로그인',
  },
  REGISTER: {
    DEFAULT: '회원가입',
  },
  FORGOT_PASSWORD: {
    DEFAULT: '비밀번호 재설정 링크 받기',
    COMPLETE: '메일 발송 완료!',
  },
  RESET_PASSWORD: {
    DEFAULT: '비밀번호 변경하기',
  },
  SOCIAL: {
    GOOGLE: {
      DEFAULT: '구글 로그인',
      LOADING: '구글 로그인 중...',
    },
    KAKAO: {
      DEFAULT: '카카오 로그인',
      LOADING: '카카오 로그인 중...',
    },
  },
  LOADING: '처리 중...',
};

/**
 * 로컬 스토리지 키 상수
 */
export const STORAGE_KEY = {
  // 로그인 관련
  REMEMBER_EMAIL: 'remember_email',
  SAVED_EMAIL: 'saved_email',
};

/**
 * 인증 관련 시간 상수 (밀리초 단위)
 */
export const AUTH_TIMEOUTS = {
  // 비밀번호 변경 후 로그인 페이지로 리다이렉트 대기 시간 (3초)
  PASSWORD_CHANGE_REDIRECT_DELAY_MS: 3000,
};

/**
 * 인증 관련 경로 상수
 */
export const AUTH_ROUTES = {
  // 공개 페이지
  PUBLIC_ROUTES: [
    PATH.HOME,
    PATH.SIGNIN,
    PATH.SIGNUP,
    PATH.FORGOT_PASSWORD,
    PATH.RESET_PASSWORD,
    PATH.CALLBACK,
    PATH.SEARCH,
    PATH.COMMUNITY,
    PATH.TICKET,
    PATH.PLACES,
    PATH.PLAN_DETAIL,
    '/categories/all',
    '/categories/toursite',
    '/categories/accommodation',
    '/categories/restaurant',
    '/categories/cafe',
  ],
};

/**
 * 소셜 로그인 관련 상수
 */
export const SOCIAL_AUTH = {
  // 소셜 로그인 제공자
  PROVIDERS: {
    GOOGLE: 'google',
    KAKAO: 'kakao',
    EMAIL: 'email',
  } as const,

  // 소셜 로그인 설정
  SCOPES: {
    GOOGLE:
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    KAKAO: 'profile_nickname,profile_image,account_email',
  },
};

/**
 * 인증 폼 유효성 검사 규칙
 */
export const VALIDATION_RULES = {
  // 비밀번호 정규식 규칙 (최소 8자, 문자/숫자/특수문자 포함)
  PASSWORD_REGEX: {
    LETTER: /[A-Za-z]/,
    NUMBER: /[0-9]/,
    SPECIAL: /[^A-Za-z0-9]/,
  },

  // 전화번호 정규식 규칙 (한국 기준: 010-xxxx-xxxx)
  PHONE_REGEX: /^010\d{8}$/,

  // 닉네임 길이 제한
  NICKNAME: {
    MIN: 2,
    MAX: 10,
  },

  // 비밀번호 길이 제한
  PASSWORD: {
    NO: 1,
    MIN: 8,
  },
};

/**
 * 폼 기본값 상수
 */
export const DEFAULT_FORM_VALUES = {
  LOGIN: {
    email: '',
    password: '',
    remember: false,
  },
  REGISTER: {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phone: '',
  },
  FORGOT_PASSWORD: {
    email: '',
  },
  RESET_PASSWORD: {
    password: '',
    confirmPassword: '',
  },
};
