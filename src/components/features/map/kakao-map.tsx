'use client';

import { useEffect, useRef } from 'react';
import { KakaoMapInstance, KakaoMapOptions } from '@/types/kakao-map.type';

/**
 * 카카오맵 컴포넌트
 * @param center - 지도의 중심 좌표 (위도, 경도)
 * @param center.lat - 지도의 위도
 * @param center.lag - 지도의 경도
 * @param level - 지도의 확대 레벨
 */
const KakaoMap = ({ center, level }: KakaoMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMapInstance | null>(null);

  // 지도 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
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
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // center, zoon level 변경시 지도 업데이트
  useEffect(() => {
    if (mapInstance.current) {
      const latlng = new window.kakao.maps.LatLng(center.lat, center.lng);
      mapInstance.current.setCenter(latlng);
      mapInstance.current.setLevel(level);
    }
  }, [center.lat, center.lng, level]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
