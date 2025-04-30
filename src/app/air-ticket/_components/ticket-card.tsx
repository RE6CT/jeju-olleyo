import { TicketCardProps } from '../../../types/air-ticket.type';
import { formatTime } from '../_utils/ticket-uitls';

const TicketCard = ({ flight, isSelected, onClick }: TicketCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer items-center overflow-hidden rounded-lg border p-3 text-sm transition-shadow duration-300 md:p-4 ${isSelected ? 'border-primary-400 bg-primary-100 shadow-xl' : 'border-transparent bg-white shadow-lg hover:shadow-xl'}`}
    >
      <img
        src={`https://media.interparkcdn.net/interpark-tour/image/upload/q_auto,f_auto/air/airline/icon/${flight.flightId.slice(0, 2)}.png`}
        alt="항공사 로고"
        className="h-[45px] w-[45px] object-cover md:h-[60px] md:w-[60px]"
      />
      <div className="ml-3 flex-grow md:ml-5">
        <div className="flex gap-2 text-14 font-semibold text-gray-800 md:text-16">
          {flight.airlineKorean}
          <span className="text-10 font-normal text-gray-600 md:text-12">
            {flight.flightId}
          </span>
        </div>
        <div className="mt-1 flex justify-start space-x-2 text-10 font-normal text-gray-500 md:mt-2 md:text-12">
          <span className="mr-2 flex items-center">
            <img
              src="icons/plane_departure.svg"
              alt="departure"
              className="mr-1 h-3 w-3"
            />
            {formatTime(flight.depPlandTime)}
          </span>
          -
          <span className="flex items-center">
            <img
              src="icons/plane_land.svg"
              alt="plane_land"
              className="mr-1 h-3 w-3"
            />
            {formatTime(flight.arrPlandTime)}
          </span>
        </div>
      </div>
      {/* 모바일에서는 가격을 항상 표시 */}
      <div className="text-right text-14 font-semibold text-primary-500 md:text-16">
        ₩ 125,000
      </div>
    </div>
  );
};

export default TicketCard;
