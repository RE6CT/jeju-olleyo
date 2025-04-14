import {
  ProcessedDayWeather,
  WeatherIcon,
  VisualCrossingResponse,
} from '@/types/home.weather.type';

/**
 * 날씨 API 관련 함수들
 */
export const weatherApi = {
  /**
   * 제주도 날씨 데이터 가져오기
   * @param options API 호출 옵션
   * @returns 가공된 날씨 데이터 배열
   */
  async getJejuWeather(
    options: { skipCache?: boolean } = {},
  ): Promise<ProcessedDayWeather[]> {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

      // URL 생성 (새로고침 옵션 포함)
      let apiUrl = `${API_BASE_URL}/api/weather`;
      if (options.skipCache) {
        apiUrl += '?fresh=true';
      }

      // 기본 fetch 옵션
      const fetchOptions: RequestInit = {};

      // 캐시를 건너뛰는 옵션 (새로고침 시)
      if (options.skipCache) {
        fetchOptions.cache = 'no-store';
      }

      const res = await fetch(apiUrl, fetchOptions);

      if (!res.ok) {
        throw new Error('날씨 데이터를 가져오는데 실패했습니다');
      }

      const response = await res.json();

      // 새 API 응답 구조 확인
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response)) {
        // 이전 구조 (배열만 응답)도 지원
        return response;
      }

      return [];
    } catch (error) {
      console.error('날씨 데이터 가져오기 오류:', error);
      return [];
    }
  },

  /**
   * 외부 Visual Crossing API에서 날씨 데이터 가져오기
   * @param apiKey Visual Crossing API 키
   * @param location 날씨를 조회할 위치 (기본값: 'Jeju,KR')
   * @param forceFresh 캐시를 무시하고 새로운 데이터를 가져올지 여부
   * @returns 가공된 날씨 데이터 배열
   */
  async fetchWeatherFromAPI(
    apiKey: string,
    location: string = 'Jeju,KR',
    forceFresh: boolean = false,
  ): Promise<ProcessedDayWeather[]> {
    try {
      // 기본 fetch 옵션 설정
      const fetchOptions: RequestInit & {
        next?: {
          revalidate?: number;
          tags?: string[];
        };
      } = {};

      // 강제 갱신 시 캐시 옵션 변경
      if (forceFresh) {
        fetchOptions.cache = 'no-store';
      } else {
        fetchOptions.next = {
          revalidate: 86400, // 24시간
        };
      }

      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`,
        fetchOptions,
      );

      if (!response.ok) {
        throw new Error('날씨 API 호출 실패');
      }

      const data: VisualCrossingResponse = await response.json();
      return this.processWeatherData(data);
    } catch (error) {
      console.error('Visual Crossing API 오류:', error);
      return [];
    }
  },

  /**
   * 날씨 API 응답 데이터 가공
   * @param data Visual Crossing API 응답 데이터
   * @returns 가공된 날씨 데이터 배열
   */
  processWeatherData(data: VisualCrossingResponse): ProcessedDayWeather[] {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    return data.days.slice(0, 7).map((day) => {
      const date = new Date(day.datetime);
      const dayOfWeek = weekdays[date.getDay()];

      return {
        date: day.datetime,
        dayOfWeek,
        minTemp: Math.round(day.tempmin),
        maxTemp: Math.round(day.tempmax),
        weatherIcon: day.icon as WeatherIcon,
        weatherCondition: this.translateWeatherCondition(day.conditions),
      };
    });
  },

  /**
   * 영어 날씨 상태를 한글로 변환
   * @param condition 영문 날씨 상태
   * @returns 한글로 번역된 날씨 상태
   */
  translateWeatherCondition(condition: string): string {
    const conditionMap: Record<string, string> = {
      Clear: '맑음',
      'Partially cloudy': '구름 조금',
      Overcast: '흐림',
      Rain: '비',
      'Rain, Partially cloudy': '구름 조금, 비',
      'Rain, Overcast': '흐림, 비',
      Snow: '눈',
      'Snow, Partially cloudy': '구름 조금, 눈',
      'Snow, Overcast': '흐림, 눈',
      Thunderstorm: '천둥번개',
      Fog: '안개',
      'Freezing Drizzle/Freezing Rain': '동결성 비',
      Drizzle: '이슬비',
    };

    return conditionMap[condition] || condition;
  },
};
