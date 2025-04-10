import { ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * 인증 오류 메시지를 변환하는 함수
 * @param errorMessage 원본 오류 메시지
 * @returns 사용자 친화적인 오류 메시지 배열
 */
export const getAuthErrorMessage = (errorMessage: string): string[] => {
  if (!errorMessage) {
    return [ERROR_MESSAGES.UNKNOWN_ERROR];
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  // 인증 정보 오류
  if (
    lowerCaseMessage.includes('invalid login credentials') ||
    lowerCaseMessage.includes('invalid credentials') ||
    lowerCaseMessage.includes('invalid email') ||
    lowerCaseMessage.includes('invalid password')
  ) {
    return [ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD_ERROR];
  }

  // 요청 제한
  if (
    lowerCaseMessage.includes('too many requests') ||
    lowerCaseMessage.includes('rate limit')
  ) {
    return [ERROR_MESSAGES.TOO_MANY_REQUESTS];
  }

  // 사용자 존재 여부
  if (lowerCaseMessage.includes('user not found')) {
    return [ERROR_MESSAGES.EMAIL_NOT_FOUND];
  }

  // 이메일 중복
  if (
    lowerCaseMessage.includes('email already in use') ||
    (lowerCaseMessage.includes('already exists') &&
      lowerCaseMessage.includes('email'))
  ) {
    return [ERROR_MESSAGES.EMAIL_EXISTS];
  }

  // 비밀번호 규칙
  if (
    lowerCaseMessage.includes('password') &&
    (lowerCaseMessage.includes('weak') ||
      lowerCaseMessage.includes('strong') ||
      lowerCaseMessage.includes('complex'))
  ) {
    return [ERROR_MESSAGES.PASSWORD_REQUIREMENTS_ERROR];
  }

  // 닉네임 중복
  if (
    lowerCaseMessage.includes('nickname') &&
    lowerCaseMessage.includes('already')
  ) {
    return [ERROR_MESSAGES.NICKNAME_EXISTS];
  }

  // 전화번호 중복
  if (
    lowerCaseMessage.includes('phone') &&
    lowerCaseMessage.includes('already')
  ) {
    return [ERROR_MESSAGES.PHONE_EXISTS];
  }

  // 네트워크 오류
  if (
    lowerCaseMessage.includes('network') ||
    lowerCaseMessage.includes('connection')
  ) {
    return [ERROR_MESSAGES.NETWORK_ERROR];
  }

  // 세션 만료
  if (
    lowerCaseMessage.includes('session expired') ||
    lowerCaseMessage.includes('no session')
  ) {
    return [ERROR_MESSAGES.SESSION_EXPIRED];
  }

  // 링크 만료
  if (
    lowerCaseMessage.includes('expired') ||
    lowerCaseMessage.includes('invalid token') ||
    lowerCaseMessage.includes('link expired')
  ) {
    return [ERROR_MESSAGES.PASSWORD_RESET_LINK_EXPIRED_ERROR];
  }

  // 비밀번호 재설정
  if (
    lowerCaseMessage.includes('same as old password') ||
    lowerCaseMessage.includes(
      'new password should be different from the old password',
    ) ||
    errorMessage.includes(
      'New password should be different from the old password',
    )
  ) {
    return [ERROR_MESSAGES.PASSWORD_SAME_AS_OLD];
  }

  // 기타 오류는 그대로 표시
  return [errorMessage];
};

/**
 * 로그인 관련 오류 메시지를 가져오는 함수
 */
export const getLoginErrorMessage = (errorMessage: string): string[] =>
  getAuthErrorMessage(errorMessage);

/**
 * 회원가입 관련 오류 메시지를 가져오는 함수
 */
export const getSignupErrorMessage = (errorMessage: string): string[] =>
  getAuthErrorMessage(errorMessage);

/**
 * 비밀번호 찾기 관련 오류 메시지를 가져오는 함수
 */
export const getForgotPasswordErrorMessage = (errorMessage: string): string[] =>
  getAuthErrorMessage(errorMessage);

/**
 * 비밀번호 재설정 관련 오류 메시지를 가져오는 함수
 */
export const getResetPasswordErrorMessage = (errorMessage: string): string[] =>
  getAuthErrorMessage(errorMessage);
