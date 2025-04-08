'use client';

import { useState } from 'react';
import getLike from '../apis/like/get-like.api';
import deleteLike from '../apis/like/delete-like.api';
import addLike from '../apis/like/add-like.api';
import countLike from '../apis/like/count-like.api';

const useLike = (planId: number, userId: string, initialLikes: number) => {
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = async () => {
    const currentLike = await getLike(planId, userId);

    if (currentLike) {
      await deleteLike(currentLike.plan_like_id);
    } else {
      await addLike(planId, userId);
    }

    const updatedCount = await countLike(planId);
    setLikes(updatedCount != null ? updatedCount : likes);
  };

  return { likes, toggleLike };
};

export default useLike;
