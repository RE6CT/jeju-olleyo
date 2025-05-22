import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToggleLike from '../hooks/use-like';

/**
 * 좋아요 토글 뮤테이션
 * @returns 좋아요 뮤테이션 데이터
 */
export const useLikesMutation = (
  planId: number,
  userId: string | undefined,
) => {
  const queryClient = useQueryClient();
  const { toggleLike } = useToggleLike(planId);

  return useMutation({
    mutationFn: toggleLike,
    onMutate: async () => {
      // 정확한 쿼리 키로 취소
      await queryClient.cancelQueries({ queryKey: ['likes', userId] });
      const previousData = queryClient.getQueryData(['likes', userId]);

      // 같은 쿼리 키로 업데이트
      queryClient.setQueryData(
        ['likes', userId], // 정확한 키 매칭
        (oldData: number[] | undefined) => {
          if (!oldData) return [planId];
          if (oldData.includes(planId)) {
            return oldData.filter((id) => id !== planId);
          } else {
            return [...oldData, planId];
          }
        },
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['likes', userId], context.previousData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes'] });

      // TODO - 데이터 개수 분리하는 방식으로 변경 후 제거
      queryClient.invalidateQueries({ queryKey: ['dataCount'] });
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
