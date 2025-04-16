import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeletePlan } from '../apis/plan/plan.api';
import useCustomToast from '../hooks/use-custom-toast';

/**
 * 일정을 삭제하는 React Query 훅
 * @returns 일정 삭제 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const { mutate: deletePlan } = useDeletePlan();
 * deletePlan(planId);
 * ```
 */
export const useDeletePlan = (userId: string) => {
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  return useMutation({
    mutationFn: fetchDeletePlan,
    onSuccess: () => {
      // 일정 목록 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });
      successToast('일정이 삭제되었습니다.');
    },
    onError: (error: Error) => {
      successToast(error.message || '일정 삭제에 실패했습니다.');
    },
  });
};
