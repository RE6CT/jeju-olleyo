/**
 * Visual Crossing 날씨 API의 응답 타입
 */
export type VisualCrossingResponse = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: VisualCrossingDay[];
  alerts: unknown[];
  stations: Record<string, unknown>;
  currentConditions: Record<string, unknown>;
};

/**
 * Visual Crossing API 일간 날씨 데이터 타입
 */
export type VisualCrossingDay = {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string[] | null;
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations: string[];
  source: string;
};

/**
 * 날씨 아이콘 타입
 */
export type WeatherIcon =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'rain'
  | 'showers-day'
  | 'showers-night'
  | 'fog'
  | 'wind'
  | 'snow'
  | 'thunder'
  | 'thunder-rain'
  | 'thunder-showers-day'
  | 'thunder-showers-night';

/**
 * 가공된 일간 날씨 데이터 타입
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
 * 날씨 카드 props 타입
 */
export type WeatherCardProps = {
  /** 날씨 데이터 */
  weather: ProcessedDayWeather;
  isToday?: boolean;
};

/**
 * 날씨 카드 컨테이너 props 타입
 */
export type WeatherCardsContainerProps = {
  /** 날씨 데이터 배열 */
  weatherData: ProcessedDayWeather[];
};

/**
 * 날씨 오류 컴포넌트 props 타입
 */
export type WeatherErrorProps = {
  errorMessage: string;
};

/**
 * 날씨 헤더 컴포넌트 props 타입
 */
export type WeatherHeaderProps = {
  month: number;
  day: number;
  subtitle: string;
};

/**
 * 날씨 메시지 타입
 */
export type WeatherMessage = {
  subtitle: string;
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

/**
 * 정적 날씨 데이터 결과 타입
 */
export type StaticWeatherResult = {
  /** 날씨 데이터 배열 */
  weatherData: ProcessedDayWeather[];
  error: string | null;
};

/**
 * 날씨 스토어 상태 인터페이스
 */
export type WeatherState = {
  /** 날씨 데이터 배열 */
  weatherData: ProcessedDayWeather[];
  lastUpdated: string | null;
  error: string | null;
  setWeatherData: (data: ProcessedDayWeather[]) => void;
  setLastUpdated: (timestamp: string) => void;
  setError: (error: string | null) => void;
};
