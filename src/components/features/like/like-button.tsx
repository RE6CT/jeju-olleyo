'use client';

import useToggleLike from '@/lib/hooks/use-like';

import LikeIcon from '../../commons/like-icon';

/**
 * 좋아요 버튼 컴포넌트
 * @param planId - 좋아요한 일정의 id
 * @param isLiked - 좋아요 상태
 * @param className - 스타일
 * @returns
 */
const LikeButton = ({
  planId,
  isLiked,
  className,
}: {
  planId: number;
  isLiked: boolean;
  className?: string;
}) => {
  const { toggleLike } = useToggleLike(planId);

  return (
    <div className={`${className}`}>
      <LikeIcon isLiked={isLiked} onToggle={toggleLike} />
    </div>
  );
};

export default LikeButton;
