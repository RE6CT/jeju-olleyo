'use client';

import { useEffect, useRef } from 'react';
import { MarkerInstance, MarkerOptions } from '@/types/kakao-map.type';

/**
 * 카카오맵 마커 컴포넌트
 * @param position - 마커의 위치 (위도, 경도)
 * @param title - 마커의 타이틀
 * @param clickable - 마커 클릭 가능 여부
 * @param draggable - 마커 드래그 가능 여부
 */
const Marker = ({
  position,
  title,
  clickable = true,
  draggable = false,
}: MarkerOptions) => {
  const markerRef = useRef<MarkerInstance | null>(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(position.lat, position.lng),
        title,
        clickable,
        draggable,
      });

      markerRef.current = marker;

      return () => {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
      };
    }
  }, [position.lat, position.lng, title, clickable, draggable]);

  return null;
};

export default Marker;
