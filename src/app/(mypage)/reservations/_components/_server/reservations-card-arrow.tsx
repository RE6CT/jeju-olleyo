import { ArrowLeftLong } from '@/components/icons/arrow-icon';
import FlightIcon from '@/components/icons/flight-icon';

const ReservationsCardArrow = ({
  airplaneName,
  carrierCode,
}: {
  airplaneName: string;
  carrierCode: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <ArrowLeftLong />
      <div className="flex items-center gap-[2px]">
        <FlightIcon fill="gray-300" size={12} />
        <span className="medium-12 text-gray-500">{`${airplaneName} ${carrierCode}`}</span>
      </div>
    </div>
  );
};

export default ReservationsCardArrow;
