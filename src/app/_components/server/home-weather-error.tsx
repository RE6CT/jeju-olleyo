import { WeatherErrorProps } from '@/types/home.weather.type';

/**
 * 날씨 데이터 로딩 오류를 표시하는 컴포넌트
 * 오류 발생 시 사용자에게 오류 메시지를 보여줍니다.
 * @param title 에러 제목
 * @param errorMessage 에러 내용
 */
const WeatherError: React.FC<WeatherErrorProps> = ({
  errorMessage,
}: WeatherErrorProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg p-4">
      <p className="text-red">{errorMessage}</p>
    </div>
  );
};

export default WeatherError;
