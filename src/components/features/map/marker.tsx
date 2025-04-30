'use client';

import { useEffect, useRef, useState } from 'react';

import { createMarkerImage } from '@/lib/utils/map.util';
import {
  CustomOverlayInstance,
  MarkerInstance,
  MarkerProps,
} from '@/types/kakao-map.type';
import {
  MAP_ZOOM_LEVEL,
  MARKER,
  MOBILE_SCREEN_OFFSET,
  SCREEN_OFFSET,
} from '@/constants/map.constants';

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
  onClick,
  address,
}: MarkerProps) => {
  const markerInstance = useRef<MarkerInstance | null>(null);
  const overlayInstance = useRef<CustomOverlayInstance | null>(null);
  const [screenOffset, setScreenOffset] = useState(SCREEN_OFFSET);

  useEffect(() => {
    const handleResize = () => {
      setScreenOffset(
        window.innerWidth <= 768 ? MOBILE_SCREEN_OFFSET : SCREEN_OFFSET,
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    const customOverlay = new window.kakao.maps.CustomOverlay({
      content: `
        <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <div style="font-weight: 600; font-size: 14px;">${title}</div>
          <div style="font-size: 12px; color: #666;">${address || ''}</div>
        </div>
      `,
      position: new window.kakao.maps.LatLng(position.lat, position.lng),
      xAnchor: MARKER.X_ANCHOR,
      yAnchor: MARKER.Y_ANCHOR,
    });

    overlayInstance.current = customOverlay;

    // 마커 클릭 이벤트 핸들러
    const handleMarkerClick = () => {
      if (overlayInstance.current) {
        overlayInstance.current.setMap(map);
      }

      // 클릭된 마커의 위치로 지도 중심 이동
      const latlng = new window.kakao.maps.LatLng(
        position.lat + screenOffset.LAT,
        position.lng,
      );
      map.setCenter(latlng);
      map.setLevel(MAP_ZOOM_LEVEL.CLICK);

      if (onClick) {
        onClick();
      }
    };

    window.kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

    return () => {
      if (markerInstance.current) {
        window.kakao.maps.event.removeListener(
          markerInstance.current,
          'click',
          handleMarkerClick,
        );
        markerInstance.current.setMap(null);
      }
      if (overlayInstance.current) {
        overlayInstance.current.setMap(null);
      }
    };
  }, [
    map,
    position,
    title,
    clickable,
    draggable,
    onClick,
    day,
    address,
    screenOffset,
  ]);

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
