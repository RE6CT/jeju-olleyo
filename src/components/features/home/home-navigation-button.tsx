import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const NavigationButton = ({
  direction,
  onClick,
}: NavigationButtonProps) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${
        isLeft ? 'left-4 md:left-6' : 'right-4 md:right-6'
      } opacity-60 transition-opacity duration-300 hover:opacity-100`}
      aria-label={isLeft ? '이전 슬라이드' : '다음 슬라이드'}
      style={{
        background: 'transparent', // 버튼 배경 제거
        border: 'none', // 버튼 테두리 제거
        padding: 0, // 패딩 제거
      }}
    >
      <Icon size={48} strokeWidth={2} color="#ffffff" />
    </button>
  );
};
