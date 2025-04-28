import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';

/**
 * 유저의 항공권 예약 내역을 가져오는 함수
 * @param userId - 유저의 uuid
 * @returns 유저의 항공권 예약 내역
 */
export const fetchGetReservationsByUserId = async (
  userId: string,
  showAll: boolean = false,
) => {
  const supabase = await getServerClient();

  let query = supabase
    .from('tickets')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('departure_time', { ascending: false });

  const { count, error: countError } = await query;
  if (countError) throw new Error(countError.message);

  if (!showAll) {
    const currentDate = new Date().toISOString();
    query = query.gte('departure_time', currentDate);
  }

  const { data, error: dataError } = await query;
  if (dataError) throw new Error(dataError.message);

  const camelizedData = data ? camelize(data) : null;
  return { data: camelizedData, count: count };
};
