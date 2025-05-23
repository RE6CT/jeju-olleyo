'use client';

import { useEffect, useRef, useState } from 'react';

import {
  ClustererInstance,
  ClustererOptions,
  CustomOverlayInstance,
  MarkerProps,
} from '@/types/kakao-map.type';
import {
  MAP_ZOOM_LEVEL,
  MARKER,
  MOBILE_SCREEN_OFFSET,
  SCREEN_OFFSET,
} from '@/constants/map.constants';

/**
 * 카카오맵 마커 클러스터링 컴포넌트
 * @param ClustererOptions.map - 카카오맵 인스턴스
 * @param ClustererOptions.markers - 클러스터링할 마커 배열
 * @param ClustererOptions.options - 클러스터의 표시 옵션(ClustererOptions 타입 참고)
 *
 * @example
 * ```tsx
 * const MapWithClusters = () => {
 *   const [map, setMap] = useState<KakaoMapInstance | null>(null);
 *   const markers = [];
 *
 *   return (
 *     <div className="h-[400px]">
 *       <KakaoMap
 *         center={{ lat: 33.450701, lng: 126.570667 }}
 *         level={3}
 *         onMapLoad={setMap}
 *       />
 *       {map && <Clusterer map={map} markers={markers} />}
 *     </div>
 *   );
 * };
 * ```
 */
const Clusterer = ({ map, markers, ...options }: ClustererOptions) => {
  const clustererInstance = useRef<ClustererInstance | null>(null);
  const overlayInstance = useRef<CustomOverlayInstance | null>(null);
  const [screenOffset, setScreenOffset] = useState(SCREEN_OFFSET);

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

  // 클러스터러 초기화
  useEffect(() => {
    if (!map) return;

    // 이전 클러스터러와 마커들을 제거
    if (clustererInstance.current) {
      clustererInstance.current.clear();
      clustererInstance.current.setMap(null);
      clustererInstance.current = null;
    }

    const kakaoMarkers = markers
      .filter((marker): marker is NonNullable<typeof marker> => marker !== null)
      .map((marker) => {
        const kakaoMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            marker.position.lat,
            marker.position.lng,
          ),
          title: marker.title,
          clickable: marker.clickable,
          draggable: marker.draggable,
          image: marker.image,
        });

        // 마커 클릭 이벤트 핸들러
        const handleMarkerClick = (marker: MarkerProps) => {
          if (overlayInstance.current) {
            overlayInstance.current.setMap(null);
          }

          // 클릭된 마커의 위치로 지도 중심 이동
          const position = new window.kakao.maps.LatLng(
            marker.position.lat + screenOffset.LAT,
            marker.position.lng,
          );
          map.setCenter(position);
          map.setLevel(MAP_ZOOM_LEVEL.CLICK);

          const content = `
            <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 4px; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <div style="font-weight: 600; font-size: 14px;">${marker.title}</div>
              <div style="font-size: 12px; color: #666;">${marker.address || ''}</div>
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content,
            position: new window.kakao.maps.LatLng(
              marker.position.lat,
              marker.position.lng,
            ),
            xAnchor: MARKER.X_ANCHOR,
            yAnchor: MARKER.Y_ANCHOR,
          });

          overlayInstance.current = customOverlay;
          overlayInstance.current.setMap(map);
        };

        // 지도 클릭 이벤트 핸들러 - 오버레이 닫기
        window.kakao.maps.event.addListener(map, 'click', function () {
          if (overlayInstance.current) {
            overlayInstance.current.setMap(null);
          }
        });

        window.kakao.maps.event.addListener(kakaoMarker, 'click', () =>
          handleMarkerClick(marker),
        );

        return kakaoMarker;
      });

    // 새로운 클러스터러 생성
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map,
      markers: kakaoMarkers,
      gridSize: 120,
      minLevel: 7,
      minClusterSize: 3,
      disableClickZoom: true,
      styles,
      ...options,
    });

    clustererInstance.current = clusterer;

    return () => {
      if (clustererInstance.current) {
        clustererInstance.current.clear();
        clustererInstance.current.setMap(null);
        clustererInstance.current = null;
        kakaoMarkers.forEach((marker) => marker.setMap(null));
      }
    };
  }, [map, markers, options, styles, screenOffset]);

  return null;
};

export default Clusterer;
