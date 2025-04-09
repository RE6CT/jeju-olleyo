import dayjs from 'dayjs';

/**
 * 날짜 문자열을 포맷팅하는 함수
 * @param date 날짜 문자열
 * @returns 포맷팅한 문자열 (25. 04. 08 형식)
 */
export const formatDate = (date: string) => {
  return dayjs(date).format('YY. MM. DD');
};
