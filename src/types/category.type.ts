export type CardBadgeVariant = 'primary' | 'secondary';

export type CategoryParamType =
  | 'all'
  | 'toursite'
  | 'restaurant'
  | 'cafe'
  | 'accommodation';
export type CategoryType = '전체' | '명소' | '맛집' | '카페' | '숙박';
export type RegionType = '전체' | '제주시' | '서귀포시';

export type BadgeType = 'filter' | 'modal' | 'card' | 'page';

export type CategoryBadgeProps = {
  category: CategoryType;
  badgeType?: BadgeType; // 뱃지 유형: filter / modal / card
  selected?: boolean; // filter (필터칩바 중에서도 Gray-600 처리된 것을 위해서)
  variant?: CardBadgeVariant; // 일정 카드 내 뱃지 컬러 -> primary, secondary로 나뉨
  className?: string;
};

/** 장소 타입 */
export type PlaceType = {
  category: string;
  image: string | null;
  placeId: number;
  title: string;
  address: string;
  isBookmarked: boolean;
};

/** 쿼리 함수 응답 타입 */
export type PlaceResponse = {
  data: PlaceType[] | null;
  count: number | null;
};

/** 옵티미스틱 업데이트에 사용되는 페이지 포함 타입 */
export type InfinitePlaceData = {
  pages: PlaceResponse[];
  pageParams: unknown[];
};
