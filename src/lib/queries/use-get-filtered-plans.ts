'use client';

import { useQuery } from '@tanstack/react-query';

import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import {
  fetchGetAllPlansByUserId,
  fetchGetFilteredPlansByUserId,
} from '@/lib/apis/plan/plan.api';
import { FilterState } from '@/types/plan.type';

/**
 * 필터링된 여행 계획 목록을 가져오는 React Query 훅
 * @param userId - 사용자 ID
 * @param filter - 필터 상태 (타입과 값)
 * @returns 필터링된 여행 계획 목록과 쿼리 상태
 *
 * @example
 * ```typescript
 * const { data: plans, isLoading } = useGetFilteredPlans(userId, {
 *   type: 'title',
 *   value: '제주도'
 * });
 * ```
 */
export const useGetFilteredPlans = (userId: string, filter: FilterState) => {
  return useQuery({
    queryKey: ['filteredPlans', userId, filter.type, filter.value],
    queryFn: async () => {
      // 필터가 없거나 ALL인 경우 모든 일정을 가져옴
      if (
        !filter.type ||
        (filter.type === FILTER_TYPES.PUBLIC &&
          filter.value === PUBLIC_OPTIONS.ALL)
      ) {
        return fetchGetAllPlansByUserId(userId);
      }

      const filterOptions = {
        title: filter.type === FILTER_TYPES.TITLE ? filter.value : undefined,
        startDate:
          filter.type === FILTER_TYPES.DATE
            ? filter.value.split('~')[0].trim()
            : undefined,
        endDate:
          filter.type === FILTER_TYPES.DATE
            ? filter.value.split('~')[1].trim()
            : undefined,
        isPublic:
          filter.type === FILTER_TYPES.PUBLIC
            ? filter.value === PUBLIC_OPTIONS.PUBLIC
            : undefined,
      };
      return fetchGetFilteredPlansByUserId(userId, filterOptions);
    },
    enabled: !!userId,
  });
};
