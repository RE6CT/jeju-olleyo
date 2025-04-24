import { TicketListProps } from '../../../types/air-ticket-type';

import TicketCard from './ticket-card';

const TicketList = ({
  flights,
  sortKey,
  sortFlights,
  setSortKey,
}: TicketListProps) => {
  const isEmpty = flights.length === 0;

  return (
    <div>
      <div className="mb-2 mr-9 mt-4 flex max-w-4xl items-center gap-3">
        <select
          id="ticket-list-filter"
          className="rounded border px-2 py-1"
          value={sortKey}
          onChange={(e) =>
            setSortKey(
              e.target.value as
                | 'airline'
                | 'dep_desc'
                | 'arr_asc'
                | 'dep_asc'
                | 'arr_desc',
            )
          }
        >
          <option value="arr_asc">출발 빠른 순</option>
          <option value="arr_desc">출발 느린 순</option>
          <option value="dep_asc">도착 빠른 순</option>
          <option value="dep_desc">도착 느린 순</option>
          <option value="airline">항공사 별</option>
        </select>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
          <img
            src="../emptyresult/ticket_empty_result.png"
            alt="검색 결과가 없어요"
            className="mb-4"
          />
        </div>
      ) : (
        <ul className="space-y-4">
          {sortFlights(flights, sortKey).map((flight, idx) => (
            <TicketCard key={idx} flight={flight} idx={idx} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
