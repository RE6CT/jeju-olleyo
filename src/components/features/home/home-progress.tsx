import { ProgressIndicatorProps } from '@/types/home.carousel.type';

export const ProgressIndicator = ({
  current,
  total,
  progress,
}: ProgressIndicatorProps) => {
  return (
    <div className="absolute bottom-2 left-0 right-0 z-10 w-full sm:bottom-4 md:bottom-6">
      <div className="flex justify-center">
        <div className="w-[81.5%] px-2">
          <div className="flex items-center gap-[31px]">
            <span className="flex-shrink-0 px-1.5 py-0.5 text-16 font-semibold text-white sm:px-2 sm:py-1 sm:text-sm md:px-3">
              {current} / {total}
            </span>
            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/50 sm:h-[1px] md:h-[1px]">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
