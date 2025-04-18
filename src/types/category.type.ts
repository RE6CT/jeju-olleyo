export type CardBadgeVariant = 'primary' | 'secondary';

export type CategoryParamType =
  | 'all'
  | 'toursite'
  | 'restaurant'
  | 'cafe'
  | 'accommodation';
export type CategoryType = '전체' | '명소' | '맛집' | '카페' | '숙박';

export type BadgeType = 'filter' | 'modal' | 'card';

export type CategoryBadgeProps = {
  category: CategoryType;
  badgeType?: BadgeType; // 뱃지 유형: filter / modal / card
  selected?: boolean; // filter (필터칩바 중에서도 Gray-600 처리된 것을 위해서)
  variant?: CardBadgeVariant; // 일정 카드 내 뱃지 컬러 -> primary, secondary로 나뉨
  className?: string;
};

/** 장소 타입 */
export type PlaceType = {
  address: string;
  category: string;
  contentTypeId: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  placeId: number;
  title: string;
};

/** 쿼리 함수 응답 타입 */
export type PlaceResponse = {
  data: PlaceType[];
  count: number | null;
};
