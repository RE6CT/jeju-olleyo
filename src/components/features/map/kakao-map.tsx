'use client';

import { useEffect, useRef } from 'react';
import { KakaoMapOptions } from '@/types/kakao-map.type';

// 참고문서: https://marklee1117.tistory.com/82
const KakaoMap = ({ center, level }: KakaoMapOptions) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: level,
          };

          new window.kakao.maps.Map(mapRef.current, options);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []); // 컴포넌트가 마운트될 때만 실행

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
