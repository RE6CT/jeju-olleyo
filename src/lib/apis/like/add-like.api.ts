'use server';

import { revalidatePath } from 'next/cache';

import { PATH } from '@/constants/path.constants';
import { getServerClient } from '@/lib/supabase/server';

/**
 * 좋아요 데이터를 추가해주는 함수
 * @param plan_id - 좋아요한 일정의 id
 * @param user_id - 유저의 uuid
 */
const fetchUpdateLikeByUserId = async (plan_id: number, user_id: string) => {
  const supabase = await getServerClient();

  const { error } = await supabase.from('plan_likes').insert({
    plan_id,
    user_id,
  });

  if (error) throw new Error(error.message);
};

export default fetchUpdateLikeByUserId;
