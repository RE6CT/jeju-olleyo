'use client';

import useJejuWeatherQuery from '@/lib/queries/use-get-weather-query';
import WeatherSkeleton from '@/components/features/home/home-weather-skeleton';
import WeatherError from '@/components/features/home/home-weather-error';
import WeatherHeader from '@/components/features/home/home-weather-header';
import WeatherCardsContainer from '@/components/features/home/home-weather-container';

/**
 * 날씨 섹션 컴포넌트
 * 제주도의 날씨 정보를 표시하는 메인 컴포넌트입니다.
 * 자정 12시에 자동으로 갱신되며, 시스템에 의해 하루 최대 4번 갱신됩니다.
 */
const WeatherSection = () => {
  /**
   * @param weatherData 날씨데이터
   * @param isLoading 로딩여부
   * @param error 에러여부
   * @param weatherMessage 날씨에 따른 텍스트 메세지
   * @param currentDate 일주일 날짜
   */
  const { weatherData, isLoading, error, weatherMessage, currentDate } =
    useJejuWeatherQuery();

  // 처음 로딩 중일 때
  if (isLoading) {
    return <WeatherSkeleton />;
  }

  // 오류가 있을 때
  if (error) {
    return <WeatherError title={weatherMessage.title} errorMessage={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch px-2 sm:gap-5 sm:px-3 md:gap-7 md:px-4 lg:gap-9 lg:px-4">
      <WeatherHeader
        month={currentDate.month}
        day={currentDate.day}
        title={weatherMessage.title}
        subtitle={weatherMessage.subtitle}
      />

      {/* 날씨 카드 컨테이너 */}
      {weatherData.length > 0 && (
        <WeatherCardsContainer weatherData={weatherData} />
      )}
    </div>
  );
};

export default WeatherSection;
