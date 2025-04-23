import { TravelCategory } from '@/types/home.category.type';

/**
 * 카테고리와 해당 라우트 경로 매핑
 */
export const CATEGORY_ROUTES: Record<Exclude<TravelCategory, null>, string> = {
  전체: '/categories/all',
  명소: '/categories/toursite',
  숙박: '/categories/accommodation',
  맛집: '/categories/restaurant',
  카페: '/categories/cafe',
  항공권: '/air-ticket',
};

export const CATEGORY_KR_MAP: Record<string, Exclude<TravelCategory, null>> = {
  all: '전체',
  toursite: '명소',
  accommodation: '숙박',
  restaurant: '맛집',
  cafe: '카페',
  flight: '항공권',
};

export const CATEGORY_EN_MAP: Record<Exclude<TravelCategory, null>, string> = {
  전체: 'all',
  명소: 'toursite',
  숙박: 'accommodation',
  맛집: 'restaurant',
  카페: 'cafe',
  항공권: 'flight',
};

/**
 * 메인 카테고리 (항공권 제외)
 */
export const CATEGORIES: Exclude<TravelCategory, null>[] = [
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

/**
 * 일정 만들러가기 배너
 */
export const SCHEDULE_BANNER = {
  SCHEDULE_BANNER_IMAGE_URL: '/banner-images/plan-banner.jpg',
  SCHEDULE_BANNER_TITLE: '나만의 제주 여행 계획하기',
  SCHEDULE_BANNER_BUTTON_TEXT: '내 일정 만들러 가기',
};
