import { useEffect, useState, useCallback, useRef } from 'react';
import {
  ProcessedDayWeather,
  WeatherMessage,
  UseJejuWeatherReturn,
} from '@/types/home.weather.type';
import { weatherApi } from '@/lib/apis/home/home.weather.api';
import { weatherUtil } from '@/lib/utils/home.weather.util';

/**
 * 제주도 날씨 데이터를 가져오는 커스텀 훅
 * 자정에 자동으로 데이터가 갱신됩니다.
 * @returns 날씨 관련 상태와 데이터
 */
export function useJejuWeatherQuery(): UseJejuWeatherReturn {
  const [weatherData, setWeatherData] = useState<ProcessedDayWeather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherMessage, setWeatherMessage] = useState<WeatherMessage>({
    title: '오늘의 제주 날씨는?',
    subtitle: '날씨 정보를 불러오는 중입니다...',
  });

  // 타이머 참조를 저장하기 위한 ref
  const midnightTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 현재 월과 일 가져오기
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  /**
   * 날씨 데이터 가져오기 함수
   */
  const fetchWeatherData = useCallback(async () => {
    try {
      setIsLoading(true);

      // 최신 데이터 가져오기
      const data = await weatherApi.getJejuWeather({ skipCache: true });

      if (data.length === 0) {
        setError('날씨 데이터를 가져오는데 실패했습니다');
      } else {
        setWeatherData(data);

        // 오늘(첫 번째 데이터)의 날씨 상태로 메시지 설정
        if (data[0]) {
          const message = weatherUtil.getWeatherMessage(data[0].weatherIcon);
          setWeatherMessage(message);
        }

        // 오류 상태 초기화
        setError(null);
      }
    } catch (err) {
      setError('날씨 데이터를 가져오는데 오류가 발생했습니다');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 자정에 실행할 핸들러 설정
   */
  const setupMidnightRefresh = useCallback(() => {
    // 이전 타이머가 있으면 정리
    if (midnightTimerRef.current) {
      clearTimeout(midnightTimerRef.current);
    }

    // 다음 자정까지의 시간
    const msUntilMidnight = weatherUtil.calculateMsUntilMidnight();

    // 자정에 실행할 타이머 설정
    midnightTimerRef.current = setTimeout(async () => {
      // 데이터 새로고침
      await fetchWeatherData();

      // 다음 자정에 대한 타이머 설정
      setupMidnightRefresh();
    }, msUntilMidnight);
  }, [fetchWeatherData]);

  // 컴포넌트 마운트 시 데이터 가져오기 및 자정 타이머 설정
  useEffect(() => {
    fetchWeatherData();
    setupMidnightRefresh();

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (midnightTimerRef.current) {
        clearTimeout(midnightTimerRef.current);
      }
    };
  }, [fetchWeatherData, setupMidnightRefresh]);

  return {
    weatherData,
    isLoading,
    error,
    weatherMessage,
    currentDate: {
      month,
      day,
    },
  };
}
