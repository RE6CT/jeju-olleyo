import { CategoryBadgeProps } from '@/types/category-badge.type';

/**
 * 사용 예시
 * <CategoryBadge category="전체" styleType="filled-orange" />
 * <CategoryBadge category="카페" styleType="outline-orange" />
 * <CategoryBadge category="숙박" styleType="outline-teal" />
 *
 */
const CategoryBadge = ({
  category,
  styleType = 'filled-orange',
  className = '',
}: CategoryBadgeProps) => {
  const baseClass = 'text-sm px-5 py-1 border flex items-center justify-center';

  const styles = {
    'filled-orange':
      'bg-primary-100 text-primary-500 border border-primary-500 rounded-[28px]',
    'outline-orange':
      'bg-transparent text-primary-500 border border-primary-500 rounded-[10px]',
    'outline-teal':
      'bg-transparent text-secondary-300 border border-secondary-300 rounded-[10px]',
  };

  return (
    <span className={`${baseClass} ${styles[styleType]} ${className}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;
