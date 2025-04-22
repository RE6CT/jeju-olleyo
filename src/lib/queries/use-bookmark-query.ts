import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';
import {
  fetchGetAllBookmarksByUserId,
  fetchGetBookmarkByIdQuery,
} from '../apis/bookmark/get-bookmark.api';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import { UserBookmark } from '@/types/mypage.type';

/**
 * 북마크 관련 기능을 제공하는 커스텀 훅
 *
 * @param userId - 사용자 ID
 * @returns 북마크 관련 기능과 상태
 *
 * @example
 * ```tsx
 * const { bookmarks, isBookmarked, toggleBookmark, isLoading } = useBookmarkQuery(userId);
 *
 * // 북마크 여부 확인
 * const isBooked = isBookmarked(placeId);
 *
 * // 북마크 토글
 * await toggleBookmark(placeId);
 * ```
 */
export const useBookmarkQuery = (userId: string | null) => {
  const queryClient = useQueryClient();

  /**
   * 사용자의 북마크 목록을 가져오는 쿼리
   * @remarks
   * - staleTime과 gcTime을 0으로 설정하여 항상 최신 데이터를 가져옵니다.
   * - 북마크 목록이 없을 경우 빈 배열을 기본값으로 사용합니다.
   */
  const { data: bookmarks = [] } = useQuery<UserBookmark[] | null>({
    queryKey: ['bookmarks', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      const result = fetchGetAllBookmarksByUserId(userId);
      return result;
    },
    staleTime: 0,
    gcTime: 0,
  });

  /**
   * 모든 장소 목록을 가져오는 쿼리
   * @remarks
   * - 북마크 추가 시 장소가 존재하는지 확인하기 위해 사용됩니다.
   */
  const { data: places = [] } = useQuery({
    queryKey: ['places'],
    queryFn: () => fetchGetAllPlaces(),
  });

  /**
   * 북마크 추가를 위한 mutation
   * @remarks
   * - 장소가 존재하는지 먼저 확인
   * - 낙관적 업데이트를 사용하여 UI를 즉시 업데이트
   * - 에러 발생 시 이전 상태로 롤백
   */
  const addBookmarkMutation = useMutation({
    mutationFn: (placeId: number) => {
      if (!userId) return Promise.resolve();
      const placeExists = places.some((place) => place.placeId === placeId);
      if (!placeExists) {
        throw new Error('존재하지 않는 장소입니다.');
      }
      return fetchAddBookmarkByIdQuery(placeId, userId);
    },
    onMutate: async (placeId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks', userId] });
      const previousBookmarks = queryClient.getQueryData(['bookmarks', userId]);

      const newBookmark = {
        placeId,
        title: places.find((p) => p.placeId === placeId)?.title || '',
        image: places.find((p) => p.placeId === placeId)?.image || '',
        category: places.find((p) => p.placeId === placeId)?.category || '',
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ['bookmarks', userId],
        (old: UserBookmark[] | null) => {
          if (!old) return [newBookmark];
          return [...old, newBookmark];
        },
      );

      return { previousBookmarks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmarks', userId],
        refetchType: 'active',
        exact: true,
      });
    },
    onError: (_err, _newBookmark, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', userId],
          context.previousBookmarks,
        );
      }
    },
  });

  /**
   * 북마크 삭제를 위한 mutation
   */
  const deleteBookmarkMutation = useMutation({
    mutationFn: async (placeId: number) => {
      if (!userId) return Promise.resolve();
      const bookmark = await fetchGetBookmarkByIdQuery(placeId, userId);
      if (!bookmark) {
        return;
      }
      await fetchDeleteBookmark(bookmark.bookmark_id);
    },
    onMutate: async (placeId) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarks', userId] });
      const previousBookmarks = queryClient.getQueryData(['bookmarks', userId]);

      queryClient.setQueryData(
        ['bookmarks', userId],
        (old: UserBookmark[] | null) => {
          if (!old) return [];
          return old.filter((bookmark) => bookmark.placeId !== placeId);
        },
      );

      return { previousBookmarks };
    },
    onError: (err, placeId, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          ['bookmarks', userId],
          context.previousBookmarks,
        );
      }
    },
    onSuccess: async () => {
      // 성공 시 캐시 무효화만 수행 (리패치는 toggleBookmark에서 처리)
      queryClient.invalidateQueries({
        queryKey: ['bookmarks', userId],
        refetchType: 'active',
        exact: true,
      });
    },
  });

  /**
   * 특정 장소가 북마크되어 있는지 확인하는 함수
   * @param placeId - 확인할 장소의 ID
   * @returns 북마크 여부
   */
  const isBookmarked = (placeId: number) => {
    if (!bookmarks || !userId) return false;
    return bookmarks.some((bookmark) => bookmark.placeId === placeId);
  };

  /**
   * 북마크 추가/삭제를 토글하는 함수
   * @param placeId - 토글할 장소의 ID
   */
  const toggleBookmark = async (
    placeId: number,
  ): Promise<{ success: boolean; error?: Error }> => {
    if (!userId) return { success: false };
    const isCurrentlyBookmarked = isBookmarked(placeId);
    try {
      if (isCurrentlyBookmarked) {
        await deleteBookmarkMutation.mutateAsync(placeId);
      } else {
        await addBookmarkMutation.mutateAsync(placeId);
      }
      // 추가/삭제 후 즉시 캐시를 리패치
      await queryClient.refetchQueries({
        queryKey: ['bookmarks', userId],
        type: 'active',
        exact: true,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    isLoading:
      addBookmarkMutation.isPending || deleteBookmarkMutation.isPending,
  };
};
