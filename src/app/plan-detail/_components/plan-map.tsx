'use client';

import { useState, useEffect } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Clusterer from '@/components/features/map/clusterer';
import Loading from '@/app/loading';
import ErrorMessage from '@/app/error';
import {
  KakaoMapInstance,
  KakaoMapOptions,
  MarkerProps,
} from '@/types/kakao-map.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import { MARKER } from '@/constants/map.constants';

// 초기 설정 map option
const DEFAULT_MAP_OPTIONS: KakaoMapOptions = {
  center: { lat: 33.3616666, lng: 126.5291666 },
  level: 10,
};

const PlanMap = ({
  dayPlaces,
  activeTab,
}: {
  dayPlaces: DayPlaces;
  activeTab: TabType;
}) => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  const handleMapLoad = (map: KakaoMapInstance) => {
    setMap(map);
    setIsLoading(false);
  };

  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  // 위치 정보 변환 함수
  const getLatLng = (place: Place) => {
    // 위도, 경도 정보가 있는지 확인
    if ('latitude' in place && 'longitude' in place) {
      const lat =
        typeof place.latitude === 'string'
          ? parseFloat(place.latitude)
          : Number(place.latitude);
      const lng =
        typeof place.longitude === 'string'
          ? parseFloat(place.longitude)
          : Number(place.longitude);
      return { lat, lng };
    }
    if ('lat' in place && 'lng' in place) {
      const lat =
        typeof place.lat === 'string'
          ? parseFloat(place.lat)
          : Number(place.lat);
      const lng =
        typeof place.lng === 'string'
          ? parseFloat(place.lng)
          : Number(place.lng);
      return { lat, lng };
    }
    // 기본값 반환 (제주도 중심)
    return DEFAULT_MAP_OPTIONS.center;
  };

  // 마커 이미지 생성 함수
  const createMarkerImage = (day: number) => {
    const imageSize = new window.kakao.maps.Size(MARKER.SIZE, MARKER.SIZE);
    const imageUrl =
      day % 2 === 1
        ? `/map/primary500-mapmarker-day${day}.png` // 홀수일: primary500 마커 이미지
        : `/map/secondary300-mapmarker-day${day}.png`; // 짝수일: secondary300 마커 이미지

    return new window.kakao.maps.MarkerImage(imageUrl, imageSize, {
      offset: new window.kakao.maps.Point(MARKER.OFFSET.X, MARKER.OFFSET.Y),
    });
  };

  // 현재 활성화된 탭에 따라 표시할 마커들을 필터링
  const getMarkersToShow = () => {
    if (!dayPlaces) return [];

    if (activeTab === '전체보기') {
      // 전체 일정의 모든 마커 표시
      return Object.entries(dayPlaces).flatMap(([day, places]) =>
        (places || []).map((place: Place, index: number) => {
          const position = getLatLng(place);
          const dayNumber = parseInt(day);
          return {
            position,
            title: place.title,
            image: createMarkerImage(dayNumber),
            day: dayNumber,
            order: index + 1,
            showDay: true,
          };
        }),
      );
    } else {
      // 선택된 일자의 마커만 표시
      const selectedDay = typeof activeTab === 'number' ? activeTab : 1;
      const places = dayPlaces[selectedDay] || [];
      return places.map((place: Place, index: number) => {
        const position = getLatLng(place);
        return {
          position,
          title: place.title,
          image: createMarkerImage(selectedDay),
          day: selectedDay,
          order: index + 1,
          showDay: false,
        };
      });
    }
  };

  // 마커 목록 업데이트
  useEffect(() => {
    if (!map) return;
    const newMarkers = getMarkersToShow();
    setMarkers(newMarkers);
  }, [dayPlaces, activeTab, map]);

  return (
    <>
      <div className="sticky top-0 h-8 bg-slate-50"></div>
      <div className="sticky top-8 z-40 mt-4 h-[326px] w-full overflow-hidden rounded-[12px]">
        {isLoading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <KakaoMap
          {...DEFAULT_MAP_OPTIONS}
          onMapLoad={handleMapLoad}
          onError={handleMapError}
        />
        {map && !isLoading && !error && (
          <Clusterer
            map={map}
            markers={markers}
            gridSize={120}
            minLevel={7}
            minClusterSize={3}
            disableClickZoom={false}
            styles={[
              {
                width: '40px',
                height: '40px',
                background: '#FF6B6B',
                borderRadius: '20px',
                color: '#fff',
                textAlign: 'center',
                lineHeight: '41px',
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default PlanMap;
