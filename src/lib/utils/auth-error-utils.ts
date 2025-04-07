/**
 * 로그인 관련 오류 메시지를 사용자 친화적으로 변환
 * @param errorMessage - 서버에서 반환된 오류 메시지
 * @returns 사용자 친화적인 오류 메시지 (배열 형태)
 */
export const getLoginErrorMessage = (errorMessage: string): string[] => {
  if (!errorMessage) {
    return ['로그인 중 오류가 발생했습니다.', '다시 시도해주세요.'];
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  // 인증 정보 오류
  if (
    lowerCaseMessage.includes('invalid login credentials') ||
    lowerCaseMessage.includes('invalid credentials') ||
    lowerCaseMessage.includes('invalid email') ||
    lowerCaseMessage.includes('invalid password')
  ) {
    return [
      '이메일 또는 비밀번호가 올바르지 않습니다.',
      '정보를 다시 확인해주세요.',
    ];
  }

  // 이메일 인증 관련
  if (lowerCaseMessage.includes('email not confirmed')) {
    return ['이메일 인증이 완료되지 않았습니다.', '메일함을 확인해주세요.'];
  }

  // 요청 제한
  if (
    lowerCaseMessage.includes('too many requests') ||
    lowerCaseMessage.includes('rate limit')
  ) {
    return ['로그인 시도가 너무 많습니다.', '잠시 후 다시 시도해주세요.'];
  }

  // 사용자 존재 여부
  if (lowerCaseMessage.includes('user not found')) {
    return ['등록되지 않은 이메일입니다.', '회원가입을 먼저 진행해주세요.'];
  }

  // 네트워크 오류
  if (
    lowerCaseMessage.includes('network') ||
    lowerCaseMessage.includes('connection')
  ) {
    return ['네트워크 연결에 문제가 있습니다.', '인터넷 연결을 확인해주세요.'];
  }

  // 세션 만료
  if (lowerCaseMessage.includes('no session')) {
    return ['인증 세션이 만료되었습니다.', '다시 로그인해주세요.'];
  }

  // 기타 오류는 그대로 표시하지만 줄바꿈 추가
  return [errorMessage, '다시 시도해주세요.'];
};

/**
 * 회원가입 관련 오류 메시지를 사용자 친화적으로 변환
 * @param errorMessage - 서버에서 반환된 오류 메시지
 * @returns 사용자 친화적인 오류 메시지 (배열 형태)
 */
export const getSignupErrorMessage = (errorMessage: string): string[] => {
  if (!errorMessage) {
    return ['회원가입 중 오류가 발생했습니다.', '다시 시도해주세요.'];
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  // 이메일 중복
  if (
    lowerCaseMessage.includes('email already in use') ||
    (lowerCaseMessage.includes('already exists') &&
      lowerCaseMessage.includes('email'))
  ) {
    return ['이미 사용 중인 이메일입니다.', '다른 이메일을 사용해주세요.'];
  }

  // 비밀번호 규칙
  if (
    lowerCaseMessage.includes('password') &&
    (lowerCaseMessage.includes('weak') ||
      lowerCaseMessage.includes('strong') ||
      lowerCaseMessage.includes('complex'))
  ) {
    return [
      '비밀번호가 보안 요구사항을 충족하지 않습니다.',
      '영문, 숫자, 특수문자를 모두 포함하여 8자 이상으로 설정해주세요.',
    ];
  }

  // 닉네임 중복
  if (
    lowerCaseMessage.includes('nickname') &&
    lowerCaseMessage.includes('already')
  ) {
    return ['이미 사용 중인 닉네임입니다.', '다른 닉네임을 사용해주세요.'];
  }

  // 전화번호 중복
  if (
    lowerCaseMessage.includes('phone') &&
    lowerCaseMessage.includes('already')
  ) {
    return ['이미 등록된 휴대폰 번호입니다.', '다른 번호를 사용해주세요.'];
  }

  // 네트워크 오류
  if (
    lowerCaseMessage.includes('network') ||
    lowerCaseMessage.includes('connection')
  ) {
    return ['네트워크 연결에 문제가 있습니다.', '인터넷 연결을 확인해주세요.'];
  }

  // 기타 오류는 그대로 표시하지만 줄바꿈 추가
  return [errorMessage, '다시 시도해주세요.'];
};

/**
 * 비밀번호 찾기 관련 오류 메시지를 사용자 친화적으로 변환
 * @param errorMessage - 서버에서 반환된 오류 메시지
 * @returns 사용자 친화적인 오류 메시지 (배열 형태)
 */
export const getForgotPasswordErrorMessage = (
  errorMessage: string,
): string[] => {
  if (!errorMessage) {
    return ['비밀번호 찾기 중 오류가 발생했습니다.', '다시 시도해주세요.'];
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  // 사용자 존재 여부
  if (lowerCaseMessage.includes('user not found')) {
    return ['등록되지 않은 이메일입니다.', '이메일 주소를 확인해주세요.'];
  }

  // 이메일 인증 상태
  if (lowerCaseMessage.includes('email not confirmed')) {
    return [
      '이메일 인증이 완료되지 않은 계정입니다.',
      '먼저 이메일 인증을 진행해주세요.',
    ];
  }

  // 요청 제한
  if (
    lowerCaseMessage.includes('too many requests') ||
    lowerCaseMessage.includes('rate limit')
  ) {
    return ['요청이 너무 많습니다.', '잠시 후 다시 시도해주세요.'];
  }

  // 네트워크 오류
  if (
    lowerCaseMessage.includes('network') ||
    lowerCaseMessage.includes('connection')
  ) {
    return ['네트워크 연결에 문제가 있습니다.', '인터넷 연결을 확인해주세요.'];
  }

  // 이메일 전송 실패
  if (lowerCaseMessage.includes('email delivery failed')) {
    return [
      '이메일 전송에 실패했습니다.',
      '이메일 주소를 확인하거나 잠시 후 다시 시도해주세요.',
    ];
  }

  // 기타 오류는 그대로 표시하지만 줄바꿈 추가
  return [errorMessage, '다시 시도해주세요.'];
};

/**
 * 비밀번호 재설정 관련 오류 메시지를 사용자 친화적으로 변환
 * @param errorMessage - 서버에서 반환된 오류 메시지
 * @returns 사용자 친화적인 오류 메시지 (배열 형태)
 */
export const getResetPasswordErrorMessage = (
  errorMessage: string,
): string[] => {
  if (!errorMessage) {
    return ['비밀번호 재설정 중 오류가 발생했습니다.', '다시 시도해주세요.'];
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  // 링크 만료
  if (
    lowerCaseMessage.includes('expired') ||
    lowerCaseMessage.includes('invalid token') ||
    lowerCaseMessage.includes('link expired')
  ) {
    return [
      '비밀번호 재설정 링크가 만료되었습니다.',
      '비밀번호 찾기를 다시 진행해주세요.',
    ];
  }

  // 세션 만료
  if (
    lowerCaseMessage.includes('auth session missing') ||
    lowerCaseMessage.includes('no session')
  ) {
    return [
      '인증 세션이 만료되었습니다.',
      '비밀번호 찾기를 다시 진행해주세요.',
    ];
  }

  // 비밀번호 규칙
  if (
    lowerCaseMessage.includes('password') &&
    (lowerCaseMessage.includes('weak') ||
      lowerCaseMessage.includes('strong') ||
      lowerCaseMessage.includes('complex'))
  ) {
    return [
      '비밀번호가 보안 요구사항을 충족하지 않습니다.',
      '영문, 숫자, 특수문자를 모두 포함하여 8자 이상으로 설정해주세요.',
    ];
  }

  // 비밀번호 불일치
  if (lowerCaseMessage.includes('passwords do not match')) {
    return [
      '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      '다시 입력해주세요.',
    ];
  }

  // 이전 비밀번호와 동일
  if (
    lowerCaseMessage.includes('same as old password') ||
    lowerCaseMessage.includes(
      'new password should be different from the old password',
    )
  ) {
    return [
      '이전과 동일한 비밀번호는 사용할 수 없습니다.',
      '다른 비밀번호를 입력해주세요.',
    ];
  }

  // 네트워크 오류
  if (
    lowerCaseMessage.includes('network') ||
    lowerCaseMessage.includes('connection')
  ) {
    return ['네트워크 연결에 문제가 있습니다.', '인터넷 연결을 확인해주세요.'];
  }

  // 기타 오류는 그대로 표시하지만 줄바꿈 추가
  return [errorMessage, '다시 시도해주세요.'];
};

/**
 * 자동 로그인 관련 오류 메시지를 사용자 친화적으로 변환
 * @param errorMessage - 서버에서 반환된 오류 메시지
 * @returns 사용자 친화적인 오류 메시지
 */
export const getAuthStateChangeErrorMessage = (
  errorMessage: string,
): string => {
  if (!errorMessage) {
    return '인증 상태 변경 중 오류가 발생했습니다.';
  }

  const lowerCaseMessage = errorMessage.toLowerCase();

  if (lowerCaseMessage.includes('session expired')) {
    return '세션이 만료되었습니다. 다시 로그인해주세요.';
  }

  if (lowerCaseMessage.includes('network')) {
    return '네트워크 연결에 문제가 있습니다.';
  }

  return errorMessage;
};

// 모든 오류 메시지 함수를 객체로 내보내기
const errorMessages = {
  getLoginErrorMessage,
  getSignupErrorMessage,
  getForgotPasswordErrorMessage,
  getResetPasswordErrorMessage,
  getAuthStateChangeErrorMessage,
};

export default errorMessages;
