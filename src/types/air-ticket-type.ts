import { Dispatch, SetStateAction } from 'react';

export type Flight = {
  airlineKorean: string;
  flightId: string;
  depPlandTime: string;
  arrPlandTime: string;
};

export type TicketSearchFormProps = {
  departureList: { label: string; value: string }[];
  departure: string;
  setDeparture: Dispatch<SetStateAction<string>>;
  // formData: { schDate: string; returnDate: string; schArrvCityCode: string };
  handleSubmit: (e: React.FormEvent) => void;
  startDate: Date | null;
  endDate: Date | null;
  showInnerButton: boolean;
  setShowInnerButton: Dispatch<SetStateAction<boolean>>;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
};

export type FlightResponseItem = {
  airlineKorean: string;
  domesticNum: string;
  domesticStartTime: string;
  domesticArrivalTime: string;
};

export type TicketListProps = {
  flights: Flight[];
  sortKey: 'airline' | 'dep_desc' | 'arr_asc' | 'dep_asc' | 'arr_desc';
  sortFlights: (
    flights: Flight[],
    key: 'airline' | 'dep_desc' | 'arr_asc' | 'dep_asc' | 'arr_desc',
  ) => Flight[];
  setSortKey: React.Dispatch<
    React.SetStateAction<
      'airline' | 'dep_desc' | 'arr_asc' | 'dep_asc' | 'arr_desc'
    >
  >;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight) => void;
  startDate: Date | null;
};

export type DateOptionsProps = {
  baseDateStr: string;
  field: 'schDate' | 'returnDate';
  startDate: Date | null;
  setStartDate?: (date: Date | null) => void;
};

export type TicketCardProps = {
  flight: Flight;
  isSelected: boolean;
  onClick: () => void;
};
