'use server';

import {
  combineDateAndTime,
  getAirportLabel,
} from '@/app/air-ticket/_utils/ticket-uitls';
import { getServerClient } from '@/lib/supabase/server';
import { ReservationData } from '@/types/air-ticket.type';

/**
 * 티켓을 예약하는 함수
 * @param reservationData - 예약 데이터
 */
export const fetchAddFlightReservation = async (
  reservationData: ReservationData,
) => {
  const supabase = await getServerClient();
  const {
    flight,
    isGoFlight,
    baseDate,
    userId,
    departure,
    passengers,
    classType,
    orderId,
  } = reservationData;

  // 출발 시간, 도착 시간 계산
  const departure_time = combineDateAndTime(baseDate, flight.depPlandTime);
  const arrive_time = combineDateAndTime(baseDate, flight.arrPlandTime);

  const { error } = await supabase.from('tickets').insert({
    user_id: userId,
    departure_time,
    arrive_time,
    airplane_name: flight.airlineKorean,
    carrier_code: flight.flightId,
    departure_location: isGoFlight ? getAirportLabel(departure) : '제주',
    arrive_location: isGoFlight ? '제주' : getAirportLabel(departure),
    size: passengers,
    class: classType,
    price: 125000,
    status: 'pending',
    order_id: orderId,
  });

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * 예약 내역을 삭제하는 함수
 * @param orderId - 주문 ID
 */
export const fetchDeleteTicketsByOrderId = async (orderId: string) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('tickets')
    .delete()
    .eq('order_id', orderId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * 티켓 상태를 결제 완료로 바꾸는 함수
 * @param orderId - 주문 ID
 */
export const fetchUpdateTicketStatusByOrderId = async (orderId: string) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('tickets')
    .update({ status: 'confirmed' })
    .eq('order_id', orderId);

  if (error) {
    throw new Error(error.message);
  }
};
