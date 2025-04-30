import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅하는 함수
 * @param date - 포맷팅할 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: string | null): string => {
  return date ? dayjs(date).format('YYYY.MM.DD') : '날짜 미정';
};

/**
 * 날짜를 YY.MM.DD 형식으로 포맷팅하는 함수
 * @param date - 포맷팅할 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDateShortYear = (date: string | null): string => {
  return date ? dayjs(date).format('YY.MM.DD') : '날짜 미정';
};

/**
 * 시간을 '오전/오후 H:MM' 형식으로 포맷팅하는 함수
 * @param time - 포맷팅할 시간 문자열 또는 Date 객체
 * @returns 포맷팅된 시간 문자열 (예: '오후 6:20')
 */
export const formatTime = (time: string | Date | null): string => {
  if (!time) return '시간 미정';

  const date = typeof time === 'string' ? new Date(time) : time;
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // 오전/오후 구분
  const ampm = hours < 12 ? '오전' : '오후';
  const formattedHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  // 분은 항상 두 자리로 표시
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${ampm} ${formattedHours}:${formattedMinutes}`;
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

/**
 * 날짜를 YYYY.MM.DD (요일) 형식으로 포맷팅하는 함수
 * @param date - 포맷팅할 날짜
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDateWithKoreanDay = (date: Date): string => {
  const KOREAN_DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = KOREAN_DAYS[date.getDay()];
  return dayjs(date).format('YYYY.MM.DD') + ` (${dayOfWeek})`;
};

/**
 * 시작일로부터 특정 일차의 날짜를 계산하고 포맷팅하는 함수
 * @param startDate - 시작 날짜
 * @param dayIndex - 일차 (1부터 시작)
 * @returns 포맷팅된 날짜 문자열 또는 null
 */
export const formatDayDate = (
  startDate: Date | null,
  dayIndex: number,
): string | null => {
  if (!startDate) return null;
  const date = dayjs(startDate)
    .add(dayIndex - 1, 'day')
    .toDate();
  return formatDateWithKoreanDay(date);
};

/**
 * 특정 날짜가 시작일과 종료일 사이에 있는지 확인하는 함수
 * @param date - 확인할 날짜
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param timezone - 브라우저 사용자 시간대 (기본값: 'Asia/Seoul')
 * @returns boolean
 */
export const isDateInRange = (
  date: string,
  startDate: string,
  endDate: string,
  timezone: string = 'Asia/Seoul',
) => {
  const targetDate = dayjs(date).tz(timezone);
  const start = dayjs(startDate).tz(timezone);
  const end = dayjs(endDate).tz(timezone);

  return (
    targetDate.isSameOrAfter(start, 'day') &&
    targetDate.isSameOrBefore(end, 'day')
  );
};

/**
 * 여행 기간을 간단하게 포맷팅하는 함수
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 포맷팅된 여행 기간 문자열
 */
export const formatSimpleTravelPeriod = (
  startDate: Date | null,
  endDate: Date | null,
): string => {
  if (!startDate || !endDate) return '여행 기간을 선택해주세요';

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  return `${start.format('YYYY.MM.DD')}~${end.format('MM.DD')}`;
};
