/**
 * 여행 관련 카테고리 탭 옵션 타입
 */
export type TravelCategory =
  | '전체'
  | '명소'
  | '숙박'
  | '맛집'
  | '카페'
  | '항공권';

/**
 *  활성화 카테고리 탭 타입
 */
export type CategoryState = {
  activeCategory: TravelCategory;
  setActiveCategory: (category: TravelCategory) => void;
};

/**
 * 여행 카테고리 탭 컴포넌트 Props
 * @property {string} className - 추가 스타일링을 위한 클래스명
 */
export type CategoryTabsProps = {
  className?: string;
};
