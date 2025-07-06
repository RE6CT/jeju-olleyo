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

/**
 * 결제 파라미터를 검증하는 함수
 * @param orderId - 주문 ID
 * @param amount - 총 가격
 * @returns 결제 파라미터 데이터가 실제 결제 데이터와 일치하는지 여부
 */
export const validateReservationData = async (
  orderId: string,
  amount: number,
) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('tickets')
    .select('price')
    .eq('order_id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error('결제 데이터가 유효하지 않습니다.');
  }

  const totalPrice = data.reduce((sum, ticket) => sum + (ticket.price || 0), 0);

  return totalPrice === amount;
};
