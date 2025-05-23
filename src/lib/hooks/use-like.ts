'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getCurrentSession } from '../apis/auth/auth-browser.api';
import fetchUpdateLikeByUserId from '../apis/like/add-like.api';
import fetchDeleteLike from '../apis/like/delete-like.api';
import { fetchgetSingleLike } from '../apis/like/get-like.api';
import useAlert from './use-alert';

import useCustomToast from './use-custom-toast';
import { PATH } from '@/constants/path.constants';

/**
 * 좋아요 토글 함수를 반환하는 커스텀 훅
 * @param planId - 좋아요한 일정의 id
 * @returns
 */
const useToggleLike = (planId: number) => {
  const { successToast } = useCustomToast();
  const { showQuestion } = useAlert();
  const router = useRouter();
  const pathname = usePathname();

  /** 현재 전체 URL 가져오기 (window 객체 사용) */
  const getCurrentUrl = () => {
    if (typeof window === 'undefined') return pathname;
    return window.location.pathname + window.location.search;
  };

  const toggleLike = async () => {
    try {
      const { user: sessionUser } = await getCurrentSession();
      const userId = sessionUser?.id;

      if (!userId) {
        const currentUrl = getCurrentUrl();
        showQuestion(
          '로그인 필요',
          '일정을 만들기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?',
          {
            onConfirm: () =>
              router.push(
                `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(currentUrl)}`,
              ),
            onCancel: () => {},
          },
        );
        return;
      }

      const currentLike = await fetchgetSingleLike(planId, userId);

      if (currentLike) {
        await fetchDeleteLike(currentLike.plan_like_id);
      } else {
        await fetchUpdateLikeByUserId(planId, userId);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      successToast('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return { toggleLike };
};

export default useToggleLike;
