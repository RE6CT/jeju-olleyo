import {
  DateOptionsProps,
  TicketListProps,
} from '../../../types/air-ticket.type';

import TicketCard from './ticket-card';
import DateOptions from './date-options';
import { formatDateToString } from '../_utils/ticket-uitls';

const TicketList = ({
  flights,
  sortKey,
  sortFlights,
  selectedFlight,
  setSelectedFlight,
  startDate,
  setStartDate,
}: TicketListProps & DateOptionsProps) => {
  const isEmpty = flights.length === 0;

  return (
    <div>
      <DateOptions
        baseDateStr={formatDateToString(startDate)}
        startDate={startDate}
        setStartDate={setStartDate}
      />
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
          <img
            src="../empty-result/ticket_empty_result.png"
            alt="검색 결과가 없어요"
            className="mb-4 w-16 md:w-24"
          />
          <p className="text-14 md:text-16">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <ul className="space-y-3 md:space-y-4">
          {sortFlights(flights, sortKey).map((flight, idx) => (
            <TicketCard
              key={idx}
              flight={flight}
              isSelected={selectedFlight?.flightId === flight.flightId}
              onClick={() => setSelectedFlight(flight)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
