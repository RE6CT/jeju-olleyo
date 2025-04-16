import { Dispatch, SetStateAction } from 'react';

export type Flight = {
  airlineKorean: string;
  flightId: string;
  depPlandTime: string;
  arrPlandTime: string;
};

export type FlightSearchFormProps = {
  departureList: { label: string; value: string }[];
  departure: string;
  setDeparture: Dispatch<SetStateAction<string>>;
  formData: { schDate: string; returnDate: string; schArrvCityCode: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export type FlightListProps = {
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
};

export type DateOptionsProps = {
  formData: {
    schDate: string;
    returnDate: string;
    schArrvCityCode: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      schDate: string;
      returnDate: string;
      schArrvCityCode: string;
    }>
  >;
  field: 'schDate' | 'returnDate';
  baseDateStr: string;
};

export type TicketCardProps = {
  flight: Flight;
  idx: number;
};
