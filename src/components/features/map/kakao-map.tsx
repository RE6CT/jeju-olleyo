'use client';

import { useEffect, useRef, useState } from 'react';
import { KakaoMapInstance, KakaoMapProps } from '@/types/kakao-map.type';

/**
 * 카카오맵 컴포넌트
 * @param KakaoMapProps.center - 지도의 중심 좌표 (위도, 경도)
 * @param KakaoMapProps.level - 지도의 확대 레벨
 * @param KakaoMapProps.onMapLoad - 지도 로드 완료 후 실행할 함수
 *
 * @example
 * ```tsx
 * const Map = () => {
 *   return (
 *     <div className="h-[400px]">
 *       <KakaoMap
 *         center={{ lat: 33.450701, lng: 126.570667 }}
 *         level={3}
 *         onMapLoad={setMap}
 *       />
 *     </div>
 *   );
 * };
 * ```
 */
const KakaoMap = ({ center, level, onMapLoad, onError }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<KakaoMapInstance | null>(null);
  const [, setIsMapLoaded] = useState(false); // 지도 로드 상태

  useEffect(() => {
    const handleMapLoad = () => {
      if (mapRef.current && !mapInstance.current) {
        try {
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
        } catch (error) {
          onError?.(
            error instanceof Error ? error : new Error('지도 로드 실패'),
          );
        }
      }
    };

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=clusterer,services&autoload=false`; // services, clusterer 라이브러리 추가
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(handleMapLoad);
    };

    return () => {
      script.onload = null;
      document.head.removeChild(script);
    };
  }, []); // 마운트시 최초 한번만 실행

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default KakaoMap;
