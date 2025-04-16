import { Flight } from '../_type/type';

export type SortKey = 'airline' | 'dep' | 'arr';
export type SortOrder = 'asc' | 'desc';

const sortFlights = (
  flights: Flight[],
  key: 'airline' | 'dep' | 'arr',
  order: 'asc' | 'desc',
) => {
  const sorted = [...flights].sort((a, b) => {
    let aVal, bVal;

    if (key === 'airline') {
      aVal = a.airlineKorean;
      bVal = b.airlineKorean;
    } else if (key === 'dep') {
      aVal = a.depPlandTime;
      bVal = b.depPlandTime;
    } else if (key === 'arr') {
      aVal = a.arrPlandTime;
      bVal = b.arrPlandTime;
    }

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return sorted;
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
  { label: '서울', value: 'SEL' },
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

const getAirportLabel = (code: string): string => {
  return departureList.find((item) => item.value === code)?.label ?? code;
};

export { sortFlights, formatTime, getAirportLabel };
