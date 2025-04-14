import { useQuery } from '@tanstack/react-query';
import { fetchAllPlans } from '@/lib/apis/home/home.popular.api';
import { PlanType } from '@/types/plan.type';

/**
 * 인기 일정을 가져오는 쿼리 훅
 *
 * @param userId - 사용자 ID
 * @param limit - 가져올 일정 수
 * @returns 일정 데이터와 로딩 상태
 */
export const usePopularPlans = (userId: string | null, limit = 6) => {
  return useQuery<PlanType[]>({
    queryKey: ['popularPlans', userId, limit],
    queryFn: () => fetchAllPlans(userId, limit),
    staleTime: 60 * 60 * 1000, // 1시간 동안 캐시 유지
    refetchInterval: 60 * 60 * 1000, // 1시간마다 자동으로 리페치
    gcTime: 2 * 60 * 60 * 1000, // 2시간 동안 캐시 데이터 유지
    refetchOnWindowFocus: false,
  });
};
