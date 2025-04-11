'use client';

import { cn } from '@/lib/utils';
import useCategoryNavigation from '@/lib/hooks/use-category-navigation';
import { CategoryTabsProps } from '@/types/home.category.type';
import { CATEGORIES } from '@/constants/home.constants';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 * @param className 추가 할 css
 * 이미지와 텍스트가 포함된 카테고리 탭으로 구현
 */
const CategoryTabs = ({ className }: CategoryTabsProps) => {
  const { activeCategory, navigateToCategory } = useCategoryNavigation();

  // 카테고리별 아이콘 매핑
  const categoryIconMap: Record<string, string> = {
    전체: 'all',
    명소: 'toursite',
    숙박: 'accommodation',
    맛집: 'restaurant',
    카페: 'cafe',
    항공권: 'flight',
  };

  const getCategoryIcon = (category: string) => {
    const iconName = categoryIconMap[category];
    if (!iconName) return null;

    return (
      <img
        src={`/icons/${iconName}.svg`}
        width={20}
        height={20}
        className="h-5 w-5"
        alt={category}
      />
    );
  };

  return (
    <div
      className={cn('w-full border-b border-gray-200 bg-white px-4', className)}
    >
      <div className="flex overflow-x-auto py-2 pl-2">
        {CATEGORIES.map((category, index) => (
          <div key={category} className="flex items-center">
            {/* 구분선 - 카페와 항공권 사이에만 표시 */}
            {index > 0 && category === '항공권' && (
              <div className="mx-2 h-6 w-px bg-gray-300"></div>
            )}
            <button
              onClick={() => navigateToCategory(category)}
              className={cn(
                'mr-6 flex min-w-fit items-center border-b-2 transition-all',
                activeCategory === category
                  ? 'border-primary-500 text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-800',
              )}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              <div className="mr-2 flex items-center justify-center rounded-full p-2">
                {getCategoryIcon(category)}
              </div>
              <span className="text-sm">{category}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
