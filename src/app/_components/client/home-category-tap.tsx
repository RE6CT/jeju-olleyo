'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';

import { CATEGORIES, CATEGORY_ROUTES } from '@/constants/home.constants';
import useCategoryNavigation from '@/lib/hooks/use-category-navigation';
import { cn } from '@/lib/utils';
import { CategoryTabsProps, TravelCategory } from '@/types/home.category.type';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 *
 * @description 카테고리 탭을 통해 사용자가 다른 카테고리로 이동할 수 있도록 합니다.
 * 최적화를 위해 React.memo와 useCallback을 사용하여 불필요한 리렌더링을 방지합니다.
 * 항공권 카테고리는 구분선 뒤에 별도의 링크로 표시됩니다.
 * 아이콘 크기는 24x24px, 탭 간 간격은 16px, 양쪽 패딩은 36px입니다.
 * 텍스트는 semibold-16 스타일을 적용합니다.
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
          className="h-6 w-6"
          width={24}
          height={24}
          loading="eager"
        />
      );
    },
    [categoryIconMap],
  );

  // 카테고리 버튼 클릭 핸들러 생성 - 성능 최적화
  const createCategoryClickHandler = useCallback(
    (category: string) => {
      return () =>
        navigateToCategory(category as Exclude<TravelCategory, null>);
    },
    [navigateToCategory],
  );

  return (
    <div className={cn('flex items-center bg-white px-9', className)}>
      <div className="flex items-center gap-x-4">
        {/* 메인 카테고리 탭 */}
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={createCategoryClickHandler(category)}
            className={cn(
              'flex items-center justify-center gap-2 py-2.5',
              activeCategory === category
                ? 'text-primary-500'
                : 'text-gray-600 hover:text-gray-800',
            )}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            {getCategoryIcon(category)}
            <span className="text-base font-semibold">{category}</span>
          </button>
        ))}
      </div>

      {/* 구분선 */}
      <div className="mx-4 h-5 w-px bg-gray-300"></div>

      {/* 항공권 링크 */}
      <Link
        href={CATEGORY_ROUTES.항공권}
        className={cn(
          'flex items-center justify-center gap-2 py-2.5',
          activeCategory === '항공권'
            ? 'text-primary-500'
            : 'text-gray-600 hover:text-gray-800',
        )}
      >
        {getCategoryIcon('항공권')}
        <span className="text-base font-semibold">항공권</span>
      </Link>
    </div>
  );
});

CategoryTabs.displayName = 'CategoryTabs';

export default CategoryTabs;
