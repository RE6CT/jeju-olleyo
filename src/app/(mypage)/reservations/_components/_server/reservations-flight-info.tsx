import { formatDate, formatTime } from '@/lib/utils/date';
import { FlightInfoType } from '@/types/mypage.type';
import Image from 'next/image';

const ReservationsFlightInfo = ({
  dateTime,
  size,
  location,
  airplaneName,
  carrierCode,
}: FlightInfoType) => {
  console.log('carrierCode ➡️', carrierCode);
  return (
    <div className="flex items-center gap-3 p-4">
      <figure className="relative h-[60px] w-[60px] overflow-hidden rounded-[4px]">
        <Image
          src={`https://media.interparkcdn.net/interpark-tour/image/upload/q_auto,f_auto/air/airline/icon/${carrierCode.slice(0, 2)}.png`}
          alt={airplaneName}
          fill
          className="object-cover"
        />
      </figure>
      <div>
        <span className="medium-12">{`${formatDate(dateTime)} | ${size}명`}</span>
        <div className="flex gap-2">
          <span className="semibold-16">{formatTime(dateTime)}</span>
          <span
            className={`regular-16 ${location === '제주' ? 'text-gray-600' : 'text-secondary-300'}`}
          >
            {location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationsFlightInfo;
