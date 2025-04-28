import { formatDate, formatTime } from '@/lib/utils/date';
import { FlightInfoType } from '@/types/mypage.type';
import Image from 'next/image';

/**
 * 항공권 예약 카드의 출발 또는 도착 예약 정보를 나타내는 컴포넌트
 * @param dateTime - 출발 또는 도착 시간
 * @param size - 인원
 * @param location - 출발 또는 도착 지역
 * @param airplaneName - 항공사 이름
 * @param carrierCode - 항공사 코드
 */
const ReservationsFlightInfo = ({
  dateTime,
  size,
  location,
  airplaneName,
  carrierCode,
}: FlightInfoType) => {
  return (
    <section className="flex flex-row items-center gap-3 p-0 md:flex-col md:p-4 lg:flex-row">
      <figure className="relative h-[60px] w-[60px] overflow-hidden rounded-[4px]">
        <Image
          src={`https://media.interparkcdn.net/interpark-tour/image/upload/q_auto,f_auto/air/airline/icon/${carrierCode.slice(0, 2)}.png`}
          alt={airplaneName}
          fill
          className="object-cover"
        />
        <figcaption className="sr-only">{airplaneName} 항공사 로고</figcaption>
      </figure>
      <div className="flex flex-col md:items-center lg:items-start">
        <p className="medium-12">
          <time dateTime={dateTime}>{formatDate(dateTime)}</time> | {size}명
        </p>
        <div className="flex gap-2">
          <time dateTime={dateTime} className="semibold-16">
            {formatTime(dateTime)}
          </time>
          <p
            className={`regular-16 ${location === '제주' ? 'text-gray-600' : 'text-secondary-300'}`}
          >
            {location}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReservationsFlightInfo;
