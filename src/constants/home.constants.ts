import { TravelCategory } from '@/types/home.category.type';

/**
 * 카테고리와 해당 라우트 경로 매핑
 */
export const CATEGORY_ROUTES: Record<TravelCategory, string> = {
  전체: '/categories/all',
  명소: '/categories/toursite',
  숙박: '/categories/accomodation',
  맛집: '/categories/restaurant',
  카페: '/categories/cafe',
  항공권: '/categories/flight',
};

export const CATEGORIES: TravelCategory[] = [
  '전체',
  '명소',
  '숙박',
  '맛집',
  '카페',
  '항공권',
];

export const QUERY_KEYS = {
  MAIN_CAROUSEL_IMAGE: ['MAIN_CAROUSEL_IMAGE'],
  STRIP_BANNERS: ['STRIP_BANNERS'],
};

/**
 * 메인 캐러셀 옵션 상수
 */
export const MAIN_CAROUSEL_OPTIONS = {
  /** 자동 롤링 시간 (ms) */
  AUTO_ROLLING_TIME: 5000,
  /** 이미지 원본 너비 */
  WIDTH: 1890,
  /** 이미지 원본 높이 */
  HEIGHT: 340,
  /** 네비게이션 아이콘 크기 */
  NAVIGATION_ICON_SIZE: 96,
  /** 네비게이션 아이콘 두께 */
  NAVIGATION_ICON_STROKE_WIDTH: 4,
};
