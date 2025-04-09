'use server';

import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';

const getLike = async (planId: number, userId: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('plan_likes')
    .select('plan_like_id')
    .eq('plan_id', planId)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export default getLike;

/**
 * 사용자의 좋아요 목록을 가져오는 함수
 * @param userId - 사용자 ID
 * @returns 사용자의 좋아요 목록 또는 null
 */
export const fetchGetAllLikesByUserId = async (userId: string) => {};
