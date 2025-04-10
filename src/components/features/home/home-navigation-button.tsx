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
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center opacity-60 hover:opacity-100 ${
        isLeft ? 'left-4 md:left-6' : 'right-4 md:right-6'
      }`}
      aria-label={isLeft ? '이전 슬라이드' : '다음 슬라이드'}
    >
      <Icon size={24} strokeWidth={2} color="#ffffff" />
    </button>
  );
};
