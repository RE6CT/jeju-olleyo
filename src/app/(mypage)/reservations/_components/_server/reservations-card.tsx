import ReservationsCardArrow from './reservations-card-arrow';
import ReservationsFlightInfo from './reservations-flight-info';

const ReservationsCard = () => {
  return (
    <article className="flex gap-7 rounded-24 bg-white px-4 py-5">
      <ReservationsFlightInfo />
      <ReservationsCardArrow />
      <ReservationsFlightInfo />
    </article>
  );
};

export default ReservationsCard;
