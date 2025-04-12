import { ProgressIndicatorProps } from '@/types/home.carousel.type';

/**
 * 캐러셀의 현재 페이지와 진행 상태를 표시하는 컴포넌트
 * 모든 화면 크기에서 중앙에 적절히 배치되도록 조정됨
 */
export const ProgressIndicator = ({
  current,
  total,
  progress,
}: ProgressIndicatorProps) => {
  return (
    <div className="absolute bottom-2 left-0 right-0 z-10 w-full sm:bottom-4 md:bottom-6">
      <div className="flex justify-center">
        <div className="w-[85%] px-2 sm:w-[90%] md:w-[95%]">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <span className="flex-shrink-0 rounded-full px-1.5 py-0.5 text-xs font-medium text-black sm:px-2 sm:py-1 sm:text-sm md:px-3 md:text-base md:font-semibold">
              {current} / {total}
            </span>
            <div className="relative h-[1px] flex-1 overflow-hidden rounded-full bg-white/50 sm:h-[1px] md:h-[1px]">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-black"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
