'use client';

import { useState } from 'react';

import Clusterer from '@/components/features/map/clusterer';
import KakaoMap from '@/components/features/map/kakao-map';

const PlaceLocation = ({
  lat,
  lng,
  title,
}: {
  lat: number;
  lng: number;
  title: string;
}) => {
  const [map, setMap] = useState(null);

  const handleMapLoad = (mapInstance: any) => {
    setMap(mapInstance);
  };

  const handleError = (error: any) => {
    console.error('지도 로드 중 오류:', error);
  };

  const markers = [
    {
      position: { lat, lng },
      title,
    },
  ];
  return (
    <div className="pt-auto h-[150px] w-full">
      <KakaoMap
        center={{ lat, lng }}
        level={3}
        onMapLoad={handleMapLoad}
        onError={handleError}
      />
      {map && <Clusterer map={map} markers={markers} />}
    </div>
  );
};

export default PlaceLocation;
