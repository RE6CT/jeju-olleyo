import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';
import { fetchGetBookmarkByIdQuery } from '../apis/bookmark/get-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';

/**
 * 북마크를 토글하는 뮤테이션 훅
 */
export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      placeId,
    }: {
      userId: string;
      placeId: number;
    }) => {
      const currentBookmark = await fetchGetBookmarkByIdQuery(placeId, userId);

      if (currentBookmark) {
        await fetchDeleteBookmark(currentBookmark.bookmark_id);
      } else {
        await fetchAddBookmarkByIdQuery(placeId, userId);
      }
    },
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popularPlaces'] }); // 홈 페이지
      queryClient.invalidateQueries({ queryKey: ['places'] }); // 검색, 카테고리 페이지
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] }); // 북마크 페이지
      queryClient.invalidateQueries({ queryKey: ['dataCount'] }); // 마이페이지 모달
    },
    onError: (error) => {
      console.error('북마크 작업 실패:', error);
    },
  });
};
