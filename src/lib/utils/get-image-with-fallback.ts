/**
 * 프로필 이미지가 null일 경우 기본 프로필 이미지를 띄우는 함수
 * @param image - 이미지 문자열
 * @returns 이미지 문자열 존재할 경우 해당 문자열, 아닐 경우 /default-profile.png
 */
export const getProfileImageWithFallback = (image: string | null): string => {
  return image ? image : '/images/default-profile.png';
};

/**
 * 이미지가 null일 경우 기본 이미지를 띄우는 함수
 * @param image - 이미지 문자열
 * @returns 이미지 문자열 존재할 경우 해당 문자열, 아닐 경우 /default-image.png
 */
export const getImageWithFallback = (image: string | null): string => {
  return image ? image : '/images/default-image.png';
};
