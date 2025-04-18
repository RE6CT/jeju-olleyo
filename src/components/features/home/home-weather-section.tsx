import { Suspense } from 'react';

import WeatherCardsContainer from '@/components/features/home/home-weather-container';
import WeatherError from '@/components/features/home/home-weather-error';
import WeatherHeader from '@/components/features/home/home-weather-header';
import { WeatherRefresher } from '@/components/features/home/home-weather-refresher';
import { getStaticWeatherData } from '@/lib/apis/home/home.weather.api';
import { weatherUtil } from '@/lib/utils/home.weather.util';

/**
 * 날씨 섹션 컴포넌트
 *
 * @description 서버 컴포넌트로 변환하여 빌드/재검증 시점에 데이터를 가져오는 방식으로 변경
 * 초기 로딩 성능을 최적화하고, 클라이언트에서는 필요 시에만 데이터를 갱신합니다.
 */
const WeatherSection = async () => {
  // 서버에서 날씨 데이터 가져오기 (SSG/ISR)
  const { weatherData, error } = await getStaticWeatherData();

  // 현재 날짜 정보
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // 날씨 메시지 생성
  const weatherMessage =
    weatherData.length > 0
      ? weatherUtil.getWeatherMessage(weatherData[0].weatherIcon)
      : {
          title: '오늘의 제주 날씨는?',
          subtitle: '날씨 정보를 불러오는 중입니다...',
        };

  // 오류가 있을 때
  if (error) {
    return <WeatherError title={weatherMessage.title} errorMessage={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 self-stretch px-2 sm:gap-5 sm:px-3 md:gap-7 md:px-4 lg:gap-9 lg:px-4">
      <WeatherHeader
        month={month}
        day={day}
        title={weatherMessage.title}
        subtitle={weatherMessage.subtitle}
      />

      {/* 날씨 카드 컨테이너 */}
      {weatherData.length > 0 && (
        <WeatherCardsContainer weatherData={weatherData} />
      )}

      {/* 클라이언트 사이드에서 날씨 데이터 갱신을 위한 컴포넌트 */}
      <Suspense fallback={null}>
        <WeatherRefresher initialWeatherData={weatherData} />
      </Suspense>
    </div>
  );
};

export default WeatherSection;
