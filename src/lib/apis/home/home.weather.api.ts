import {
  VisualCrossingResponse,
  ProcessedDayWeather,
  WeatherIcon,
} from '@/types/home.weather.type';

/**
 * 날씨 API 서비스
 */
export const weatherService = {
  /**
   * 제주도 날씨 데이터 가져오기
   */
  async getJejuWeather(): Promise<ProcessedDayWeather[]> {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';
      const res = await fetch(`${API_BASE_URL}/api/weather`, {
        next: {
          revalidate: 21600, // 6시간마다 갱신
          tags: ['weather'],
        },
      });

      if (!res.ok) {
        throw new Error('날씨 데이터를 가져오는데 실패했습니다');
      }

      return await res.json();
    } catch (error) {
      console.error('날씨 데이터 가져오기 오류:', error);
      return [];
    }
  },

  /**
   * API 라우트에서 직접 호출하는 함수
   */
  async fetchWeatherFromAPI(
    apiKey: string,
    location: string = 'Jeju,KR',
  ): Promise<ProcessedDayWeather[]> {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`,
        { next: { revalidate: 86400 } },
      );

      if (!response.ok) {
        throw new Error('날씨 API 호출 실패');
      }

      const data: VisualCrossingResponse = await response.json();

      // 요일 이름 배열
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

      // 데이터 가공 (7일치)
      return data.days.slice(0, 7).map((day) => {
        const date = new Date(day.datetime);
        const dayOfWeek = weekdays[date.getDay()];

        return {
          date: day.datetime,
          dayOfWeek,
          minTemp: Math.round(day.tempmin), // 소수점 제거
          maxTemp: Math.round(day.tempmax), // 소수점 제거
          weatherIcon: day.icon as WeatherIcon,
          weatherCondition: this.translateWeatherCondition(day.conditions),
        };
      });
    } catch (error) {
      console.error('Visual Crossing API 오류:', error);
      return [];
    }
  },

  /**
   * 영어 날씨 상태를 한글로 변환
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
