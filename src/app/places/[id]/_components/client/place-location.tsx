'use client';

import { useState } from 'react';

import Clusterer from '@/components/features/map/clusterer';
import KakaoMap from '@/components/features/map/kakao-map';
import { KakaoMapInstance } from '@/types/kakao-map.type';

const PlaceLocation = ({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);

  const handleMapLoad = (mapInstance: KakaoMapInstance) => {
    setMap(mapInstance);
  };

  const handleError = (error: Error) => {
    console.error('지도 로드 중 오류:', error);
  };

  const markers = [
    {
      position: { lat, lng },
      title,
    },
  ];
  return (
    <>
      <KakaoMap
        center={{ lat, lng }}
        level={3}
        onMapLoad={handleMapLoad}
        onError={handleError}
      />
      {map && <Clusterer map={map} markers={markers} />}
    </>
  );
};

export default PlaceLocation;
