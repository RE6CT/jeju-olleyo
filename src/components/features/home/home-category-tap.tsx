'use client';

import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import useCategoryNavigation from '@/lib/hooks/use-category-navigation';
import { CategoryTabsProps, TravelCategory } from '@/types/home.category.type';
import { CATEGORIES, CATEGORY_ROUTES } from '@/constants/home.constants';

/**
 * 여행 관련 카테고리를 선택할 수 있는 탭 컴포넌트
 *
 * @description 카테고리 탭을 통해 사용자가 다른 카테고리로 이동할 수 있도록 합니다.
 * 최적화를 위해 React.memo와 useCallback을 사용하여 불필요한 리렌더링을 방지합니다.
 * 항공권 카테고리는 구분선 뒤에 별도의 링크로 표시됩니다.
 * 전체 컴포넌트 길이는 508px, 각 탭의 크기는 60x24px입니다.
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
          className="h-4 w-4"
          loading="eager"
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
      return () => navigateToCategory(category as TravelCategory);
    },
    [navigateToCategory],
  );

  return (
    <div
      className={cn(
        'flex items-center border-b border-gray-200 bg-white p-2.5 px-9',
        className,
      )}
    >
      <div className="flex items-center gap-x-4">
        {/* 메인 카테고리 탭 - 첫 번째 이미지에서 보이는 순서대로 배치 */}
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={createCategoryClickHandler(category)}
            className={cn(
              'flex items-center justify-center border-b-2 transition-all',
              activeCategory === category
                ? 'border-primary-500 text-gray-600'
                : 'border-transparent text-gray-600 hover:text-gray-800',
            )}
            style={{ width: '60px', height: '24px' }}
            aria-current={activeCategory === category ? 'page' : undefined}
          >
            <div className="flex items-center">
              <span className="mr-1">{getCategoryIcon(category)}</span>
              <span className="semibold-16">{category}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 구분선 - 독립적으로 배치하고 양쪽에 16px 간격 */}
      <div className="mx-4 h-5 w-px bg-gray-300"></div>

      {/* 항공권 링크 - 구분선과 분리하여 배치 */}
      <Link
        href={CATEGORY_ROUTES.항공권}
        className={cn(
          'flex items-center justify-center border-b-2 transition-all',
          activeCategory === '항공권'
            ? 'border-primary-500 text-gray-600'
            : 'border-transparent text-gray-600 hover:text-gray-800',
        )}
        style={{ width: '70px', height: '24px' }}
      >
        <div className="flex items-center">
          <span className="mr-1">{getCategoryIcon('항공권')}</span>
          <span className="semibold-16">항공권</span>
        </div>
      </Link>
    </div>
  );
});

// 개발 환경에서 컴포넌트 이름 표시 (디버깅 도움)
CategoryTabs.displayName = 'CategoryTabs';

export default CategoryTabs;
