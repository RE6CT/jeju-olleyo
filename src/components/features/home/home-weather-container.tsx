'use client';

import { useEffect, useState } from 'react';
import { ProcessedDayWeather } from '@/types/home.weather.type';
import WeatherCard from './home-weather-card';
import { weatherService } from '@/lib/apis/home/home.weather.api';
import getWeatherMessage from '@/lib/utils/home-weather-messages';

/**
 * 날씨 섹션 컴포넌트
 */
const WeatherSection = () => {
  const [weatherData, setWeatherData] = useState<ProcessedDayWeather[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weatherMessage, setWeatherMessage] = useState({
    title: '오늘의 제주 날씨는?',
    subtitle: '날씨 정보를 불러오는 중입니다...',
  });

  // 현재 월과 일 가져오기
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // 페이지 로드 시 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        const data = await weatherService.getJejuWeather();

        if (data.length === 0) {
          setError('날씨 데이터를 가져오는데 실패했습니다');
        } else {
          setWeatherData(data);

          // 오늘(첫 번째 데이터)의 날씨 상태로 메시지 설정
          if (data[0]) {
            const message = getWeatherMessage(data[0].weatherIcon);
            setWeatherMessage(message);
          }
        }
      } catch (err) {
        setError('날씨 데이터를 가져오는데 오류가 발생했습니다');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl rounded-lg p-4">
        <div className="animate-pulse">
          <div className="mb-4 h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-8 h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="h-32 rounded bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 오류가 있을 때
  if (error) {
    return (
      <div className="mx-auto w-full max-w-4xl rounded-lg p-4">
        <h2 className="mb-2 text-20 font-semibold text-gray-800">
          {weatherMessage.title}
        </h2>
        <p className="text-red">{error}</p>
      </div>
    );
  }

  // 날씨 데이터가 있을 때
  return (
    <div className="flex flex-col items-center justify-center gap-9 self-stretch">
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex w-full justify-center text-center text-base font-semibold not-italic">
          <h2 className="text-primary-500/60">
            {month}월 {day}일
          </h2>
          <span className="text-secondary-300">,</span>
          <h2 className="text-gray-900">{weatherMessage.title}</h2>
        </div>
        <p className="semibold-20 self-stretch text-center not-italic text-gray-900">
          {weatherMessage.subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-7 md:flex-nowrap overflow-x-auto pb-2">
        {/* 요일 헤더 */}
        {weatherData.map((day, index) => (
          <div
            key={`day-${index}`}
            className="flex w-20 flex-col items-center justify-center gap-2"
          >
            {/* 날씨 카드 */}
            <WeatherCard weather={day} isToday={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSection;
