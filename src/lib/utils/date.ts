import dayjs from 'dayjs';

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅하는 함수
 * @param date - 포맷팅할 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: string | null): string => {
  return date ? dayjs(date).format('YYYY.MM.DD') : '날짜 미정';
};
