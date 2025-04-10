export type BadgeStyle = 'filled-orange' | 'outline-orange' | 'outline-teal';

export type CategoryBadgeProps = {
  category: '전체' | '명소' | '맛집' | '카페' | '숙박';
  styleType?: BadgeStyle;
  className?: string;
};
