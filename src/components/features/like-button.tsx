'use client';

import { toggleLike } from '@/lib/hooks/use-like';
import { useState } from 'react';

const LikeButton = ({
  userId,
  planId,
  initialLikes,
}: {
  userId: string;
  planId: number;
  initialLikes: number;
}) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeButtonClick = async () => {
    const updatedLikes = await toggleLike(planId, userId);
    if (updatedLikes !== null) {
      setLikes(updatedLikes);
    }
  };

  return <button onClick={handleLikeButtonClick}>좋아요</button>;
};

export default LikeButton;
