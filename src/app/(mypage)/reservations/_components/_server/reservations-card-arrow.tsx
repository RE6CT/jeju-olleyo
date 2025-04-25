import { ArrowLeftLong } from '@/components/icons/arrow-icon';
import FlightIcon from '@/components/icons/flight-icon';

/**
 * 항공권 예약 페이지 카드의 화살표 부분을 나타내는 컴포넌트
 * @param airplaneName - 항공사 이름
 * @param carrierCode - 항공사 코드
 */
const ReservationsCardArrow = ({
  airplaneName,
  carrierCode,
}: {
  airplaneName: string;
  carrierCode: string;
}) => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-1"
      role="separator"
    >
      <ArrowLeftLong aria-hidden="true" />
      <div className="flex items-center gap-[2px]">
        <FlightIcon fill="gray-300" size={12} aria-hidden="true" />
        <p className="medium-12 text-gray-500">{`${airplaneName} ${carrierCode}`}</p>
      </div>
    </section>
  );
};

export default ReservationsCardArrow;
