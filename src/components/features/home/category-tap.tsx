'use client';

import { cn } from '@/lib/utils';
import { useCategoryNavigation } from '@/zustand/home.category.store';
import { CategoryTabsProps, TravelCategory } from '@/types/home.categoty.type';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 * 작은 크기의 왼쪽 정렬된 카테고리 탭으로 구현
 */
const CategoryTabs = ({ className }: CategoryTabsProps) => {
  const { activeCategory, navigateToCategory } = useCategoryNavigation();
  const categories: TravelCategory[] = [
    '전체',
    '명소',
    '숙박',
    '맛집',
    '카페',
    '항공',
  ];

  return (
    <div className={cn('flex w-auto border-gray-200 bg-white', className)}>
      <div className="mx-auto flex md:mx-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => navigateToCategory(category)}
            className={cn(
              'px-4 py-2 text-base transition-all',
              activeCategory === category
                ? 'border-b-2 border-black text-black'
                : 'text-gray-600 hover:text-gray-800',
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
