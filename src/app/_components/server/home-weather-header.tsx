import { WeatherHeaderProps } from '@/types/home.weather.type';

/**
 * 날씨 섹션의 헤더 컴포넌트
 * @param month 월
 * @param day 일
 * @param title 제목
 * @param subtitle 부제목
 * 제목, 부제목과 날짜 정보를 표시합니다.
 * 768px 이상: 가운데 정렬
 * 768px 미만: 왼쪽 정렬
 */
const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  month,
  day,
  subtitle,
}: WeatherHeaderProps) => {
  const headerContainerClasses =
    'flex w-full flex-col items-start justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2';
  const titleClasses =
    'flex w-full items-center text-left md:justify-center md:text-center semibold-16';
  const subtitleClasses =
    'self-stretch text-left md:text-center semibold-16 text-gray-900 md:semibold-18 lg:semibold-20';

  return (
    <div className={headerContainerClasses}>
      <div className={titleClasses}>
        <h2 className="text-primary-500">
          {month}월 {day}일
        </h2>
        <span className="mr-1 text-secondary-300">,</span>
        <h2 className="text-gray-500">오늘의 제주 날씨는?</h2>
      </div>

      <p className={subtitleClasses}>{subtitle}</p>
    </div>
  );
};

export default WeatherHeader;
