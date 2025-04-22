import { useQuery } from '@tanstack/react-query';
import { fetchGetAllLikesByUserId } from '../apis/like/get-like.api';

/**
 * 유저의 좋아요 정보를 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 */
export const useGetLikes = (
  userId: string | undefined,
  page: number = 1,
  pageSize: number = 9,
) => {
  return useQuery({
    queryKey: ['likes', userId, page, pageSize],
    queryFn: () => {
      if (!userId) return null;
      const result = fetchGetAllLikesByUserId(userId, page, pageSize);
      return result;
    },
    enabled: !!userId,
  });
};
