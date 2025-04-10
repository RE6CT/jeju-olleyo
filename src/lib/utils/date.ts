import dayjs from 'dayjs';

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅하는 함수
 * @param date - 포맷팅할 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: string | null): string => {
  return date ? dayjs(date).format('YYYY.MM.DD') : '날짜 미정';
};

/**
 * 날짜가 특정 날짜보다 크거나 같은지 확인하는 함수 (시간 무시)
 * @param date - 비교할 날짜
 * @param targetDate - 기준 날짜
 * @returns boolean
 */
export const isDateGreaterThanOrEqual = (
  date: string | null,
  targetDate: string,
): boolean => {
  if (date === null) return false;

  return (
    dayjs(formatDate(date)).isAfter(formatDate(targetDate)) ||
    dayjs(formatDate(date)).isSame(formatDate(targetDate), 'day')
  );
};

/**
 * 날짜가 특정 날짜보다 작거나 같은지 확인하는 함수 (시간 무시)
 * @param date - 비교할 날짜
 * @param targetDate - 기준 날짜
 * @returns boolean
 */
export const isDateLessThanOrEqual = (
  date: string | null,
  targetDate: string,
): boolean => {
  if (date === null) return false;

  return (
    dayjs(formatDate(date)).isBefore(formatDate(targetDate)) ||
    dayjs(formatDate(date)).isSame(formatDate(targetDate), 'day')
  );
};

/**
 * 일정 생성 및 수정 페이지에서 여행 기간을 포맷팅하는 함수
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 포맷팅된 여행 기간 문자열
 */
export const formatTravelPeriod = (
  startDate: Date | null,
  endDate: Date | null,
): string => {
  if (!startDate || !endDate) return '여행 기간을 선택해주세요';

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = end.diff(start, 'day');

  return `${start.format('YYYY년 MM월 DD일')} ~ ${end.format('YYYY년 MM월 DD일')} | ${days}박 ${days + 1}일`;
};

/**
 * 시작일과 종료일로부터 총 일수를 계산하는 함수
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 총 일수 (일자가 선택되지 않은 경우 0 반환)
 */
export const calculateTotalDays = (
  startDate: Date | null,
  endDate: Date | null,
): number => {
  if (!startDate || !endDate) return 0;
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
