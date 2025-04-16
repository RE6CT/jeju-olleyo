'use client';

import { useState, useEffect } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Clusterer from '@/components/features/map/clusterer';
import Loading from '@/app/loading';
import ErrorMessage from '@/app/error';
import { KakaoMapInstance, MarkerProps } from '@/types/kakao-map.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import { DEFAULT_MAP_OPTIONS } from '@/constants/map.constants';
import { getLatLng, createMarkerImage } from '@/lib/utils/map.util';

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
      return places.map((place: Place, index: number) => ({
        position: getLatLng(place),
        title: place.title,
        image: createMarkerImage(selectedDay),
        day: selectedDay,
        order: index + 1,
        showDay: false,
      }));
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
