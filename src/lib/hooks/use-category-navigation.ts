import { CATEGORY_ROUTES } from "@/constants/home.constants";
import { TravelCategory } from "@/types/home.categoty.type";
import useCategoryStore from "@/zustand/home.category.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * 카테고리 상태와 라우팅을 함께 관리하는 훅
 * 컴포넌트에서 사용하기 위한 편의 함수
 */
export const useCategoryNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeCategory, setActiveCategory } = useCategoryStore();

  // URL 경로에 따라 활성화된 카테고리 업데이트
  useEffect(() => {
    // URL 경로를 기반으로 현재 활성화된 카테고리 찾기
    const currentPath = pathname || '/';

    // 홈페이지인 경우 활성 카테고리를 설정하지 않음 (전체가 선택된 상태로 유지)
    if (currentPath === '/') {
      return;
    }

    // 정확한 경로 일치 검색
    const exactMatch = Object.entries(CATEGORY_ROUTES).find(
      ([_, route]) => route === currentPath,
    )?.[0] as TravelCategory | undefined;

    if (exactMatch) {
      setActiveCategory(exactMatch);
      return;
    }

    // 부분 경로 일치 검색 (예: /attractions/123 -> '명소' 카테고리로 매핑)
    for (const [category, route] of Object.entries(CATEGORY_ROUTES)) {
      if (route !== '/all' && currentPath.startsWith(route)) {
        setActiveCategory(category as TravelCategory);
        return;
      }
    }
  }, [pathname, setActiveCategory]);

  // 카테고리 변경 및 해당 페이지로 이동
  const navigateToCategory = (category: TravelCategory) => {
    setActiveCategory(category);
    router.push(CATEGORY_ROUTES[category]);
  };

  return {
    activeCategory,
    setActiveCategory,
    navigateToCategory,
  };
};
