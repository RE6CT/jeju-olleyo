/**
 * 공통 에러 메시지 상수
 */
export const ERROR_MESSAGES = {
  REQUIRED_EMAIL: '이메일을 입력해주세요.',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다.',
  REQUIRED_PASSWORD: '비밀번호를 입력해주세요.',
  MIN_PASSWORD_LENGTH: '비밀번호는 최소 8자 이상이어야 합니다.',
  PASSWORD_LETTER: '비밀번호는 최소 하나의 문자를 포함해야 합니다.',
  PASSWORD_NUMBER: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.',
  PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  REQUIRED_NICKNAME: '닉네임을 입력해주세요.',
  MIN_NICKNAME_LENGTH: '닉네임은 최소 2자 이상이어야 합니다.',
  MAX_NICKNAME_LENGTH: '닉네임은 최대 10자까지 가능합니다.',
  REQUIRED_PHONE: '휴대폰 번호를 입력해주세요.',
  INVALID_PHONE: '올바른 형식의 휴대폰 번호를 입력해주세요.',
};

/**
 * 로컬 스토리지 키 상수
 */
export const STORAGE_KEY = {
  REMEMBER_EMAIL: 'remember_email',
  SAVED_EMAIL: 'saved_email',
};
