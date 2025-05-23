import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';
import { fetchGetBookmarkByIdQuery } from '../apis/bookmark/get-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';
import { Place } from '@/types/home.popular-place.type';
import { InfinitePlaceData } from '@/types/category.type';
import { UserBookmark } from '@/types/mypage.type';

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
    onMutate: async ({ placeId }) => {
      // 관련 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['popularPlaces'] });
      await queryClient.cancelQueries({ queryKey: ['places'] });
      await queryClient.cancelQueries({ queryKey: ['bookmarks'] });

      // 이전 데이터 저장
      const previousData = {
        popularPlaces: queryClient.getQueryData(['popularPlaces']),
        places: queryClient.getQueryData(['places']),
        bookmarks: queryClient.getQueryData(['bookmarks']),
      };

      // 홈 페이지 쿼리 업데이트
      queryClient.setQueriesData(
        { queryKey: ['popularPlaces'], exact: false },
        (oldData: Place[]) => {
          if (!oldData) return oldData;
          const popularPlaces = oldData.map((place) => {
            if (place.id === placeId)
              return { ...place, isBookmarked: !place.isBookmarked };
            else return place;
          });
          return popularPlaces;
        },
      );

      // 카테고리, 검색 페이지 쿼리 업데이트
      queryClient.setQueriesData(
        { queryKey: ['places'], exact: false },
        (oldData: InfinitePlaceData) => {
          if (!oldData.pages) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              if (!page.data) return page;

              return {
                ...page,
                data: page.data.map((place) => {
                  if (place.placeId === placeId) {
                    return { ...place, isBookmarked: !place.isBookmarked };
                  }
                  return place;
                }),
              };
            }),
          };
        },
      );

      // 북마크 페이지 쿼리 업데이트
      queryClient.setQueriesData(
        { queryKey: ['bookmarks'], exact: false },
        (oldData: UserBookmark[]) => {
          const bookmarks = oldData.filter(
            (place) => place.placeId !== placeId,
          );
          return bookmarks;
        },
      );

      return { previousData };
    },
    onError: (error, _, context) => {
      console.error('북마크 작업 실패:', error);
      // 각 데이터 롤백
      if (context?.previousData) {
        const { popularPlaces, places, bookmarks } = context.previousData;
        if (popularPlaces)
          queryClient.setQueryData(['popularPlaces'], popularPlaces);
        if (places) queryClient.setQueryData(['places'], places);
        if (bookmarks) queryClient.setQueryData(['bookmarks'], bookmarks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popularPlaces'] }); // 홈 페이지
      queryClient.invalidateQueries({ queryKey: ['places'] }); // 검색, 카테고리 페이지
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] }); // 북마크 페이지
      queryClient.invalidateQueries({ queryKey: ['dataCount'] }); // 마이페이지 모달
    },
  });
};
