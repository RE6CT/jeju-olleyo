'use client';

import { memo, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import useCategoryNavigation from '@/lib/hooks/use-category-navigation';
import { CategoryTabsProps } from '@/types/home.category.type';
import { CATEGORIES } from '@/constants/home.constants';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 *
 * @description 카테고리 탭을 통해 사용자가 다른 카테고리로 이동할 수 있도록 합니다.
 * 최적화를 위해 React.memo와 useCallback을 사용하여 불필요한 리렌더링을 방지합니다.
 *
 * @param className 추가할 CSS 클래스
 */
const CategoryTabs = memo(({ className }: CategoryTabsProps) => {
  const { activeCategory, navigateToCategory } = useCategoryNavigation();

  // 카테고리별 아이콘 매핑 - useMemo로 최적화
  const categoryIconMap = useMemo(
    () => ({
      전체: 'all',
      명소: 'toursite',
      숙박: 'accommodation',
      맛집: 'restaurant',
      카페: 'cafe',
      항공권: 'flight',
    }),
    [],
  );

  // 카테고리 아이콘을 가져오는 함수 - useCallback으로 최적화
  const getCategoryIcon = useCallback(
    (category: string) => {
      const iconName =
        categoryIconMap[category as keyof typeof categoryIconMap];
      if (!iconName) return null;

      return (
        <img
          src={`/icons/${iconName}.svg`}
          alt={category}
          className="h-4 w-4 sm:h-5 sm:w-5"
          loading="eager" // 빠른 로딩을 위해 즉시 로드
          width={20}
          height={20}
        />
      );
    },
    [categoryIconMap],
  );

  // 카테고리 버튼 클릭 핸들러 생성 - 성능 최적화
  const createCategoryClickHandler = useCallback(
    (category: string) => {
      return () => navigateToCategory(category as any);
    },
    [navigateToCategory],
  );

  return (
    <div
      className={cn(
        'w-full border-b border-gray-200 bg-white px-2 sm:px-4',
        className,
      )}
    >
      <div className="flex overflow-x-auto py-2 pl-1 sm:pl-2">
        {CATEGORIES.map((category, index) => (
          <div key={category} className="flex items-center">
            {/* 구분선 - 카페와 항공권 사이에만 표시 */}
            {index > 0 && category === '항공권' && (
              <div className="mx-1 h-5 w-px bg-gray-300 sm:mx-2 sm:h-6"></div>
            )}
            <button
              onClick={createCategoryClickHandler(category)}
              className={cn(
                'mr-3 flex items-center border-b-2 transition-all sm:mr-6',
                activeCategory === category
                  ? 'border-primary-500 text-black'
                  : 'border-transparent text-gray-600 hover:text-gray-800',
              )}
              aria-current={activeCategory === category ? 'page' : undefined}
            >
              <div className="mr-1 flex items-center justify-center rounded-full p-1 sm:mr-2 sm:p-2">
                {getCategoryIcon(category)}
              </div>
              <span className="text-xs sm:text-sm">{category}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

// 개발 환경에서 컴포넌트 이름 표시 (디버깅 도움)
CategoryTabs.displayName = 'CategoryTabs';

export default CategoryTabs;
