import { FlightInfoType } from '@/types/mypage.type';
import ReservationsCardArrow from './reservations-card-arrow';
import ReservationsFlightInfo from './reservations-flight-info';

const ReservationsCard = ({
  departureInfo,
  arrivalInfo,
  airplaneName,
  carrierCode,
}: {
  departureInfo: FlightInfoType;
  arrivalInfo: FlightInfoType;
  airplaneName: string;
  carrierCode: string;
}) => {
  return (
    <article className="flex gap-7 rounded-24 bg-white px-4 py-5">
      <ReservationsFlightInfo {...departureInfo} />
      <ReservationsCardArrow
        airplaneName={airplaneName}
        carrierCode={carrierCode}
      />
      <ReservationsFlightInfo {...arrivalInfo} />
    </article>
  );
};

export default ReservationsCard;
