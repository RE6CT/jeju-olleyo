import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';

/**
 * 전체 일정을 가져오는 함수
 * @param userId - 사용자의 userId
 * @param limit - 개수 제한
 * @returns 좋아요 여부가 포함된 전체 일정 목록
 */
export const fetchAllPlans = async (userId: string | null, limit?: number) => {
  const supabase = getBrowserClient();

  let query = supabase.rpc('get_plans', {
    user_id_param: userId,
  });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data.map(camelize);
};
