'use server';

import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { Plan } from '@/types/plan.type';

/**
 * 좋아요 리스트를 1개 또는 0개 가져오는 함수
 * @param planId - 플랜의 id 값
 * @param userId - 유저의 uuid
 * @returns
 */
export const fetchgetSingleLike = async (planId: number, userId: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('plan_likes')
    .select('plan_like_id')
    .eq('plan_id', planId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * 사용자의 좋아요 목록을 가져오는 함수
 * @param userId - 사용자 ID
 * @returns 사용자의 좋아요 목록 또는 null
 */
export const fetchGetAllLikesByUserId = async (
  userId: string,
): Promise<Plan[] | null> => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.rpc('get_user_likes', {
    user_id_param: userId,
  });

  if (error) throw new Error(error.message);

  const camelizedData: Plan[] | null = data ? camelize(data) : null;
  return camelizedData;
};
