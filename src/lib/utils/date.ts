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
