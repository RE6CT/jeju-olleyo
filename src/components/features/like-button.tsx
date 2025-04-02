'use client';

import { toggleLike } from '@/lib/apis/like.api';
import { useState } from 'react';
// 유저랑 플랜 세팅되면 로직 수정 예정

export default function LikeButton({
  user_id,
  plan_id,
  initialLikes,
}: {
  user_id: string;
  plan_id: number;
  initialLikes: number;
}) {
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
}
