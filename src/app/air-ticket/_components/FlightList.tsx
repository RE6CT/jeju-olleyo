import { Flight } from '../_type/type';
import { formatTime } from '../_utils/ticket-uitls';

interface FlightListProps {
  flights: Flight[];
  sortKey: 'airline' | 'dep' | 'arr';
  sortOrder: 'asc' | 'desc';
  sortFlights: (
    flights: Flight[],
    key: 'airline' | 'dep' | 'arr',
    order: 'asc' | 'desc',
  ) => Flight[];
  setSortKey: React.Dispatch<React.SetStateAction<'airline' | 'dep' | 'arr'>>;
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

export const FlightList: React.FC<FlightListProps> = ({
  flights,
  sortKey,
  sortOrder,
  sortFlights,
  setSortKey,
  setSortOrder,
}) => {
  console.log('flights', flights);
  return (
    <div>
      <div className="mb-2 flex items-center gap-3">
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
          <li key={idx} className="rounded border bg-gray-100 p-4 text-sm">
            ✈️ 항공사: {flight.airlineKorean}
            <br />
            항공편: {flight.flightId}
            <br />
            출발: {formatTime(flight.depPlandTime)} / 도착:{' '}
            {formatTime(flight.arrPlandTime)}
          </li>
        ))}
      </ul>
    </div>
  );
};
