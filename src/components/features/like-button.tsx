'use client';

import useLike from '@/lib/hooks/use-like';

const LikeButton = ({
  userId,
  planId,
  initialLikes,
}: {
  userId: string;
  planId: number;
  initialLikes: number;
}) => {
  const { likes, toggleLike } = useLike(planId, userId, initialLikes);

  return <button onClick={toggleLike}>좋아요 {likes}</button>;
};

export default LikeButton;
