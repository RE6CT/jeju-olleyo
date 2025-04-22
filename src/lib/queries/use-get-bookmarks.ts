import { useQuery } from '@tanstack/react-query';
import { fetchGetAllBookmarksByUserId } from '../apis/bookmark/get-bookmark.api';

/**
 * 유저의 북마크 목록을 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 * @returns 쿼리 데이터 및 상태
 */
export const useGetBookMarks = (
  userId: string | undefined,
  page: number = 1,
  pageSize: number = 9,
) => {
  return useQuery({
    queryKey: ['bookmarks', userId, page, pageSize],
    queryFn: () => {
      if (!userId) return null;
      const result = fetchGetAllBookmarksByUserId(userId, page, pageSize);
      return result;
    },
    enabled: !!userId,
  });
};
