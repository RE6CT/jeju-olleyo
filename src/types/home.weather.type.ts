import { QueryFunction, UseQueryOptions } from '@tanstack/react-query';

/**
 * Visual Crossing API 응답 구조
 */
export type VisualCrossingResponse = {
  /** 날씨 일별 데이터 배열 */
  days: DayWeather[];
};

/**
 * API에서 받는 날씨 데이터 구조
 */
export type DayWeather = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  conditions: string;
  icon: string;
};

/**
 * 날씨 아이콘 타입
 */
export type WeatherIcon =
  | 'snow'
  | 'rain'
  | 'fog'
  | 'wind'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'clear-day'
  | 'clear-night'
  | 'thunder'
  | 'thunder-rain'
  | 'thunder-showers-day'
  | 'thunder-showers-night'
  | 'showers-day'
  | 'showers-night';

/**
 * 실제 앱에서 사용할 가공된 날씨 데이터
 */
export type ProcessedDayWeather = {
  date: string;
  dayOfWeek: string;
  minTemp: number;
  maxTemp: number;
  weatherIcon: WeatherIcon;
  weatherCondition: string;
};

/**
 * 날씨 카드 컴포넌트 props
 */
export type WeatherCardProps = {
  /** 날씨 데이터 */
  weather: ProcessedDayWeather;
  isToday?: boolean;
};

/**
 * 날씨 메시지 타입
 */
export type WeatherMessage = {
  title: string;
  subtitle: string;
};

/**
 * 날씨 API 응답 타입
 */
export type WeatherApiResponse = {
  /** 날씨 데이터 배열 */
  data: ProcessedDayWeather[];
  /** 마지막 업데이트 시간 (ISO 문자열) */
  lastUpdated: string;
};

/**
 * 날씨 서비스 fetch 옵션 타입
 */
export type WeatherFetchOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

/**
 * 날씨 헤더 컴포넌트 Props
 */
export type WeatherHeaderProps = {
  month: number;
  day: number;
  title: string;
  subtitle: string;
};

/**
 * 날씨 카드 컨테이너 Props
 */
export type WeatherCardsContainerProps = {
  /** 날씨 데이터 배열 */
  weatherData: ProcessedDayWeather[];
};

/**
 * 날씨 오류 컴포넌트 Props
 */
export type WeatherErrorProps = {
  title: string;
  errorMessage: string;
};

/**
 * useJejuWeatherQuery 훅 반환 타입
 */
export type UseJejuWeatherReturn = {
  /** 날씨 데이터 배열 */
  weatherData: ProcessedDayWeather[];
  isLoading: boolean;
  error: string | null;
  weatherMessage: WeatherMessage;
  currentDate: {
    month: number;
    day: number;
  };
};
