/**
 * 날씨 아이콘에 따른 문구 생성 함수
 */
const getWeatherMessage = (
  weatherIcon: string,
): { title: string; subtitle: string } => {
  // 날씨 아이콘에 따른 메시지 매핑
  const iconMessages: Record<string, { title: string; subtitle: string }> = {
    'clear-day': {
      title: '오늘의 제주 날씨는 맑음!',
      subtitle: '기분 좋은 날이네요! 야외 활동하기 딱 좋아요.',
    },
    'clear-night': {
      title: '오늘의 제주 날씨는 맑음!',
      subtitle: '기분 좋은 날이네요! 야외 활동하기 딱 좋아요.',
    },
    'partly-cloudy-day': {
      title: '오늘의 제주 날씨는 구름 조금!',
      subtitle: '약간의 구름이 있지만 쾌적한 날씨입니다.',
    },
    'partly-cloudy-night': {
      title: '오늘의 제주 날씨는 구름 조금!',
      subtitle: '약간의 구름이 있지만 쾌적한 날씨입니다.',
    },
    cloudy: {
      title: '오늘의 제주 날씨는 흐림!',
      subtitle: '흐린 하늘이지만 산책하기 좋은 날씨에요.',
    },
    rain: {
      title: '오늘의 제주 날씨는 비!',
      subtitle: '우산 꼭 챙기세요! 실내 활동을 추천합니다.',
    },
    'showers-day': {
      title: '오늘의 제주 날씨는 소나기!',
      subtitle: '갑자기 비가 내릴 수 있어요. 우산을 준비하세요.',
    },
    'showers-night': {
      title: '오늘의 제주 날씨는 소나기!',
      subtitle: '갑자기 비가 내릴 수 있어요. 우산을 준비하세요.',
    },
    thunder: {
      title: '오늘의 제주 날씨는 천둥번개!',
      subtitle: '외출 시 주의하세요! 가능하면 실내에 머물러주세요.',
    },
    'thunder-rain': {
      title: '오늘의 제주 날씨는 천둥번개와 비!',
      subtitle: '외출 시 주의하세요! 가능하면 실내에 머물러주세요.',
    },
    snow: {
      title: '오늘의 제주 날씨는 눈!',
      subtitle: '따뜻하게 입고 미끄럼에 주의하세요.',
    },
    fog: {
      title: '오늘의 제주 날씨는 안개!',
      subtitle: '시야가 좋지 않으니 운전 및 외출 시 주의하세요.',
    },
    wind: {
      title: '오늘의 제주 날씨는 바람!',
      subtitle: '바람이 강하게 불어요. 외출 시 주의하세요.',
    },
  };

  // 기본 메시지
  const defaultMessage = {
    title: '오늘의 제주 날씨는?',
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
};

export default getWeatherMessage;
