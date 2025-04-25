import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetReservationsByUserId } from '@/lib/apis/flight/get-reservations.api';
import ReservationsCard from './_components/_server/reservations-card';

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
      <ul className="flex flex-col gap-5">
        {reservations.map((reservation) => (
          <li>
            <ReservationsCard
              departureInfo={{
                dateTime: reservation.departureTime,
                size: 3,
                location: reservation.departureLocation,
                airplaneName: reservation.airplaneName ?? '정보 없음',
              }}
              arrivalInfo={{
                dateTime: reservation.arriveTime,
                size: 3,
                location: reservation.arriveLocation,
                airplaneName: reservation.airplaneName ?? '정보 없음',
              }}
              airplaneName="대한항공"
              carrierCode="KE1009"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
