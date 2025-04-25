import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plan } from '@/types/plan.type';
import { fetchUpdatePlan } from '@/lib/apis/plan/plan.api';

/**
 * 일정 업데이트 뮤테이션
 * @param userId - 사용자 ID
 * @returns 일정 업데이트 뮤테이션 훅
 */
export const useUpdatePlanMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedPlan: Plan) => {
      return fetchUpdatePlan(updatedPlan, userId);
    },
    onSuccess: () => {
      // 일정 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });
    },
  });
};
