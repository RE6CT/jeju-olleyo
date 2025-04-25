import { DEFAULT_IMAGES } from '@/constants/plan.constants';
/**
 * 일정의 기본 이미지를 랜덤하게 반환하는 함수
 * @returns {string} 기본 이미지 URL
 */
export const getDefaultPlanImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
  return DEFAULT_IMAGES[randomIndex];
};
