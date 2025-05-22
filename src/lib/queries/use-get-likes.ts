import { useQuery } from '@tanstack/react-query';
import { fetchGetAllLikesByUserId } from '../apis/like/get-like.api';

/**
 * 유저의 좋아요 목록을 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 * @return 좋아요 목록 쿼리 결과
 */
export const useGetLikes = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['likes'],
    queryFn: () => fetchGetAllLikesByUserId(userId),
    staleTime: 1000 * 60 * 2,
  });
};
