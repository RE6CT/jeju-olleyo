import { useQuery } from '@tanstack/react-query';

import { fetchGetProfileDataCountByUserId } from '../apis/profile/get-profile-data-count';

/**
 * 프로필 모달 관련 데이터(북마크, 좋아요, 댓글 개수)를 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 * @returns
 */
export const useGetDataCount = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['dataCount', userId],
    queryFn: () => {
      if (!userId) return null;
      return fetchGetProfileDataCountByUserId(userId);
    },
    staleTime: 30000,
    enabled: !!userId,
  });
};
