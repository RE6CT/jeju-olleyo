import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetReservationsByUserId } from '@/lib/apis/flight/get-reservations.api';

const ReservationsPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  const reservations = await fetchGetReservationsByUserId(userId);

  if (!reservations)
    throw new Error('항공권 예약 내역 로드 중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">0건의 예약 내역이 있어요</p>
        <h2 className="semibold-28 w-full">항공권 예약 내역</h2>
      </div>
      <ul className="flex flex-col">
        {reservations.map((reservation) => (
          <li className="flex rounded-24 bg-white px-4 py-5">
            ticketId: {reservation.ticketId}
            departureTime: {reservation.departureTime}
            arriveTime: {reservation.arriveTime}
            airplaneName: {reservation.airplaneName}
            carrierCode: {reservation.carrierCode}
            departureLocation: {reservation.departureLocation}
            arriveLocation: {reservation.arriveLocation}
            price: {reservation.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
