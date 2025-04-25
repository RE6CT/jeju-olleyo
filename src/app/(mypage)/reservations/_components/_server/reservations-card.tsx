import { FlightInfoType, ReservationType } from '@/types/mypage.type';
import ReservationsCardArrow from './reservations-card-arrow';
import ReservationsFlightInfo from './reservations-flight-info';

/**
 * 항공권 예약 내역 카드 컴포넌트
 * @param reservation - 예약 내역
 */
const ReservationsCard = ({
  reservation,
}: {
  reservation: ReservationType;
}) => {
  const departureInfo: FlightInfoType = {
    dateTime: reservation.departureTime,
    size: reservation.size,
    location: reservation.departureLocation,
    airplaneName: reservation.airplaneName,
    carrierCode: reservation.carrierCode,
  };
  const arrivalInfo: FlightInfoType = {
    dateTime: reservation.arriveTime,
    size: reservation.size,
    location: reservation.arriveLocation,
    airplaneName: reservation.airplaneName,
    carrierCode: reservation.carrierCode,
  };
  return (
    <article className="flex gap-7 rounded-24 bg-white px-4 py-5">
      <ReservationsFlightInfo {...departureInfo} aria-label="출발 정보" />
      <ReservationsCardArrow
        airplaneName={reservation.airplaneName}
        carrierCode={reservation.carrierCode}
      />
      <ReservationsFlightInfo {...arrivalInfo} aria-label="도착 정보" />
    </article>
  );
};

export default ReservationsCard;
