'use client';

import { toggleLike } from '@/lib/apis/like.api';
import { useState } from 'react';

const LikeButton = ({
  user_id,
  plan_id,
  initialLikes,
}: {
  user_id: string;
  plan_id: number;
  initialLikes: number;
}) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLikeButtonClick = async () => {
    const updatedLikes = await toggleLike(plan_id, user_id);
    if (updatedLikes !== null) {
      setLikes(updatedLikes);
    }
  };

  return <button onClick={handleLikeButtonClick}>좋아요</button>;
};

export default LikeButton;
