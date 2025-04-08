import { TravelCategory } from '@/types/home.categoty.type';

/**
 * 카테고리와 해당 라우트 경로 매핑
 */
export const CATEGORY_ROUTES: Record<TravelCategory, string> = {
  전체: '/all',
  명소: '/attractions',
  숙박: '/accommodations',
  맛집: '/restaurants',
  카페: '/cafes',
  항공: '/flights',
};
