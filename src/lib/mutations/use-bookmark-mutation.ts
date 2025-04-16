import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark, removeBookmark } from '@/lib/apis/home/home.popular.api';
import useAuth from '../hooks/use-auth';
import useCustomToast from '../hooks/use-custom-toast';

/**
 * 북마크 추가/삭제 기능을 제공하는 훅
 * @returns 북마크 관련 함수와 상태
 */
export const useBookmarkMutation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  const bookmarkMutation = useMutation({
    mutationFn: async ({
      placeId,
      isBookmarked,
    }: {
      placeId: number;
      isBookmarked: boolean;
    }) => {
      if (!user) {
        // 로그인하지 않은 경우 로그인 안내
        successToast('로그인이 필요합니다.');
        return { success: false };
      }

      // 로그인한 경우에만 북마크 기능 사용
      if (isBookmarked) {
        await removeBookmark(placeId, user.id);
        return { success: true };
      } else {
        await addBookmark(placeId, user.id);
        return { success: true };
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['popularPlaces'] });
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
        queryClient.invalidateQueries({ queryKey: ['dataCount'] });
        queryClient.invalidateQueries({ queryKey: ['places'] });
      }
    },
    onError: (error) => {
      console.error('북마크 작업 실패:', error);
      successToast('북마크 작업 중 오류가 발생했습니다.');
    },
  });

  return {
    toggleBookmark: (placeId: number, isBookmarked: boolean) =>
      bookmarkMutation.mutate({ placeId, isBookmarked }),
    isLoading: bookmarkMutation.isPending,
  };
};
