import React, { useState } from 'react';
import LikeSvg from '../../../public/icons/like.svg';
import { Button } from '../ui/button';

/**
 * 좋아요 아이콘 컴포넌트
 * @returns 좋아요 아이콘 SVG 컴포넌트
 *
 * @example
 * <LikeIcon />
 */
const LikeIcon = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // TODO: 서버 액션 호출 추가
  };

  return (
    <Button
      onClick={toggleLike}
      className="rounded-12 flex aspect-square h-[56px] w-[56px] cursor-pointer items-center justify-center gap-[10px] border-none bg-[rgba(255,255,255,0.1)] p-[10px]"
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <LikeSvg fill={isLiked ? 'primary-500' : 'gray-200'} />
    </Button>
  );
};

export default LikeIcon;
