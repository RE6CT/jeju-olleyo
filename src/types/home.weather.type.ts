/**
 * Visual Crossing API 응답 구조
 */
export type VisualCrossingResponse = {
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
  weather: ProcessedDayWeather;
  isToday?: boolean;
};
