'use client';

import { memo, useRef } from 'react';
import WeatherCard from '@/app/_components/server/home-weather-card';
import { WeatherCardsContainerProps } from '@/types/home.weather.type';
import useDragScroll from '@/lib/hooks/use-drag-scroll';

/**
 * 날씨 카드들을 담는 컨테이너 컴포넌트
 * 여러 날씨 카드를 가로로 스크롤 가능하게 표시합니다.
 * @param weatherData 날씨 데이터 배열
 */
const WeatherCardsContainer = memo(
  ({ weatherData }: WeatherCardsContainerProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useDragScroll(scrollContainerRef, { threshold: 5 });

    return (
      <div
        className="w-full cursor-grab select-none overflow-x-auto"
        ref={scrollContainerRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          userSelect: 'none',
        }}
      >
        <div className="flex min-w-fit justify-center gap-2 px-4 md:gap-6 md:px-0 lg:gap-8">
          {weatherData.map((day, index) => (
            <div
              key={`day-${index}`}
              className="flex flex-shrink-0 flex-col items-center justify-center"
            >
              <WeatherCard weather={day} isToday={index === 0} />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default WeatherCardsContainer;
