/**
 * 프로필 이미지가 null일 경우 기본 프로필 이미지를 띄우는 함수
 * @param image - 이미지 문자열
 * @returns 이미지 문자열 존재할 경우 해당 문자열, 아닐 경우 /default_profile.svg
 */
export const getProfileImageWithFallback = (image: string | null): string => {
  return image ? image : '/images/default_profile.svg';
};

/**
 * 장소 이미지가 null일 경우 기본 이미지를 띄우는 함수
 * @param image - 이미지 문자열
 * @returns 이미지 문자열 존재할 경우 해당 문자열, 아닐 경우 /default_place_image.svg
 */
export const getPlaceImageWithFallback = (image: string | null): string => {
  return image ? image : '/images/default_place_image.svg';
};

/**
 * 일정 이미지가 null일 경우 기본 이미지를 띄우는 함수
 * @param image - 이미지 문자열
 * @returns 이미지 문자열 존재할 경우 해당 문자열, 아닐 경우 /default_plan_image.svg
 */
export const getPlanImageWithFallback = (image: string | null): string => {
  return image ? image : '/images/default_plan_image.svg';
};
