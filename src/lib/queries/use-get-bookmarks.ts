import { useQuery } from '@tanstack/react-query';
import { fetchGetAllBookmarksByUserId } from '../apis/bookmark/get-bookmark.api';
import { CategoryType } from '@/types/category.type';

/**
 * 유저의 북마크 목록을 가져오는 쿼리 훅
 * @param userId - 유저의 uuid
 * @param page - 시작 페이지
 * @param pageSize - 페이지 크기
 * @param category - 북마크의 카테고리
 * @returns 쿼리 데이터 및 상태
 */
export const useGetBookMarks = (
  userId: string | undefined,
  page: number = 1,
  pageSize: number = 9,
  category?: CategoryType | undefined,
) => {
  return useQuery({
    queryKey: ['bookmarks', userId, page, pageSize, category],
    queryFn: () => {
      if (!userId) return null;
      const result = fetchGetAllBookmarksByUserId(
        userId,
        page,
        pageSize,
        category,
      );
      return result;
    },
    enabled: !!userId,
  });
};
