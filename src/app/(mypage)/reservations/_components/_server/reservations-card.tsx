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
    <article className="flex flex-col justify-center gap-[10px] rounded-12 bg-white px-5 py-5 md:flex-row md:gap-7 md:rounded-24 md:px-6 lg:px-4">
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
