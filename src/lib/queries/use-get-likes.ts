import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  fetchGetAllLikesByUserId,
  fetchGetUserLikePlans,
} from '../apis/like/get-like.api';

/**
 * 유저의 좋아요 목록을 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 * @return 쿼리 결과 및 함수
 */
export const useGetLikes = (userId: string | undefined) => {
  // 좋아요 id 목록 데이터
  const { data: likeIds } = useQuery({
    queryKey: ['likes', userId],
    queryFn: async () => fetchGetAllLikesByUserId(userId),
    staleTime: 1000 * 60 * 2,
  });

  // 좋아요 디테일 목록 데이터
  const { data: likes, error: likesError } = useQuery({
    queryKey: ['likes', 'details', userId, likeIds],
    queryFn: () => fetchGetUserLikePlans(userId, likeIds),
    staleTime: 1000 * 60 * 2,
    enabled: !!likeIds,
    placeholderData: keepPreviousData,
  });

  // 좋아요 여부
  const isLiked = (planId: number) => {
    return likeIds?.includes(planId);
  };

  // 좋아요 개수
  const count = likeIds?.length || 0;

  return { likeIds, likes, isLiked, count, error: likesError };
};
