import { ProgressIndicatorProps } from '@/types/home.carousel.type';

/**
 * 캐러셀 진행 상태 표시 컴포넌트
 * 768px 이상: 중앙 하단에 현재/전체 번호와 프로그레스 바 표시
 * 768px 미만: 오른쪽 하단에 번호만 표시
 * @param current - 현재 슬라이드 번호
 * @param total - 전체 슬라이드 수
 * @param progress - 진행률 (0-100 사이의 값)
 */
export const ProgressIndicator = ({
  current,
  total,
  progress,
}: ProgressIndicatorProps) => {
  return (
    <>
      {/* 모바일 버전 (768px 미만): 오른쪽 하단에 번호만 표시 */}
      <div className="absolute bottom-2 right-2 z-10 md:hidden">
        <span className="rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">
          {current}/{total}
        </span>
      </div>

      {/* 데스크톱 버전 (768px 이상): 중앙 하단에 프로그레스 바와 번호 표시 */}
      <div className="absolute bottom-2 left-0 right-0 z-10 hidden w-full sm:bottom-4 md:bottom-6 md:block">
        <div className="flex justify-center">
          <div className="w-[81.5%] px-2">
            <div className="flex items-center gap-[31px]">
              <span className="flex-shrink-0 px-1.5 py-0.5 text-16 font-semibold text-white sm:px-2 sm:py-1 sm:text-sm md:px-3">
                {current} / {total}
              </span>
              <div className="relative h-[1px] flex-1 overflow-hidden rounded-full bg-white/50">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressIndicator;
