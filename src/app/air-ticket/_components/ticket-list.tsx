import { TicketListProps } from '../../../types/air-ticket-type';
import TicketCard from './ticket-card';

const TicketList = ({
  flights,
  sortKey,
  sortOrder,
  sortFlights,
  setSortKey,
  setSortOrder,
}: TicketListProps) => {
  return (
    <div>
      <div className="mb-2 mt-4 flex items-center gap-3">
        <label className="font-medium">정렬 기준:</label>
        <select
          className="rounded border px-2 py-1"
          value={sortKey}
          onChange={(e) =>
            setSortKey(e.target.value as 'airline' | 'dep' | 'arr')
          }
        >
          <option value="airline">항공사명</option>
          <option value="dep">출발시간</option>
          <option value="arr">도착시간</option>
        </select>
        <button
          type="button"
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          className="ml-2 rounded border px-2 py-1 text-sm text-gray-700 hover:bg-gray-200"
        >
          {sortOrder === 'asc' ? '오름차순' : '내림차순'}
        </button>
      </div>

      <ul className="space-y-3">
        {sortFlights(flights, sortKey, sortOrder).map((flight, idx) => (
          <TicketCard flight={flight} idx={idx} />
        ))}
      </ul>
    </div>
  );
};
export default TicketList;
