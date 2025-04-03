'use client';

import { useEffect, useRef } from 'react';
import {
  KakaoMapInstance,
  MarkerInstance,
  MarkerOptions,
} from '@/types/kakao-map.type';

/**
 * 카카오맵 마커 컴포넌트
 * @param MarkerOptions.position - 마커의 위치 (위도, 경도)
 * @param MarkerOptions.title - 마커의 타이틀
 * @param MarkerOptions.clickable - 마커 클릭 가능 여부
 * @param MarkerOptions.draggable - 마커 드래그 가능 여부
 */
const Marker = ({
  map,
  position,
  title,
  clickable = true,
  draggable = false,
}: MarkerOptions & { map?: KakaoMapInstance }) => {
  const markerInstance = useRef<MarkerInstance | null>(null);

  // 마커 초기화
  useEffect(() => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
      title,
      clickable,
      draggable,
    });

    markerInstance.current = marker;

    return () => {
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }
    };
  }, [map]);

  useEffect(() => {
    if (markerInstance.current) {
      const latlng = new window.kakao.maps.LatLng(position.lat, position.lng);
      markerInstance.current.setPosition(latlng);
      markerInstance.current.setTitle(title);
      markerInstance.current.setClickable(clickable);
      markerInstance.current.setDraggable(draggable);
    }
  }, [position.lat, position.lng, title, clickable, draggable]);

  return null; // 마커는 실제 DOM 요소를 렌더링하지 않음
};

export default Marker;
