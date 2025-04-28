'use client';

import React, { MouseEvent } from 'react';
import LikesIcon from '../icons/like-icon';
import useToggleLike from '@/lib/hooks/use-like';

/**
 * 좋아요 버튼 컴포넌트
 * @param planId - 좋아요한 일정의 id
 * @param isLiked - 좋아요 상태
 * @param className - 스타일
 */
const LikeButton = ({
  planId,
  isLiked,
  className,
}: {
  planId: number;
  isLiked: boolean;
  className: string;
}) => {
  const { toggleLike } = useToggleLike(planId);

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
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] border-none bg-white/10 p-1 lg:h-14 lg:w-14 lg:rounded-12 lg:p-0 ${className}`}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <LikesIcon fill={isLiked ? 'primary-500' : 'gray-200'} size={40} />
    </button>
  );
};

export default LikeButton;
