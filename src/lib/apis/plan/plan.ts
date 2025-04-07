import { Plan } from '@/types/plan.type';
import { createClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';

/**
 * 사용자의 일정 목록을 가져오는 API
 * @param userId - 사용자 ID
 * @returns Promise<Plan[]> - 일정 목록
 */
export const getPlans = async (userId: string): Promise<Plan[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('일정 목록을 불러오는데 실패했습니다.');
  }

  return data.map(camelize); // snake_case -> camelCase
};
