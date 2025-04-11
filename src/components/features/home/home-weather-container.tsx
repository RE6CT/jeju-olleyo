'use client';

import { useEffect, useState } from 'react';
import { ProcessedDayWeather } from '@/types/home.weather.type';
import WeatherCard from './home-weather-card';
import { weatherService } from '@/lib/apis/home/home.weather.api';
import getWeatherMessage from '@/lib/utils/home-weather-messages';

/**
 * 날씨 섹션 컴포넌트
 * 화면 크기에 따라 요소 크기가 조절되는 반응형 디자인을 적용했습니다.
 * - 기본(~480px): 모바일 세로
 * - sm(481px~768px): 모바일 가로, 태블릿 세로
 * - md(769px~1024px): 태블릿 가로, 노트북
 * - lg(1025px~): 데스크탑
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
          <div className="mb-4 h-5 w-3/4 rounded bg-gray-200 sm:h-5 md:h-6 lg:h-6"></div>
          <div className="mb-6 h-3 w-1/2 rounded bg-gray-200 sm:h-3.5 md:h-4 lg:h-4"></div>
          <div className="flex justify-center space-x-2 overflow-x-auto pb-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="sm:h-26 md:w-18 h-24 w-14 flex-shrink-0 rounded bg-gray-200 sm:w-16 md:h-28 lg:h-32 lg:w-20"
              ></div>
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
        <h2 className="mb-2 text-16 font-semibold text-gray-800 sm:text-16 md:text-18 lg:text-20">
          {weatherMessage.title}
        </h2>
        <p className="text-red">{error}</p>
      </div>
    );
  }

  // 날씨 데이터가 있을 때
  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch px-2 sm:gap-5 sm:px-3 md:gap-7 md:px-4 lg:gap-9 lg:px-4">
      <div className="flex w-full flex-col items-start justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2">
        <div className="flex w-full justify-center text-center text-12 font-semibold not-italic sm:text-14 md:text-14 lg:text-16">
          <h2 className="text-primary-500/60">
            {month}월 {day}일
          </h2>
          <span className="text-secondary-300">,</span>
          <h2 className="text-gray-900">{weatherMessage.title}</h2>
        </div>
        <p className="self-stretch text-center text-14 font-semibold not-italic text-gray-900 sm:text-16 md:text-18 lg:text-20">
          {weatherMessage.subtitle}
        </p>
      </div>

      {/* 날씨 카드 컨테이너 */}
      <div className="w-full max-w-4xl overflow-x-auto pb-2 sm:pb-2 md:pb-3 lg:pb-4">
        {/* 고정된 너비의 내부 컨테이너 - 모바일에서 스크롤 가능하게 유지 */}
        <div className="flex min-w-fit justify-center gap-2 px-1 sm:gap-3 sm:px-2 md:gap-5 md:px-2 lg:gap-7 lg:px-2">
          {weatherData.map((day, index) => (
            <div
              key={`day-${index}`}
              className="md:w-18 flex w-14 flex-shrink-0 flex-col items-center justify-center sm:w-16 lg:w-20"
            >
              {/* 날씨 카드 */}
              <WeatherCard weather={day} isToday={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;
