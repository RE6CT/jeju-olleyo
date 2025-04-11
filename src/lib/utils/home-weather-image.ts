// 날씨 아이콘 URL 가져오기
const getWeatherIconSrc = (icon: string): string => {
  const iconMap: Record<string, string> = {
    'clear-day': '/weather/clear.jpg',
    'clear-night': '/weather/clear.jpg',
    'partly-cloudy-day': '/weather/partly-cloudy-day.jpg',
    'partly-cloudy-night': '/weather/partly-cloudy-day.jpg',
    cloudy: '/weather/cloudy.jpg',
    rain: '/weather/rain.jpg',
    'showers-day': '/weather/rain.jpg',
    'showers-night': '/weather/rain.jpg',
    fog: '/weather/cloudy.jpg',
    wind: '/weather/cloudy.jpg',
    snow: '/weather/snow.jpg',
    thunder: '/weather/thunderstorm.jpg',
    'thunder-rain': '/weather/thunderstorm.jpg',
    'thunder-showers-day': '/weather/thunderstorm.jpg',
    'thunder-showers-night': '/weather/thunderstorm.jpg',
  };

  return iconMap[icon] || '/weather/cloudy.jpg';
};

export default getWeatherIconSrc;
