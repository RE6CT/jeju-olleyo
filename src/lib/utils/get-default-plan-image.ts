import { DEFAULT_IMAGES } from '@/constants/plan.constants';

/**
 * 일정/장소의 기본 이미지를 반환하는 함수
 * @param id - 장소의 ID (선택적)
 * @returns {string} 기본 이미지 URL
 */
export const getDefaultPlanOrPlaceImage = (id?: number) => {
  if (id === undefined) {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
    return DEFAULT_IMAGES[randomIndex];
  }

  // ID를 기반으로 일관된 이미지 선택
  const index = id % DEFAULT_IMAGES.length;
  return DEFAULT_IMAGES[index];
};
