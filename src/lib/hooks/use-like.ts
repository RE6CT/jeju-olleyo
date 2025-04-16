'use client';

import { fetchgetSingleLike } from '../apis/like/get-like.api';
import { getCurrentSession } from '../apis/auth/auth-browser.api';
import fetchDeleteLike from '../apis/like/delete-like.api';
import fetchUpdateLikeByUserId from '../apis/like/add-like.api';
import { useInvalidateLikes } from '../mutations/use-like-mutation';
import useCustomToast from './use-custom-toast';

/**
 * 좋아요 토글 함수를 반환하는 커스텀 훅
 * @param planId - 좋아요한 일정의 id
 * @returns
 */
const useToggleLike = (planId: number) => {
  const { invalidateLikes } = useInvalidateLikes();
  const { successToast } = useCustomToast();

  const toggleLike = async () => {
    try {
      const { user: sessionUser } = await getCurrentSession();
      const userId = sessionUser?.id;

      if (!userId) {
        successToast('로그인이 필요합니다.');

        return;
      }

      const currentLike = await fetchgetSingleLike(planId, userId);

      if (currentLike) {
        await fetchDeleteLike(currentLike.plan_like_id);
      } else {
        await fetchUpdateLikeByUserId(planId, userId);
      }

      invalidateLikes();
    } catch (error) {
      console.error('Error toggling like:', error);
      successToast('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return { toggleLike };
};

export default useToggleLike;
