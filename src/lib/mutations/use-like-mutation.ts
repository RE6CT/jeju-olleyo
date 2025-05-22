import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToggleLike from '../hooks/use-like';

/**
 * 좋아요 토글 뮤테이션
 * @returns 좋아요 뮤테이션 데이터
 */
export const useLikesMutation = (planId: number) => {
  const queryClient = useQueryClient();
  const { toggleLike } = useToggleLike(planId);

  return useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
  });
};

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
    queryClient.invalidateQueries({
      queryKey: ['filteredPlans'],
    });
    queryClient.invalidateQueries({
      queryKey: ['plansByPlaceId'],
    });
  };

  return {
    invalidateLikes,
  };
};
