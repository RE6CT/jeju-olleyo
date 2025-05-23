import { CategoryBadgeProps } from '@/types/category.type';

const getStyleByBadgeType = (
  badgeType: 'filter' | 'modal' | 'card' | 'page',
  selected: boolean,
  variant?: 'primary' | 'secondary',
): string => {
  switch (badgeType) {
    case 'filter':
      return selected
        ? 'bg-primary-100 text-primary-500 border border-primary-500'
        : 'bg-transparent text-gray-600 border-[0.6px] border-gray-600';
    case 'modal':
      return 'bg-transparent text-secondary-300 border border-secondary-300';
    case 'card':
      return variant === 'primary'
        ? 'bg-transparent text-primary-500 border-[0.5px] border-primary-500'
        : 'bg-transparent text-secondary-300 border-[0.5px] border-secondary-300';
    case 'page':
      return 'text-white';
    default:
      return '';
  }
};

const getLayoutByBadgeType = (
  badgeType: 'filter' | 'modal' | 'card' | 'page',
) => {
  switch (badgeType) {
    case 'filter':
      return 'px-5 py-2 rounded-[28px]';
    case 'modal':
      return 'px-4 py-2 rounded-[20px]';
    case 'card':
      return 'px-2 py-[2px] text-sm h-[20px] rounded-[10px]';
    case 'page':
      return 'px-2 py-[2px] rounded-[10px]';
    default:
      return '';
  }
};

/**
 * 사용 예시
 * <CategoryBadge category="전체" badgeType="filter" selected />
 * <CategoryBadge category="카페" badgeType="modal" />
 * <CategoryBadge category="숙박" badgeType="card" variant="primary" />
 */
const CategoryBadge = ({
  category,
  badgeType = 'filter',
  selected = false,
  variant,
  className = '',
}: CategoryBadgeProps) => {
  const baseClass = 'inline-flex items-center justify-center';

  const styleClass = getStyleByBadgeType(badgeType, selected, variant);
  const layoutClass = getLayoutByBadgeType(badgeType);

  const inlineStyle =
    badgeType === 'page'
      ? { backgroundColor: 'rgba(56, 172, 188, 0.8)' }
      : undefined;

  return (
    <span
      className={`${baseClass} ${styleClass} ${layoutClass} ${className}`}
      style={inlineStyle}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
