import { formatDate } from '@/lib/utils/date';
import { DurationProps } from '@/types/common.type';

/**
 * 날짜 기간을 표시하는 컴포넌트
 * @param start 시작 날짜
 * @param end 끝 날짜
 * @param separator 날짜 사이 구분 문자 (-, ~ 등)
 *
 * @example
 * <Duration start="2025-04-02" end="2025-04-05" separator="-" />
 */
const Duration = ({ start, end, separator, className }: DurationProps) => {
  return (
    <div
      className={`font-pretendard flex gap-1 text-xs font-medium text-gray-500 ${className}`}
    >
      <span>{formatDate(start)}</span>
      <span>{separator}</span>
      <span>{formatDate(end)}</span>
    </div>
  );
};

export default Duration;
