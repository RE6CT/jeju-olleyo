'use client';

import { cn } from '@/lib/utils';
import { useCategoryNavigation } from '@/lib/hooks/use-category-navigation';
import { CategoryTabsProps } from '@/types/home.categoty.type';
import { CATEGORIES } from '@/constants/home.constants';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 * @param className 추가 할 css
 * 이미지와 텍스트가 포함된 카테고리 탭으로 구현
 */
const CategoryTabs = ({ className }: CategoryTabsProps) => {
  const { activeCategory, navigateToCategory } = useCategoryNavigation();

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case '전체':
        return (
          <img
            src="/icons/all.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case '명소':
        return (
          <img
            src="/public/icons/toursite.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case '숙박':
        return (
          <img
            src="/icons/accomodation.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case '맛집':
        return (
          <img
            src="/icons/restaurant.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case '카페':
        return (
          <img
            src="/icons/cafe.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
      case '항공권':
        return (
          <img
            src="/icons/flight.svg"
            width={20}
            height={20}
            className="h-5 w-5"
          />
        );
    }
  };

  return (
    <div
      className={cn('w-full border-b border-gray-200 bg-white px-4', className)}
    >
      <div className="flex overflow-x-auto py-2 pl-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => navigateToCategory(category)}
            className={cn(
              'mr-6 flex min-w-fit items-center transition-all',
              activeCategory === category
                ? 'font-medium text-orange-500'
                : 'text-gray-600 hover:text-gray-800',
            )}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            <div
              className={cn(
                'mr-2 flex items-center justify-center rounded-full p-2',
              )}
            >
              {getCategoryIcon(category)}
            </div>
            <span className="text-sm">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
