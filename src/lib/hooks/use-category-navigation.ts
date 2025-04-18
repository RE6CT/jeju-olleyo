'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { CATEGORY_ROUTES } from '@/constants/home.constants';
import { TravelCategory } from '@/types/home.category.type';
import useCategoryStore from '@/zustand/home.category.store';

/**
 * 카테고리 상태와 라우팅을 함께 관리하는 훅
 * 최적화된 네비게이션 기능을 제공합니다.
 *
 * @returns {Object} 카테고리 상태와 네비게이션 함수를 포함한 객체
 */
const useCategoryNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeCategory, setActiveCategory } = useCategoryStore();

  // 카테고리 항목을 메모이제이션하여 불필요한 재계산 방지
  const categoryEntries = useMemo(() => Object.entries(CATEGORY_ROUTES), []);

  // URL 경로에 따라 활성화된 카테고리 업데이트
  useEffect(() => {
    // URL 경로를 기반으로 현재 활성화된 카테고리 찾기
    const currentPath = pathname || '/';

    // 홈페이지인 경우 null로 설정하여 아무 카테고리도 활성화하지 않음
    if (currentPath === '/') {
      setActiveCategory(null);
      return;
    }

    // 정확한 경로 일치 검색
    const exactMatch = categoryEntries.find(
      ([_, route]) => route === currentPath,
    )?.[0] as TravelCategory | undefined;

    if (exactMatch) {
      setActiveCategory(exactMatch);
      return;
    }

    // 부분 경로 일치 검색 (예: /attractions/123 -> '명소' 카테고리로 매핑)
    for (const [category, route] of categoryEntries) {
      if (route !== '/categories/all' && currentPath.startsWith(route)) {
        setActiveCategory(category as TravelCategory);
        return;
      }
    }
  }, [pathname, setActiveCategory, categoryEntries]);

  // 카테고리 변경 및 해당 페이지로 이동 (최적화)
  const navigateToCategory = useCallback(
    (category: TravelCategory) => {
      if (category === null) return;

      setActiveCategory(category);
      // 부드러운 전환 처리를 위해 setTimeout 사용
      setTimeout(() => {
        router.push(CATEGORY_ROUTES[category as Exclude<TravelCategory, null>]);
      }, 0);
    },
    [router, setActiveCategory],
  );

  return {
    activeCategory,
    setActiveCategory,
    navigateToCategory,
  };
};

export default useCategoryNavigation;
