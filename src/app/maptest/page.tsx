'use client';

import { useState, useCallback } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Clusterer from '@/components/features/map/clusterer';
import Polyline from '@/components/features/map/polyline';
import {
  KakaoMapInstance,
  MarkerOptions,
  MarkerProps,
} from '@/types/kakao-map.type';
import Loading from '../loading';

// 임시 장소 데이터
// https://www.jejudatahub.net/data/view/data/TOURISM/674
const PLACES: MarkerOptions[] = [
  {
    position: { lat: 33.55121797, lng: 126.69361 },
    title: '북촌포구 주차장',
  },
  {
    position: { lat: 33.55098302, lng: 126.693698 },
    title: '화장실',
  },
  {
    position: { lat: 33.55081597, lng: 126.693294 },
    title: '오르막 경사로',
  },
  {
    position: { lat: 33.54979296, lng: 126.692917 },
    title: '주차장',
  },
  {
    position: { lat: 33.54987402, lng: 126.692674 },
    title: '내리막 경사로',
  },
  {
    position: { lat: 33.54845404, lng: 126.686449 },
    title: '오르막 경사로',
  },
  {
    position: { lat: 33.54834801, lng: 126.686249 },
    title: '내리막 경사로',
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
  const [polylines, setPolylines] = useState<
    { path: { lat: number; lng: number }[] }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMapLoad = useCallback((mapInstance: KakaoMapInstance) => {
    setMap(mapInstance);
    setIsLoading(false);
    setError(null);
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

  /**
   * Polyline 추가 함수
   */
  const addPolyline = () => {
    setPolylines((prev) => [
      ...prev,
      { path: PLACES.map((place) => place.position) },
    ]);
  };

  return (
    // padding 속성 처리 필요
    <div className="container mx-auto py-6">
      <div className="h-[400px] w-full overflow-hidden">
        {isLoading && <Loading />}
        <KakaoMap
          center={{ lat: 33.45, lng: 126.57 }}
          level={3}
          onMapLoad={handleMapLoad}
        />
        {map && !isLoading && (
          <>
            <Clusterer map={map} markers={markers} />
            <Polyline
              map={map}
              path={PLACES.map((place) => place.position)}
              strokeWeight={5}
              strokeColor="#4CAF50"
              strokeOpacity={0.8}
              strokeStyle="solid"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MapPage;
