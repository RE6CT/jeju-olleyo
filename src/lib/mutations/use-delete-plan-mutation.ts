import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchDeletePlan } from '../apis/plan/plan.api';
import { useToast } from '@/hooks/use-toast';
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
export const useDeletePlanMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: fetchDeletePlan,
    onSuccess: () => {
      // 일정 목록 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });
      toast({
        title: '일정 삭제 완료',
        description: '일정이 성공적으로 삭제되었습니다.',
      });
    },
    onError: (error: Error, __) => {
      toast({
        title: '일정 삭제 실패',
        description: error.message || '일정 삭제에 실패했습니다.',
        variant: 'destructive',
      });
    },
  });
};
