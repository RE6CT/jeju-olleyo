import { useQueryClient } from '@tanstack/react-query';

/** 좋아요 관련 쿼리 무효화를 위한 커스텀 훅 */
export const useInvalidateLikes = () => {
  const queryClient = useQueryClient();

  // 모든 인기 계획 쿼리 무효화 및
  const invalidateLikes = () => {
    queryClient.invalidateQueries({
      queryKey: ['popularPlans'],
    });
    queryClient.invalidateQueries({
      queryKey: ['dataCount'],
    });
  };

  return {
    invalidateLikes,
  };
};
