'use client';

import { useEffect, useRef } from 'react';
import { ClustererInstance, ClustererOptions } from '@/types/kakao-map.type';

const Clusterer = ({ map, markers, ...options }: ClustererOptions) => {
  const clustererInstance = useRef<ClustererInstance | null>(null);

  // 클러스터러 스타일 속성 설정
  const styles = [
    {
      width: '36px',
      height: '36px',
      background: '#FF6B6B',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '36px',
    },
    {
      width: '40px',
      height: '40px',
      background: '#4ECDC4',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '40px',
    },
    {
      width: '44px',
      height: '44px',
      background: '#45B7D1',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '44px',
    },
  ];

  // 클러스터러 초기화
  useEffect(() => {
    if (!map) return;

    // 기존 클러스터러 제거
    if (clustererInstance.current) {
      clustererInstance.current = {};
    }

    // 새로운 클러스터러 생성
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map,
      markers: markers.map(
        (marker) =>
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              marker.position.lat,
              marker.position.lng,
            ),
            title: marker.title,
            clickable: marker.clickable,
            draggable: marker.draggable,
          }),
      ),
      gridSize: 60,
      minLevel: 6,
      minClusterSize: 2,
      disableClickZoom: false,
      styles,
      ...options,
    });

    clustererInstance.current = clusterer;

    return () => {
      if (clustererInstance.current) {
        clustererInstance.current = {};
      }
    };
  }, [map, markers, options]);

  return null;
};

export default Clusterer;
