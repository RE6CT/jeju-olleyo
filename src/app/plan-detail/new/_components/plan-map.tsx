'use client';

import { useState } from 'react';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import KakaoMap from '@/components/features/map/kakao-map';
import Loading from '@/app/loading';
import ErrorMessage from '@/app/error';
import { KakaoMapInstance, KakaoMapOptions } from '@/types/kakao-map.type';

// 초기 설정 map option
const DEFAULT_MAP_OPTIONS: KakaoMapOptions = {
  center: { lat: 33.3616666, lng: 126.5291666 },
  level: 10,
};

const PlanMap = () => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMapLoad = (map: KakaoMapInstance) => {
    setMap(map);
    setIsLoading(false);
  };

  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  return (
    <div className="mt-4 h-[326px] w-full overflow-hidden rounded-[12px]">
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <KakaoMap
        {...DEFAULT_MAP_OPTIONS}
        onMapLoad={handleMapLoad}
        onError={handleMapError}
      />
    </div>
  );
};

export default PlanMap;
