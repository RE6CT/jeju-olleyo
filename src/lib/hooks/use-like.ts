'use client';

import { useState } from 'react';
import getLike from '@/lib/apis/get-like.api';
import addLike from '@/lib/apis/add-like.api';
import deleteLike from '@/lib/apis/delete-like.api';
import countLike from '@/lib/apis/count-like.api';

const useLike = (planId: number, userId: string, initialLikes: number) => {
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = async () => {
    const currentLike = await getLike(planId, userId);

    if (currentLike) {
      await deleteLike(currentLike.planLikeId);
    } else {
      await addLike(planId, userId);
    }

    const updatedCount = await countLike(planId);
    setLikes(updatedCount != null ? updatedCount : likes);
  };

  return { likes, toggleLike };
};

export default useLike;
