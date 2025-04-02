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

  return (
    <button
      onClick={async () => {
        const updatedLikes = await toggleLike(plan_id, user_id);
        if (updatedLikes !== null) {
          setLikes(updatedLikes);
        }
      }}
    >
      좋아요
    </button>
  );
};

export default LikeButton;
