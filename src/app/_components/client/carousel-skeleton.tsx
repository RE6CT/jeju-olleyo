'use client';

import { useState, useEffect } from 'react';

/**
 * 캐러셀을 위한 스켈레톤 UI 컴포넌트
 * 캐러셀이 로딩되는 동안 표시되는 로딩 플레이스홀더
 */
const CarouselSkeleton = () => {
  // hydration을 체크하기 위한 상태
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative mx-4 overflow-hidden rounded-lg md:mx-0 md:rounded-none">
      {/* 모바일 버전 (768px 미만) */}
      <div
        className="mx-auto block overflow-hidden rounded-lg border-[0.6px] border-solid border-white/20 bg-gray-100 md:hidden"
        style={{ maxWidth: '343px', height: '170px' }}
      >
        <div className="h-full w-full animate-pulse">
          <div className="flex h-full flex-col items-center justify-center" />
        </div>
      </div>

      {/* 데스크톱 버전 (768px 이상) */}
      <div
        className="mx-auto hidden overflow-hidden border-white/20 bg-gray-100 md:block md:w-full"
        style={{
          height: 0,
          paddingBottom: 'calc(340 / 1024 * 100%)',
        }}
      >
        <div className="h-full w-full animate-pulse">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-4 h-5 w-2/3 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
