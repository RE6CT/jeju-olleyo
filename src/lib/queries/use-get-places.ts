import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';

import { CategoryParamType, PlaceResponse } from '@/types/category.type';

import { fetchGetPlacesByCategory } from '../apis/category/get-place';

/**
 * 클라이언트 컴포넌트에서 카테고리별 장소 데이터를 무한 스크롤로 조회하는 훅
 * @param category - 조회할 카테고리 타입
 * @returns 인피니트 쿼리 결과
 */
export const useGetPlacesByCategoryInfiniteQuery = (
  category: CategoryParamType,
) => {
  return useInfiniteQuery(getPlacesByCategoryQueryOptions(category));
};

/**
 * 서버 컴포넌트에서 카테고리별 장소 데이터를 미리 가져오는 함수
 * @param queryClient - React Query 클라이언트 인스턴스
 * @param category - 조회할 카테고리 타입
 * @returns 프리페치 작업 결과
 */
export const usePrefetchPlacesByCategory = async (
  queryClient: QueryClient,
  category: CategoryParamType,
) => {
  if (!category) {
    console.warn('유효하지 않은 카테고리입니다');
    return;
  }

  await queryClient.prefetchInfiniteQuery(
    getPlacesByCategoryQueryOptions(category),
  );
};

/**
 * 카테고리별 장소 데이터 쿼리를 위한 공통 설정 정의
 * @param category - 조회할 카테고리 타입
 * @returns 인피니트 쿼리 설정 객체
 */
const getPlacesByCategoryQueryOptions = (category: CategoryParamType) => ({
  queryKey: ['places', category] as const,
  queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
    fetchGetPlacesByCategory(category, pageParam),
  getNextPageParam: (lastPage: PlaceResponse, allPages: PlaceResponse[]) => {
    if (!lastPage) return undefined;

    const { data, count } = lastPage;
    const pageSize = 16;
    const currentCount = allPages.length * pageSize;

    // count가 null이거나 데이터가 더 이상 없는 경우
    if (count === null || !data || data.length === 0 || currentCount >= count) {
      return undefined;
    }

    // 다음 페이지 번호 반환
    return allPages.length;
  },
  initialPageParam: 0,
});
