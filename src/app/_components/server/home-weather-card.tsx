import Image from 'next/image';
import { memo } from 'react';

import { weatherUtil } from '@/lib/utils/home.weather.util';
import { WeatherCardProps } from '@/types/home.weather.type';
import { Separator } from '@/components/ui/separator';

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
    <div className="flex w-[100px] flex-1 flex-col items-center rounded-12 bg-white px-3 py-[10px] md:w-[64px] md:bg-none md:p-0">
      {/* 날짜 */}
      <div className="regular-12 flex items-center justify-center gap-1 whitespace-nowrap text-center text-gray-500">
        {isToday ? '오늘' : weather.dayOfWeek + '요일'}{' '}
        <Separator orientation="vertical" className="h-3 bg-gray-200" />
        {weather.date.slice(weather.date.length - 2, weather.date.length) +
          '일'}
      </div>

      {/* 날씨 아이콘 */}
      <div className="relative my-2 h-10 w-10 md:my-3 md:h-12 md:w-12 lg:my-3 lg:h-20 lg:w-20">
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
      <div className="regular-10 px-1 text-center text-gray-900">
        {weather.weatherCondition}
      </div>

      {/* 최고/최저 기온 */}
      <div className="mt-1 flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="medium-14 text-blue">{weather.minTemp}°</div>
        </div>
        <span className="medium-14 text-gray-200">/</span>
        <div className="flex flex-col items-center">
          <div className="medium-14 text-red">{weather.maxTemp}°</div>
        </div>
      </div>
    </div>
  );
});

export default WeatherCard;
