import { TicketCardProps } from '../../../types/air-ticket-type';
import { formatTime } from '../_utils/ticket-uitls';

const TicketCard = ({ flight, idx }: TicketCardProps) => {
  return (
    <div
      key={idx}
      className="flex items-center overflow-hidden rounded-lg bg-white p-4 text-sm shadow-lg transition-shadow duration-300 hover:shadow-xl"
    >
      <img
        src={`https://content.airhex.com/content/logos/airlines_${flight.flightId.slice(0, 2)}_100_50_r.png`}
        alt="항공사 로고"
        className="h-[60px] w-[60px] object-cover"
      />
      <div className="ml-5">
        <div className="flex gap-2 text-16 font-semibold text-gray-800">
          {flight.airlineKorean}
          <span className="text-12 font-regular text-gray-600">
            {flight.flightId}
          </span>
        </div>
        <div className="mt-2 flex justify-start space-x-2 text-10 font-regular text-gray-500">
          <span className="mr-2 flex items-center">
            <img src="icons/plane_departure.svg" className="h-3 w-3" />
            {formatTime(flight.depPlandTime)}
          </span>
          -
          <span className="flex items-center">
            <img src="icons/plane_land.svg" className="h-3 w-3" />
            {formatTime(flight.arrPlandTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
