'use client';

import { memo } from 'react';
import Image from 'next/image';
import { WeatherCardProps } from '@/types/home.weather.type';
import { weatherUtil } from '@/lib/utils/home.weather.util';

/**
 * 날씨 카드 컴포넌트
 * 날씨 아이콘, 요일, 최고/최저 기온을 표시합니다.
 *
 * @param weather 날씨 데이터 객체
 * @param isToday 오늘 날씨인지 여부
 */
const WeatherCard = memo(({ weather, isToday = false }: WeatherCardProps) => {
  const iconSrc = weatherUtil.getWeatherIconSrc(weather.weatherIcon);

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* 날짜 */}
      <div className="md:text-11 flex justify-center self-stretch text-center text-10 font-medium not-italic text-gray-900 sm:text-10 lg:text-12">
        {isToday ? '오늘' : weather.dayOfWeek + '요일'}{' '}
        <div className="mx-1 h-4 w-px bg-gray-300 sm:mx-2 sm:h-4"></div>
        {weather.date.slice(weather.date.length - 2, weather.date.length) +
          '일'}
      </div>

      {/* 날씨 아이콘 */}
      <div className="relative my-2 h-10 w-10 sm:my-2.5 sm:h-10 sm:w-10 md:my-3 md:h-12 md:w-12 lg:my-3 lg:h-14 lg:w-14">
        <Image
          src={iconSrc}
          alt={weather.weatherCondition}
          fill
          sizes="(max-width: 480px) 3.5rem, (max-width: 768px) 4rem, (max-width: 1024px) 4.5rem, 5rem"
          className="object-contain"
          priority={isToday} // 오늘 날씨는 우선적으로 로드
          loading={isToday ? 'eager' : 'lazy'} // 오늘 날씨 이미지는 즉시 로드, 나머지는 지연 로드
        />
      </div>

      {/* 날씨 상태 */}
      <div className="px-1 text-center text-10 sm:text-12 md:text-14">
        {weather.weatherCondition}
      </div>

      {/* 최고/최저 기온 */}
      <div className="mt-1 flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="text-10 text-blue sm:text-12 md:text-14 lg:text-16">
            {weather.minTemp}°
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-10 text-red sm:text-12 md:text-14 lg:text-16">
            {weather.maxTemp}°
          </div>
        </div>
      </div>
    </div>
  );
});

// 개발 환경에서 컴포넌트 이름 표시 (디버깅 도움)
WeatherCard.displayName = 'WeatherCard';

export default WeatherCard;
