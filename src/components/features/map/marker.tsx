'use client';

import { useEffect, useRef } from 'react';
import { MarkerInstance, MarkerProps } from '@/types/kakao-map.type';
import { createMarkerImage } from '@/lib/utils/map.util';

/**
 * 카카오맵 마커 컴포넌트
 * @param MarkerOptions.position - 마커의 위치 (위도, 경도)
 * @param MarkerOptions.title - 마커의 타이틀
 * @param MarkerOptions.clickable - 마커 클릭 가능 여부
 * @param MarkerOptions.draggable - 마커 드래그 가능 여부
 * @param MarkerOptions.day - 일자 (홀수/짝수에 따라 마커 색상 변경)
 * @param MarkerOptions.order - 순서 번호
 * @param MarkerOptions.showDay - 일자 표시 여부
 */
const Marker = ({
  map,
  position,
  title,
  clickable = true,
  draggable = false,
  day,
  order,
  showDay = false,
  onClick,
}: MarkerProps) => {
  const markerInstance = useRef<MarkerInstance | null>(null);

  // 마커 초기화
  useEffect(() => {
    if (!map || !position) return;

    const markerImage = createMarkerImage(day || 1);

    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
      title,
      clickable,
      draggable,
      image: markerImage,
    });

    markerInstance.current = marker;

    if (onClick) {
      window.kakao.maps.event.addListener(marker, 'click', onClick);
    }

    return () => {
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
        if (onClick) {
          window.kakao.maps.event.removeListener(
            markerInstance.current,
            'click',
            onClick,
          );
        }
      }
    };
  }, [map, position, title, clickable, draggable, onClick, day]);

  // 마커 속성 업데이트
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
