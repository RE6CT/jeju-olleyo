'use client';

import KakaoMap from '@/components/features/map/kakao-map';

export default function MapPage() {
  return (
    <div className="h-screen w-full">
      <KakaoMap center={{ lat: 33.45, lng: 126.57 }} level={3} />
    </div>
  );
}
