// 에러 메시지 상수
export const ERROR_MESSAGES = {
  USER_DATA_MISSING: '사용자 정보가 없습니다.',
  NICKNAME_UPDATE_FAILED: '닉네임 변경 중 오류가 발생했습니다.',
  NICKNAME_DATA_MISSING: '닉네임 데이터가 전달되지 않았습니다.',
  NICKNAME_DUPLICATE: '이미 사용중인 닉네임입니다.',
  PROFILE_UPDATE_FAILED: '프로필 이미지 변경 중 오류가 발생했습니다.',
  IMAGE_DATA_MISSING: '이미지가 선택되지 않았습니다.',
  USER_UPDATE_FAILED: '사용자 정보 업데이트 중 오류가 발생했습니다.',
  PHONE_UPDATE_FAILED: '휴대폰 번호 변경 중 오류가 발생했습니다.',
  PHONE_DATA_MISSING: '휴대폰 번호 데이터가 전달되지 않았습니다.',
  PHONE_DUPLICATE: '이미 사용중인 번호입니다.',
  PASSWORD_UPDATE_FAILED: '비밀번호 변경 중 오류가 발생했습니다.',
  PASSWORD_INVALID: '현재 비밀번호가 올바르지 않습니다.',
};

export const SUCCESS_MESSAGES = {
  NICKNAME_UPDATED: '닉네임이 변경되었습니다.',
  PROFILE_UPDATED: '프로필 이미지가 변경되었습니다.',
  PHONE_UPDATED: '휴대폰 번호가 변경되었습니다.',
  PASSWORD_UPDATED: '비밀번호가 변경되었습니다.',
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
