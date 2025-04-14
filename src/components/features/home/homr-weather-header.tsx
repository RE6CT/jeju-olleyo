'use client';

import { WeatherHeaderProps } from '@/types/home.weather.type';

/**
 * 날씨 섹션의 헤더 컴포넌트
 * 제목, 부제목과 날짜 정보를 표시합니다.
 */
const WeatherHeader = ({ month, day, title, subtitle }: WeatherHeaderProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2">
      <div className="flex w-full justify-center text-center text-12 font-semibold not-italic sm:text-14 md:text-14 lg:text-16">
        <h2 className="text-primary-500/60">
          {month}월 {day}일
        </h2>
        <span className="text-secondary-300">,</span>
        <h2 className="text-gray-900">{title}</h2>
      </div>

      <p className="self-stretch text-center text-14 font-semibold not-italic text-gray-900 sm:text-16 md:text-18 lg:text-20">
        {subtitle}
      </p>
    </div>
  );
};

export default WeatherHeader;
