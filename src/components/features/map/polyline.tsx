'use client';

import { useEffect, useRef } from 'react';

import { PolylineInstance, PolylineProps } from '@/types/kakao-map.type';

/**
 * 카카오맵에 경로를 표시하는 컴포넌트
 *
 * @param PolylineProps.map - 카카오맵 인스턴스
 * @param PolylineProps.path - 경로 좌표 배열
 * @param PolylineProps.options - 경로 스타일 옵션(PolylineOptions 타입 참고)
 *
 * @example
 * ```tsx
 * const MapWithPolyline = () => {
 *   const [map, setMap] = useState<KakaoMapInstance | null>(null);
 *   const path = [];
 *   const options = {
 *     strokeWeight: 3,
 *     strokeColor: '#4CAF50',
 *     strokeOpacity: 0.8,
 *     strokeStyle: 'solid'
 *   };
 *   return (
 *     <div className="h-[400px]">
 *       <KakaoMap
 *         center={{ lat: 33.450701, lng: 126.570667 }}
 *         level={3}
 *         onMapLoad={setMap}
 *       />
 *       {map && <Polyline map={map} path={path} options={options} />}
 *     </div>
 *   );
 * };
 * ```
 */

const Polyline = ({ map, path, ...options }: PolylineProps) => {
  const polylineInstance = useRef<PolylineInstance | null>(null);

  // 경로 업데이트
  useEffect(() => {
    if (!map) return;

    const defaultOptions = {
      strokeWeight: 3,
      strokeColor: '#4CAF50',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    };

    const polyline = new window.kakao.maps.Polyline({
      path: path.map(
        (point) => new window.kakao.maps.LatLng(point.lat, point.lng),
      ),
      ...defaultOptions, // default 스타일
      ...options, // 전달받은 옵션 우선
    });

    polyline.setMap(map);
    polylineInstance.current = polyline;

    return () => {
      if (polylineInstance.current) {
        polylineInstance.current.setMap(null);
        polylineInstance.current = null;
      }
    };
  }, [map, path, options]);

  return null;
};

export default Polyline;
