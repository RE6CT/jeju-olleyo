'use client';

const PlaceListSkeleton = ({ count }: { count: number }) => (
  <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 md:grid-cols-4">
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="contents">
          <div className="flex aspect-square animate-pulse flex-col space-y-2 rounded-lg bg-gray-200" />
          {/* 8번째 카드 다음에 배너 스켈레톤 */}
          {index === 7 && (
            <div className="col-span-full my-4 flex w-full items-center justify-center">
              <div className="mt-[42px] aspect-auto w-full animate-pulse rounded-lg bg-gray-200" />
            </div>
          )}
        </div>
      ))}
  </div>
);

export default PlaceListSkeleton;
