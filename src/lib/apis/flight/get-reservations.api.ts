import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';

/**
 * 유저의 항공권 예약 내역을 가져오는 함수
 * @param userId - 유저의 uuid
 * @returns 유저의 항공권 예약 내역
 */
export const fetchGetReservationsByUserId = async (userId: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  const camelizedData = data ? camelize(data) : null;
  return camelizedData;
};
