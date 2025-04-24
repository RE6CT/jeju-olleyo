'use client';
import { useState } from 'react';
import {
  DateOptionsProps,
  TicketListProps,
} from '../../../types/air-ticket-type';

import TicketCard from './ticket-card';
import DateOptions from './date-options';
import { formatDateToString } from '../_utils/ticket-uitls';

const TicketList = ({
  flights,
  sortKey,
  sortFlights,
  setSortKey,
  selectedFlight,
  setSelectedFlight,
  baseDateStr,
  field,
  startDate,
  setStartDate,
}: TicketListProps & DateOptionsProps) => {
  const isEmpty = flights.length === 0;

  return (
    <div>
      <DateOptions
        baseDateStr={formatDateToString(startDate)}
        field={field}
        startDate={startDate}
        setStartDate={setStartDate}
      />
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
