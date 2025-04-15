'use client';

import { fetchgetSingleLike } from '../apis/like/get-like.api';
import { getCurrentSession } from '../apis/auth/auth-browser.api';
import fetchDeleteLike from '../apis/like/delete-like.api';
import fetchUpdateLikeByUserId from '../apis/like/add-like.api';
import { useInvalidateLikes } from '../mutations/use-like-mutation';

/**
 * 좋아요 토글 함수를 반환하는 커스텀 훅
 * @param planId - 좋아요한 일정의 id
 * @returns
 */
const useToggleLike = (planId: number) => {
  const { invalidateLikes } = useInvalidateLikes();

  const toggleLike = async () => {
    const { user: sessionUser } = await getCurrentSession();
    const userId = sessionUser?.id;

    if (!userId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const currentLike = await fetchgetSingleLike(planId, userId);

    if (currentLike) {
      await fetchDeleteLike(currentLike.plan_like_id);
    } else {
      await fetchUpdateLikeByUserId(planId, userId);
    }

    invalidateLikes();
  };

  return { toggleLike };
};

export default useToggleLike;
