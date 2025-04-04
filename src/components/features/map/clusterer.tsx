'use client';

import { useEffect, useRef } from 'react';
import { ClustererInstance, ClustererOptions } from '@/types/kakao-map.type';

const Clusterer = ({ map, markers, ...options }: ClustererOptions) => {
  const clustererInstance = useRef<ClustererInstance | null>(null);

  // 클러스터러 스타일 속성 설정
  // styles 배열의 인덱스는 calculator에 지정된 개수에 따라 자동 지정
  // [0]: 2-10개 마커, [1]: 11-100개 마커, [2]: 101-1000개 마커, [3]: 1001개 이상 마커
  const styles = [
    {
      width: '36px',
      height: '36px',
      background: '#FF6B6B',
      borderRadius: '50%',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '36px',
    },
    {
      width: '40px',
      height: '40px',
      background: '#4ECDC4',
      borderRadius: '50%',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '40px',
    },
    {
      width: '44px',
      height: '44px',
      background: '#45B7D1',
      borderRadius: '50%',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '44px',
    },
    {
      width: '48px',
      height: '48px',
      background: '#FFB347',
      borderRadius: '50%',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '48px',
    },
  ];

  // 클러스터러 초기화
  useEffect(() => {
    if (!map) return;

    const kakaoMarkers = markers.map((marker) => {
      const kakaoMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          marker.position.lat,
          marker.position.lng,
        ),
        title: marker.title,
        clickable: marker.clickable,
        draggable: marker.draggable,
      });

      if (marker.onClick) {
        window.kakao.maps.event.addListener(
          kakaoMarker,
          'click',
          marker.onClick,
        );
      }

      return kakaoMarker;
    });

    // 새로운 클러스터러 생성
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map,
      markers: kakaoMarkers,
      gridSize: 60,
      minLevel: 5,
      minClusterSize: 2,
      disableClickZoom: true,
      styles,
      ...options,
    });

    clustererInstance.current = clusterer;

    return () => {
      if (clustererInstance.current) {
        clustererInstance.current.setMap(null);
        clustererInstance.current = null;
        kakaoMarkers.forEach((marker) => marker.setMap(null));
      }
    };
  }, [map, markers, options]);

  return null;
};

export default Clusterer;
