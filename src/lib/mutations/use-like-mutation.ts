import { useMutation, useQueryClient } from '@tanstack/react-query';
import useToggleLike from '../hooks/use-like';
import { Plan } from '@/types/plan.type';

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
      // 쿼리 취소 및 저장
      await queryClient.cancelQueries({ queryKey: ['likes'] });
      const previousIds = queryClient.getQueryData<number[]>(['likes', userId]);
      const previousLikes = previousIds
        ? queryClient.getQueryData<Plan[]>([
            'likes',
            'details',
            userId,
            previousIds,
          ])
        : undefined;

      // 좋아요 여부 판별
      const isLiked = previousIds?.includes(planId);

      // id 목록 업데이트
      queryClient.setQueryData(['likes', userId], (oldData: number[] = []) => {
        return isLiked
          ? oldData.filter((id) => id !== planId)
          : [...oldData, planId];
      });

      // 데이터 목록 업데이트
      queryClient.setQueryData(
        ['likes', previousIds],
        (oldData: Plan[] = []) => {
          return isLiked
            ? oldData.filter((plan) => plan.planId !== planId)
            : oldData;
        },
      );

      return { previousIds, previousLikes };
    },
    onError: (err, variables, context) => {
      if (context?.previousIds) {
        queryClient.setQueryData(['likes', userId], context.previousIds);
      }
      if (context?.previousLikes && context?.previousIds) {
        queryClient.setQueryData(
          ['likes', 'details', userId, context.previousIds],
          context.previousLikes,
        );
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
