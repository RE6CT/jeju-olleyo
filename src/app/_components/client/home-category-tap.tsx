'use client';

import Link from 'next/link';
import { memo, useCallback, useMemo } from 'react';

import { CATEGORIES, CATEGORY_ROUTES } from '@/constants/home.constants';
import useCategoryNavigation from '@/lib/hooks/use-category-navigation';
import { cn } from '@/lib/utils';
import { CategoryTabsProps, TravelCategory } from '@/types/home.category.type';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 * @description 카테고리 탭을 통해 사용자가 다른 카테고리로 이동할 수 있도록 합니다.
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
          className="h-9 w-9 md:h-6 md:w-6"
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
    <div
      className={cn(
        'flex w-full items-center justify-between px-4 md:justify-start md:gap-6 md:bg-white md:px-9',
        className,
      )}
    >
      {/* 메인 카테고리 탭 */}
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={createCategoryClickHandler(category)}
          className={cn(
            'flex flex-col items-center justify-center gap-2 border-b-2 py-2.5 transition-all md:flex-row',
            activeCategory === category
              ? 'border-primary-500 text-gray-600'
              : 'border-transparent text-gray-600 hover:text-gray-800',
          )}
          aria-current={activeCategory === category ? 'page' : undefined}
        >
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-12 bg-white md:h-fit md:w-fit md:bg-transparent">
            {getCategoryIcon(category)}
          </div>
          <span className="medium-12 md:semibold-16 whitespace-nowrap">
            {category}
          </span>
        </button>
      ))}

      {/* 구분선 */}
      <div className="mx-1 hidden h-5 w-px bg-gray-300 md:block"></div>

      {/* 항공권 링크 */}
      <Link
        href={CATEGORY_ROUTES.항공권}
        className={cn(
          'flex flex-col items-center justify-center gap-2 border-b-2 py-2.5 transition-all md:flex-row',
          activeCategory === '항공권'
            ? 'border-primary-500 text-gray-600'
            : 'border-transparent text-gray-600 hover:text-gray-800',
        )}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-12 bg-white md:h-fit md:w-fit md:bg-transparent">
          {getCategoryIcon('항공권')}
        </div>
        <span className="medium-12 md:semibold-16 whitespace-nowrap">
          항공권
        </span>
      </Link>
    </div>
  );
});

CategoryTabs.displayName = 'CategoryTabs';

export default CategoryTabs;
