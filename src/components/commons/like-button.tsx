'use client';

import React, { MouseEvent } from 'react';
import LikesIcon from '../icons/like-icon';
import useToggleLike from '@/lib/hooks/use-like';
import { useGetLikes } from '@/lib/queries/use-get-likes';
import useAuth from '@/lib/hooks/use-auth';

/**
 * 좋아요 버튼 컴포넌트
 * @param planId - 좋아요한 일정의 id
 * @param className - 스타일
 */
const LikeButton = ({
  planId,
  className,
}: {
  planId: number;
  className: string;
}) => {
  const { toggleLike } = useToggleLike(planId);
  const { user } = useAuth();
  const { isLiked } = useGetLikes(user?.id);

  /**
   * onToggle 함수 전 이벤트 버블링 방지용 함수
   */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike();
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center gap-[5.714px] rounded-12 border-none bg-white/10 p-[5.714px] md:h-14 md:w-14 md:gap-2.5 md:p-2.5 lg:h-14 lg:w-14 lg:gap-2.5 lg:p-2.5 ${className}`}
      aria-label={isLiked(planId) ? '좋아요 취소' : '좋아요'}
    >
      <LikesIcon
        fill={isLiked(planId) ? 'primary-500' : 'gray-200'}
        size={40}
      />
    </button>
  );
};

export default LikeButton;
