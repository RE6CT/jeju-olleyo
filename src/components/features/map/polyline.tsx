'use client';

import { useEffect, useRef } from 'react';
import { PolylineInstance, PolylineProps } from '@/types/kakao-map.type';

const Polyline = ({ map, path, ...options }: PolylineProps) => {
  const polylineInstance = useRef<PolylineInstance | null>(null);

  // 경로 업데이트
  useEffect(() => {
    if (!map) return;

    if (polylineInstance.current) {
      polylineInstance.current.setMap(null);
    }

    const polyline = new window.kakao.maps.Polyline({
      path: path.map(
        (point) => new window.kakao.maps.LatLng(point.lat, point.lng),
      ),
      // default 스타일
      strokeWeight: 3,
      strokeColor: '#4CAF50',
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      ...options,
    });

    polyline.setMap(map);

    polylineInstance.current = polyline;

    return () => {
      if (polylineInstance.current) {
        polylineInstance.current.setMap(null);
      }
    };
  }, [map, path, options]);

  return null;
};

export default Polyline;
