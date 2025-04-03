'use client';

import { useState, useCallback } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Marker from '@/components/features/map/marker';
import { KakaoMapInstance, MarkerOptions } from '@/types/kakao-map.type';
import { Button } from '@/components/ui/button';

const MapPage = () => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [markers, setMarkers] = useState<MarkerOptions[]>([]);

  const handleMapLoad = useCallback((mapInstance: KakaoMapInstance) => {
    setMap(mapInstance);
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
      {map &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            map={map}
            position={marker.position}
            title={marker.title}
            clickable={marker.clickable}
            draggable={marker.draggable}
            onClick={() => console.log(`${marker.title} 클릭!`)}
          />
        ))}
    </div>
  );
};

export default MapPage;
