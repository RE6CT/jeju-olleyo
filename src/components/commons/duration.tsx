import { formatDate, formatDateShortYear } from '@/lib/utils/date';
import { DurationProps } from '@/types/common.type';

/**
 * 날짜 기간을 표시하는 컴포넌트
 * @param start 시작 날짜
 * @param end 끝 날짜
 * @param separator 날짜 사이 구분 문자 (-, ~ 등)
 * @param showShortYear 연도를 두 자리로 표시할지 여부 (기본값: false)
 *
 * @example
 * <Duration start="2025-04-02" end="2025-04-05" separator="-" />
 * <Duration start="2025-04-02" end="2025-04-05" separator="-" showShortYear />
 */
const Duration = ({
  start,
  end,
  separator,
  className,
  showShortYear = false,
}: DurationProps) => {
  const format = showShortYear ? formatDateShortYear : formatDate;

  return (
    <div
      className={`flex gap-[2px] text-xs font-medium text-gray-500 md:gap-1 ${className}`}
    >
      <span>{format(start)}</span>
      <span>{separator}</span>
      <span>{format(end)}</span>
    </div>
  );
};

export default Duration;
