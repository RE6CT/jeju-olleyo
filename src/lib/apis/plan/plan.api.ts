'use server';
import { Plan, PlanFilterOptions } from '@/types/plan.type';
import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';

/**
 * 사용자의 일정 목록을 가져오는 API
 * @param userId - 사용자 ID
 * @returns Promise<Plan[]> - 일정 목록
 */
export const fetchGetAllPlansByUserId = async (
  userId: string,
): Promise<Plan[]> => {
  const supabase = await getServerClient();

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

/**
 * 필터 옵션에 따라 사용자의 일정을 필터링하여 가져오는 API
 * @param userId - 사용자 ID
 * @param filterOptions - 필터링 옵션
 * @returns Promise<Plan[]> - 필터링된 일정 목록
 *
 * @example
 * ```typescript
 * const filteredPlans = await getFilteredPlans(userId, {
 *   title: '제주도',
 *   startDate: '2024-03-01',
 *   endDate: '2024-03-31',
 *   isPublic: true
 * });
 * ```
 */
export const fetchGetFilteredPlansByUserId = async (
  userId: string,
  filterOptions: PlanFilterOptions,
): Promise<Plan[]> => {
  const supabase = await getServerClient();
  let query = supabase.from('plans').select('*').eq('user_id', userId);

  if (filterOptions.title) {
    query = query.or(`title.ilike.%${filterOptions.title}%`);
  }
  if (filterOptions.startDate) {
    query = query.gte('travel_start_date', filterOptions.startDate);
  }
  if (filterOptions.endDate) {
    query = query.lte('travel_end_date', filterOptions.endDate);
  }
  if (filterOptions.isPublic !== undefined) {
    query = query.eq('public', filterOptions.isPublic);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw new Error('일정 필터링에 실패했습니다.');
  }

  return data.map(camelize);
};
