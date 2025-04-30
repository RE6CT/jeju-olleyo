import { WeatherMessage } from '@/types/home.weather.type';

/**
 * 날씨 관련 유틸리티 함수들
 */
export const weatherUtil = {
  /**
   * 날씨 아이콘 코드에 따른 이미지 경로를 반환하는 함수
   * @param icon 날씨 아이콘 코드
   * @returns 해당하는 날씨 이미지 경로
   */
  getWeatherIconSrc(icon: string): string {
    const iconMap: Record<string, string> = {
      'clear-day': '/weather/clear.svg',
      'clear-night': '/weather/clear.svg',
      'partly-cloudy-day': '/weather/partly-cloudy-day.svg',
      'partly-cloudy-night': '/weather/partly-cloudy-day.svg',
      cloudy: '/weather/cloudy.svg',
      rain: '/weather/rain.svg',
      'showers-day': '/weather/rain.svg',
      'showers-night': '/weather/rain.svg',
      fog: '/weather/cloudy.svg',
      wind: '/weather/wind.svg',
      snow: '/weather/snow.svg',
      thunder: '/weather/thunderstorm.svg',
      'thunder-rain': '/weather/thunderstorm.svg',
      'thunder-showers-day': '/weather/thunderstorm.svg',
      'thunder-showers-night': '/weather/thunderstorm.svg',
    };

    return iconMap[icon] || '/weather/cloudy.svg';
  },

  /**
   * 날씨 아이콘에 따른 메시지를 반환하는 함수
   * @param weatherIcon 날씨 아이콘 코드
   * @returns 해당하는 날씨 메시지 객체
   */
  getWeatherMessage(weatherIcon: string): WeatherMessage {
    // 날씨 아이콘에 따른 메시지 매핑
    const iconMessages: Record<string, WeatherMessage> = {
      'clear-day': {
        subtitle: '기분 좋은 날이네요! 야외 활동하기 딱 좋아요.',
      },
      'clear-night': {
        subtitle: '기분 좋은 날이네요! 야외 활동하기 딱 좋아요.',
      },
      'partly-cloudy-day': {
        subtitle: '약간의 구름이 있지만 쾌적한 날씨입니다.',
      },
      'partly-cloudy-night': {
        subtitle: '약간의 구름이 있지만 쾌적한 날씨입니다.',
      },
      cloudy: {
        subtitle: '흐린 하늘이지만 산책하기 좋은 날씨에요.',
      },
      rain: {
        subtitle: '우산 꼭 챙기세요! 실내 활동을 추천합니다.',
      },
      'showers-day': {
        subtitle: '갑자기 비가 내릴 수 있어요. 우산을 준비하세요.',
      },
      'showers-night': {
        subtitle: '갑자기 비가 내릴 수 있어요. 우산을 준비하세요.',
      },
      thunder: {
        subtitle: '외출 시 주의하세요! 가능하면 실내에 머물러주세요.',
      },
      'thunder-rain': {
        subtitle: '외출 시 주의하세요! 가능하면 실내에 머물러주세요.',
      },
      snow: {
        subtitle: '따뜻하게 입고 미끄럼에 주의하세요.',
      },
      fog: {
        subtitle: '시야가 좋지 않으니 운전 및 외출 시 주의하세요.',
      },
      wind: {
        subtitle: '바람이 강하게 불어요. 외출 시 주의하세요.',
      },
    };

    // 기본 메시지
    const defaultMessage: WeatherMessage = {
      subtitle: '제주도의 아름다운 날씨를 확인하세요.',
    };

    // 정확한 매칭 시도
    if (iconMessages[weatherIcon]) {
      return iconMessages[weatherIcon];
    }

    // 부분 매칭 시도 (예: 'thunder-showers-day'는 'thunder' 키워드로 매칭)
    for (const key of Object.keys(iconMessages)) {
      if (weatherIcon.includes(key)) {
        return iconMessages[key];
      }
    }

    return defaultMessage;
  },

  /**
   * 다음 자정(00:00:00)까지의 시간(밀리초)을 계산
   * @returns 다음 자정까지 남은 시간(밀리초)
   */
  calculateMsUntilMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);

    // 다음 날 자정 설정
    midnight.setDate(midnight.getDate() + 1);
    midnight.setHours(0, 0, 0, 0);

    // 자정까지 남은 시간(밀리초)
    return midnight.getTime() - now.getTime();
  },
};
