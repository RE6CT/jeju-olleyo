import { NavigationButtonProps } from '@/types/home.carousel.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * 캐러셀 네비게이션 버튼 컴포넌트
 * 모바일에서는 현재 크기 유지, 데스크탑에서는 더 큰 버튼으로 표시
 */
const NavigationButton = ({ direction, onClick }: NavigationButtonProps) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${
        isLeft
          ? 'left-2 sm:left-3 md:left-4 lg:left-6'
          : 'right-2 sm:right-3 md:right-4 lg:right-6'
      } border-none bg-transparent p-0 opacity-60 transition-opacity duration-300 hover:opacity-100`}
      aria-label={isLeft ? '이전 슬라이드' : '다음 슬라이드'}
    >
      <Icon
        size={32}
        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16"
        strokeWidth={2}
        color="#ffffff"
      />
    </button>
  );
};

export default NavigationButton;
