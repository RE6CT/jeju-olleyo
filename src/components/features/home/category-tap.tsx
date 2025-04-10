'use client';

import { cn } from '@/lib/utils';
import { useCategoryNavigation } from '@/lib/hooks/use-category-navigation';
import { CategoryTabsProps } from '@/types/home.categoty.type';
import { CATEGORIES } from '@/constants/home.constants';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 * @param className 추가 할 css
 * 작은 크기의 왼쪽 정렬된 카테고리 탭으로 구현
 */
const CategoryTabs = ({ className }: CategoryTabsProps) => {
  const { activeCategory, navigateToCategory } = useCategoryNavigation();

  return (
    <div className={cn('flex w-auto border-gray-200 bg-white', className)}>
      <div className="mx-auto flex md:mx-0">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => navigateToCategory(category)}
            className={cn(
              'border-b-2 px-4 py-2 text-base transition-all',
              activeCategory === category
                ? 'border-black text-black'
                : 'border-transparent text-gray-600 hover:text-gray-800',
            )}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
