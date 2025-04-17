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
        className="h-14 w-20 object-contain"
      />
      <div className="ml-4">
        <div className="text-lg font-semibold text-gray-800">
          {flight.airlineKorean}
        </div>
        <div className="text-sm text-gray-600">{flight.flightId}</div>
        <div className="mt-2 text-sm text-gray-500">
          <span>출발: {formatTime(flight.depPlandTime)}</span>
          <span className="ml-2">
            / 도착: {formatTime(flight.arrPlandTime)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
