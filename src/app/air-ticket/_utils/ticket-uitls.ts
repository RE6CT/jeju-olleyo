import dayjs from 'dayjs';
import { Flight } from '../../../types/air-ticket.type';

export type SortKey =
  | 'airline'
  | 'dep_desc'
  | 'arr_asc'
  | 'dep_asc'
  | 'arr_desc';

const sortFlights = (
  flights: Flight[],
  key: 'airline' | 'dep_desc' | 'arr_asc' | 'dep_asc' | 'arr_desc',
) => {
  return [...flights].sort((a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';
    let isAsc = true;

    switch (key) {
      case 'airline':
        aVal = a.airlineKorean;
        bVal = b.airlineKorean;
        isAsc = true;
        break;
      case 'dep_asc':
        aVal = a.depPlandTime;
        bVal = b.depPlandTime;
        isAsc = true;
        break;
      case 'dep_desc':
        aVal = a.depPlandTime;
        bVal = b.depPlandTime;
        isAsc = false;
        break;
      case 'arr_asc':
        aVal = a.arrPlandTime;
        bVal = b.arrPlandTime;
        isAsc = true;
        break;
      case 'arr_desc':
        aVal = a.arrPlandTime;
        bVal = b.arrPlandTime;
        isAsc = false;
        break;
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return isAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return isAsc ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};

const formatTime = (timeStr: string) => {
  if (!timeStr || timeStr.length !== 4) return timeStr;
  return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
};
type Airport = {
  label: string;
  value: string;
};

const departureList: Airport[] = [
  { label: '부산', value: 'PUS' },
  { label: '김포', value: 'GMP' },
  { label: '인천', value: 'ICN' },
  { label: '광주', value: 'KWJ' },
  { label: '무안', value: 'MWX' },
  { label: '군산', value: 'KUV' },
  { label: '대구', value: 'TAE' },
  { label: '진주', value: 'HIN' },
  { label: '여수', value: 'RSU' },
  { label: '울산', value: 'USN' },
  { label: '원주', value: 'WJU' },
  { label: '청주', value: 'CJJ' },
  { label: '포항', value: 'KPO' },
  { label: '양양', value: 'YNY' },
];

export const formatTicketPeriod = (value: string | null): string => {
  if (!value) return '출발일자  |  도착 일자';
  return value.replace(' - ', ' | ');
};

const getAirportLabel = (code: string): string => {
  return departureList.find((item) => item.value === code)?.label ?? code;
};

export const formatDateToString = (date: Date | string | null): string => {
  return date ? dayjs(date).format('YYYYMMDD') : '';
};
export const combineDateAndTime = (date: Date, timeStr: string): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);

  return new Date(
    `${year}-${month}-${day}T${hours}:${minutes}:00`,
  ).toISOString();
};

export { sortFlights, formatTime, getAirportLabel };
