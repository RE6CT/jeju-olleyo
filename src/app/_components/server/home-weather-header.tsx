import { WeatherHeaderProps } from '@/types/home.weather.type';

/**
 * 날씨 섹션의 헤더 컴포넌트
 * @param month 월
 * @param day 일
 * @param title 제목
 * @param subtitle 부제목
 * 제목, 부제목과 날짜 정보를 표시합니다.
 */
const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  month,
  day,
  title,
  subtitle,
}: WeatherHeaderProps) => {
  const headerContainerClasses =
    'flex w-full flex-col items-start justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2';
  const titleClasses = 'flex w-full justify-center text-center semibold-16';
  const subtitleClasses = 'self-stretch text-center semibold-20 text-gray-900';

  return (
    <div className={headerContainerClasses}>
      <div className={titleClasses}>
        <h2 className="text-primary-500/60">
          {month}월 {day}일
        </h2>
        <span className="text-secondary-300">, </span>
        <h2 className="text-gray-500">{title}</h2>
      </div>

      <p className={subtitleClasses}>{subtitle}</p>
    </div>
  );
};

export default WeatherHeader;
