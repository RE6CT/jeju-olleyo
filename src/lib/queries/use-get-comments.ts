import { useQuery } from '@tanstack/react-query';
import { fetchAllCommentsByPlanId } from '../apis/comments/client-comments.api';

/**
 * 일정의 댓글 전체를 불러오는 쿼리 훅
 * @param planId - 일정의 id
 */
export const useGetComments = (planId: number) => {
  return useQuery({
    queryKey: ['comments', planId],
    queryFn: () => fetchAllCommentsByPlanId(planId),
  });
};
