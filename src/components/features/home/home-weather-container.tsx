'use client';

import { memo } from 'react';

import WeatherCard from '@/components/features/home/home-weather-card';
import { WeatherCardsContainerProps } from '@/types/home.weather.type';

/**
 * 날씨 카드들을 담는 컨테이너 컴포넌트
 * 여러 날씨 카드를 가로로 스크롤 가능하게 표시합니다.
 * @param weatherData 날씨 데이터 배열
 */
const WeatherCardsContainer = memo(
  ({ weatherData }: WeatherCardsContainerProps) => {
    return (
      <div className="w-full max-w-4xl overflow-x-auto pb-2 sm:pb-2 md:pb-3 lg:pb-4">
        <div className="flex min-w-fit justify-center gap-2 px-1 sm:gap-3 sm:px-2 md:gap-5 md:px-2 lg:gap-7 lg:px-2">
          {weatherData.map((day, index) => (
            <div
              key={`day-${index}`}
              className="md:w-18 flex w-14 flex-shrink-0 flex-col items-center justify-center sm:w-16 lg:w-20"
            >
              <WeatherCard weather={day} isToday={index === 0} />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

// 개발 환경에서 컴포넌트 이름 표시 (디버깅 도움)
WeatherCardsContainer.displayName = 'WeatherCardsContainer';

export default WeatherCardsContainer;
