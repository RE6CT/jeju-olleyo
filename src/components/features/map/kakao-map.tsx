'use client';

import { useEffect, useRef, useState } from 'react';
import { KakaoMapInstance, KakaoMapProps } from '@/types/kakao-map.type';
import React from 'react';

/**
 * 카카오맵 컴포넌트
 * @param KakaoMapProps.center - 지도의 중심 좌표 (위도, 경도)
 * @param KakaoMapProps.level - 지도의 확대 레벨
 * @param KakaoMapProps.onMapLoad - 지도 로드 완료 후 실행할 함수
 */
const KakaoMap = ({ center, level, onMapLoad }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMapInstance | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로드 상태

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=clusterer&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current && !mapInstance.current) {
          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: level,
          };
          mapInstance.current = new window.kakao.maps.Map(
            mapRef.current,
            options,
          );
          setIsMapLoaded(true);
          if (mapInstance.current) onMapLoad(mapInstance.current); // map 인스턴스를 외부 컴포넌트로 전달
        }
      });
    };

    return () => {
      script.onload = null;
      document.head.removeChild(script);
    };
  }, []); // 의존성 배열 비움

  useEffect(() => {
    if (mapInstance.current && isMapLoaded) {
      const latlng = new window.kakao.maps.LatLng(center.lat, center.lng);
      mapInstance.current.setCenter(latlng);
      mapInstance.current.setLevel(level);
    }
  }, [center.lat, center.lng, level]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
