import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeletePlan } from '../apis/plan/plan.api';
import useCustomToast from '../hooks/use-custom-toast';

interface DeletePlanOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 일정을 삭제하는 React Query 훅
 * @param userId - 사용자 ID
 * @returns 일정 삭제 뮤테이션 객체
 *
 * @example
 * ```typescript
 * const { mutate: deletePlan } = useDeletePlan(userId);
 * deletePlan(planId, {
 *   onSuccess: () => {
 *     // 삭제 성공 시 실행할 로직
 *   },
 *   onError: (error) => {
 *     // 삭제 실패 시 실행할 로직
 *   }
 * });
 * ```
 */
export const useDeletePlan = (userId: string) => {
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  return useMutation({
    mutationFn: fetchDeletePlan,
    onSuccess: (_, __, options: DeletePlanOptions) => {
      // 일정 목록 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });
      successToast('일정이 삭제되었습니다.');
      options?.onSuccess?.();
    },
    onError: (error: Error, __, context: DeletePlanOptions | undefined) => {
      successToast(error.message || '일정 삭제에 실패했습니다.');
      context?.onError?.(error);
    },
  });
};
