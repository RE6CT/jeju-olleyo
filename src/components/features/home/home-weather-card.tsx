import Image from 'next/image';
import { WeatherCardProps } from '@/types/home.weather.type';
import getWeatherIconSrc from '@/lib/utils/home-weather-image';

/**
 * 날씨 카드 컴포넌트
 * 화면 크기에 따라 요소 크기가 조절되는 반응형 디자인을 적용했습니다.
 * - 기본(~480px): 모바일 세로
 * - sm(481px~768px): 모바일 가로, 태블릿 세로
 * - md(769px~1024px): 태블릿 가로, 노트북
 * - lg(1025px~): 데스크탑
 */
const WeatherCard = ({ weather, isToday }: WeatherCardProps) => {
  const iconSrc = getWeatherIconSrc(weather.weatherIcon);

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      {/* 날짜 */}
      <div className="sm:text-11 self-stretch text-center text-10 font-medium not-italic text-gray-900 md:text-12 lg:text-12">
        {isToday ? '오늘' : weather.dayOfWeek + '요일'}
      </div>

      {/* 날씨 아이콘 */}
      <div className="md:h-18 md:w-18 relative my-2 h-14 w-14 sm:my-2.5 sm:h-16 sm:w-16 md:my-3 lg:my-3 lg:h-20 lg:w-20">
        <Image
          src={iconSrc}
          alt={weather.weatherCondition}
          fill
          sizes="(max-width: 480px) 3.5rem, (max-width: 768px) 4rem, (max-width: 1024px) 4.5rem, 5rem"
          className="object-contain"
          priority={isToday} // 오늘 날씨는 우선적으로 로드
        />
      </div>

      {/* 최고/최저 기온 */}
      <div className="mt-1 flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="text-center text-10 font-regular not-italic text-gray-900 sm:text-10 md:text-10 lg:text-12">
            최저
          </div>
          <div className="text-10 text-blue sm:text-12 md:text-14 lg:text-16">
            {weather.minTemp}°
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-center text-10 font-regular not-italic text-gray-900 sm:text-10 md:text-10 lg:text-12">
            최고
          </div>
          <div className="text-10 text-red sm:text-12 md:text-14 lg:text-16">
            {weather.maxTemp}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
