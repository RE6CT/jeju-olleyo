import Image from 'next/image';
import { WeatherCardProps } from '@/types/home.weather.type';
import getWeatherIconSrc from '@/lib/utils/home-weather-image';

/**
 * 날씨 카드 컴포넌트
 */
export default function WeatherCard({ weather, isToday }: WeatherCardProps) {
  const iconSrc = getWeatherIconSrc(weather.weatherIcon);

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* 날짜 */}
      <div className="self-stretch text-center text-12 font-medium not-italic text-gray-900">
        {isToday ? '오늘' : weather.dayOfWeek + '요일'}
      </div>

      {/* 날짜(YYYY-MM-DD) */}
      <div className="text-12 text-gray-500">{weather.date}</div>

      {/* 날씨 아이콘 */}
      <div className="relative my-3 h-20 w-20">
        <Image
          src={iconSrc}
          alt={weather.weatherCondition}
          fill
          className="object-contain"
        />
      </div>

      {/* 날씨 상태 */}
      <div className="text-14">{weather.weatherCondition}</div>

      {/* 최고/최저 기온 */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center text-blue">
          <div className="text-center text-10 font-regular not-italic text-gray-900">
            최저
          </div>
          <div className="flex items-center justify-center gap-2.5 self-stretch text-blue">
            {weather.minTemp}°
          </div>
        </div>
        <div className="flex flex-col items-center text-blue">
          <div className="text-center text-10 font-regular not-italic text-gray-900">
            최고
          </div>
          <div className="flex items-center justify-center gap-2.5 self-stretch text-red">
            {weather.maxTemp}°
          </div>
        </div>
      </div>
    </div>
  );
}
