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

export const CATEGORY_KR_MAP: Record<string, TravelCategory> = {
  all: '전체',
  toursite: '명소',
  accomodation: '숙박',
  restaurant: '맛집',
  cafe: '카페',
  flight: '항공권',
};

/**
 * 메인 카테고리 (항공권 제외)
 */
export const CATEGORIES: TravelCategory[] = [
  '전체',
  '명소',
  '숙박',
  '맛집',
  '카페',
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
  WIDTH: 1024,
  /** 이미지 원본 높이 */
  HEIGHT: 340,
  /** 네비게이션 아이콘 크기 */
  NAVIGATION_ICON_SIZE: 48,
  /** 네비게이션 아이콘 두께 */
  NAVIGATION_ICON_STROKE_WIDTH: 2,
};
