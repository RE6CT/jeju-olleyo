'use client';

import { useState, useCallback } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Clusterer from '@/components/features/map/clusterer';
import {
  KakaoMapInstance,
  MarkerOptions,
  MarkerProps,
} from '@/types/kakao-map.type';

// 임시 장소 데이터
const PLACES: MarkerOptions[] = [
  {
    position: { lat: 33.450701, lng: 126.570667 },
    title: '성산일출봉',
  },
  {
    position: { lat: 33.4996213, lng: 126.5311884 },
    title: '우도',
  },
  {
    position: { lat: 33.248485, lng: 126.570667 },
    title: '한라산',
  },
  {
    position: { lat: 33.450701, lng: 126.470667 },
    title: '만장굴',
  },
];

const MapPage = () => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [markers, setMarkers] = useState<MarkerProps[]>(
    PLACES.map((place) => ({
      ...place,
      onClick: () => handleMarkerClick(place.title),
    })),
  );

  const handleMapLoad = useCallback((mapInstance: KakaoMapInstance) => {
    setMap(mapInstance);
  }, []);

  const handleMarkerClick = useCallback((title: string) => {
    console.log(`${title} 클릭!`);
  }, []);

  /**
   * 마커 추가 함수
   */
  const addMarker = () => {
    setMarkers((prev) => [
      ...prev,
      {
        position: { lat: 33.45 + prev.length * 0.01, lng: 126.57 },
        title: `테스트 마커 ${prev.length + 1}`,
        onClick: () => handleMarkerClick(`테스트 마커 ${prev.length + 1}`),
      },
    ]);
  };

  return (
    <div className="h-screen w-full">
      <KakaoMap
        center={{ lat: 33.45, lng: 126.57 }}
        level={3}
        onMapLoad={handleMapLoad}
      />
      {map && <Clusterer map={map} markers={markers} />}
    </div>
  );
};

export default MapPage;
