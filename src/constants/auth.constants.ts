/**
 * 공통 에러 메시지 상수
 */
export const ERROR_MESSAGES = {
  // 이메일 관련
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  EMAIL_EXISTS: '이미 사용 중인 이메일입니다.',
  EMAIL_NOT_FOUND: '등록되지 않은 이메일입니다.',

  // 비밀번호 관련
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
  MIN_PASSWORD_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
  PASSWORD_LETTER: '비밀번호는 최소 하나의 문자를 포함해야 합니다.',
  PASSWORD_NUMBER: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
  PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',

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
};

/**
 * 로컬 스토리지 키 상수
 */
export const STORAGE_KEY = {
  // 로그인 관련
  REMEMBER_EMAIL: 'remember_email',
  SAVED_EMAIL: 'saved_email',

  // 사용자 설정 관련
  THEME: 'theme',
  LANGUAGE: 'language',
};

/**
 * 인증 관련 시간 상수 (밀리초 단위)
 */
export const AUTH_TIMEOUTS = {
  // 비밀번호 변경 후 로그인 페이지로 리다이렉트 대기 시간 (3초)
  PASSWORD_CHANGE_REDIRECT_DELAY_MS: 3000,

  // 인증 세션 새로고침 간격 (4분 50초 = 290,000ms)
  // 기본 세션 만료 시간이 5분인 경우 사용
  SESSION_REFRESH_INTERVAL_MS: 290000,

  // 토큰 만료 전 갱신 임계값 (1분 = 60,000ms)
  TOKEN_REFRESH_THRESHOLD_MS: 60000,

  // 인증 상태 확인 간격 (30초 = 30,000ms)
  AUTH_CHECK_INTERVAL_MS: 30000,
};

/**
 * 비밀번호 변경후 로그인 페이지로 리다이렉트 대기 시간 (하위 호환성 유지용)
 * @deprecated AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS 사용 권장
 */
export const PASSWORD_CHANGE_REDIRECT_DELAY_MS =
  AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS;

/**
 * 인증 관련 경로 상수
 */
export const AUTH_ROUTES = {
  // 공개 페이지
  PUBLIC_ROUTES: [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/auth/callback',
  ],

  // 로그인 후 리다이렉트 경로 (기본값)
  DEFAULT_LOGIN_REDIRECT: '/',

  // 로그아웃 후 리다이렉트 경로
  LOGOUT_REDIRECT: '/sign-in',

  // 비밀번호 찾기 후 리다이렉트 경로
  RESET_PASSWORD_REDIRECT: '/sign-in',
};

/**
 * 소셜 로그인 관련 상수
 */
export const SOCIAL_AUTH = {
  // 소셜 로그인 제공자
  PROVIDERS: {
    GOOGLE: 'google',
    KAKAO: 'kakao',
  },

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
    MIN: 8,
  },
};
