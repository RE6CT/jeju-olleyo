import Image from 'next/image';
import { WeatherCardProps } from '@/types/home.weather.type';
import getWeatherIconSrc from '@/lib/utils/home-weather-image';

/**
 * 날씨 카드 컴포넌트
 */
export default function WeatherCard({ weather }: WeatherCardProps) {
  const iconSrc = getWeatherIconSrc(weather.weatherIcon);

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* 날씨 아이콘 */}
      <div className="relative my-3 h-20 w-20">
        <Image
          src={iconSrc}
          alt={weather.weatherCondition}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
