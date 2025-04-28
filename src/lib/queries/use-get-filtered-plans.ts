'use client';

import { useQuery } from '@tanstack/react-query';

import { PUBLIC_OPTIONS } from '@/constants/plan.constants';
import {
  fetchGetAllPlansByUserId,
  fetchGetFilteredPlansByUserId,
} from '@/lib/apis/plan/plan.api';

/**
 * 필터링된 여행 계획 목록을 가져오는 React Query 훅
 * @param userId - 사용자 ID
 * @param filters - 필터 상태 (키워드, 날짜, 공개상태)
 * @returns 필터링된 여행 계획 목록과 쿼리 상태
 *
 * @example
 * ```typescript
 * const { data: plans, isLoading } = useGetFilteredPlans(userId, {
 *   keyword: '제주도',
 *   date: '2024-05-01',
 *   public: 'public'
 * });
 * ```
 */
export const useGetFilteredPlans = (
  userId: string,
  filters: { keyword?: string; date?: string; public?: string },
) => {
  return useQuery({
    queryKey: [
      'filteredPlans',
      userId,
      filters.keyword,
      filters.date,
      filters.public,
    ],
    queryFn: async () => {
      // 필터가 모두 없거나 공개상태가 ALL이면 전체 조회
      if (
        !filters.keyword &&
        !filters.date &&
        (!filters.public || filters.public === PUBLIC_OPTIONS.ALL)
      ) {
        return fetchGetAllPlansByUserId(userId);
      }

      const filterOptions = {
        keyword: filters.keyword,
        date: filters.date,
        isPublic:
          filters.public && filters.public !== PUBLIC_OPTIONS.ALL
            ? filters.public === PUBLIC_OPTIONS.PUBLIC
            : undefined,
      };
      return fetchGetFilteredPlansByUserId(userId, filterOptions);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 데이터 유지
    refetchOnWindowFocus: false, // 탭 전환시 자동 리페치 비활성화
  });
};
