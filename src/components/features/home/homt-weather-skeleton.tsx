'use client';

/**
 * 날씨 섹션의 로딩 상태를 표시하는 스켈레톤 컴포넌트
 * 날씨 데이터가 로딩 중일 때 보여지는 스켈레톤 UI입니다.
 */
const WeatherSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg p-4">
      <div className="animate-pulse">
        <div className="mb-4 h-5 w-3/4 rounded bg-gray-200 sm:h-5 md:h-6 lg:h-6"></div>
        <div className="mb-6 h-3 w-1/2 rounded bg-gray-200 sm:h-3.5 md:h-4 lg:h-4"></div>
        <div className="flex justify-center space-x-2 overflow-x-auto pb-2 sm:space-x-3 md:space-x-4 lg:space-x-5">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="sm:h-26 md:w-18 h-24 w-14 flex-shrink-0 rounded bg-gray-200 sm:w-16 md:h-28 lg:h-32 lg:w-20"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSkeleton;
