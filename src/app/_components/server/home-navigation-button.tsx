import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationButtonProps } from '@/types/home.carousel.type';

/**
 * 캐러셀 네비게이션 버튼 컴포넌트
 * @param direction - 버튼 방향 ('left' 또는 'right')
 * @param onClick - 클릭 핸들러 함수
 */
const NavigationButton = ({ direction, onClick }: NavigationButtonProps) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${
        isLeft ? 'left-2.5' : 'right-2.5'
      } hidden border-none bg-transparent p-0 opacity-60 transition-opacity duration-300 hover:opacity-100 md:block`}
      aria-label={isLeft ? '이전 슬라이드' : '다음 슬라이드'}
    >
      <Icon size={48} strokeWidth={2} color="#ffffff" />
    </button>
  );
};

export default NavigationButton;
