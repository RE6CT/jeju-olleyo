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

  /**
   * 지도 로드 시 호출되는 함수
   * @param map 지도 인스턴스
   */
  const handleMapLoad = (map: KakaoMapInstance) => {
    setMap(map);
    setIsLoading(false);
  };

  /**
   * 지도 로드 오류 시 호출되는 함수
   * @param error 오류 객체
   */
  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  /**
   * 현재 활성화된 탭에 따라 표시할 마커들을 필터링
   * @returns 마커 배열
   */
  const getMarkersToShow = (): MarkerProps[] => {
    if (!dayPlaces) return [];

    try {
      // 1. 현재 탭에 해당하는 장소들만 필터링
      const filteredPlaces =
        activeTab === '전체보기'
          ? Object.entries(dayPlaces).flatMap(([day, places]) =>
              (places || []).map((place) => ({
                ...place,
                day: parseInt(day),
                showDay: true,
              })),
            )
          : (dayPlaces[activeTab as number] || []).map((place) => ({
              ...place,
              day: activeTab as number,
              showDay: false,
            }));

      // 2. 각 장소에 순서 정보 추가
      const placesWithOrder = filteredPlaces.map((place, index) => ({
        ...place,
        order: index + 1,
      }));

      // 3. 유효한 위치 정보를 가진 마커만 생성
      return placesWithOrder
        .map((place) => {
          const position = getLatLng(place);
          if (
            !position ||
            typeof position.lat !== 'number' ||
            typeof position.lng !== 'number'
          ) {
            setError('잘못된 위치 정보입니다.');
            return null;
          }

          return {
            position,
            title: place.title,
            image: createMarkerImage(place.day),
            day: place.day,
            order: place.order,
            showDay: place.showDay,
          };
        })
        .filter(
          (marker): marker is NonNullable<typeof marker> => marker !== null,
        );
    } catch (error) {
      console.error('마커 생성 중 오류 발생:', error);
      setError('마커 생성에 실패했습니다.');
      return [];
    }
  };

  /**
   * 마커 비교를 위한 유틸리티 함수
   * @param prev 이전 마커 배열
   * @param next 현재 마커 배열
   * @returns 마커 배열이 같은지 여부
   */
  const areMarkersEqual = (prev: MarkerProps[], next: MarkerProps[]) => {
    if (prev.length !== next.length) return false;
    return prev.every((prevMarker, index) => {
      const nextMarker = next[index];
      return (
        prevMarker.position.lat === nextMarker.position.lat &&
        prevMarker.position.lng === nextMarker.position.lng &&
        prevMarker.day === nextMarker.day &&
        prevMarker.order === nextMarker.order
      );
    });
  };

  /**
   * 지도 시점 조정 함수
   * @param markers 마커 배열
   */
  const adjustMapView = (markers: MarkerProps[]) => {
    if (!map || markers.length === 0) return;

    try {
      // 1. 모든 마커의 위치를 포함하는 경계 계산
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(
          new window.kakao.maps.LatLng(
            marker.position.lat,
            marker.position.lng,
          ),
        );
      });

      // 2. 경계의 중심점 계산
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      if (!sw || !ne) return;

      const center = new window.kakao.maps.LatLng(
        (sw.getLat() + ne.getLat()) / 2,
        (sw.getLng() + ne.getLng()) / 2,
      );

      // 3. 지도 시점 조정
      map.setBounds(bounds);
    } catch (error) {
      console.error('지도 시점 조정 중 오류 발생:', error);
      setError('지도 시점 조정에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!map) return;

    try {
      const newMarkers = getMarkersToShow();
      if (!areMarkersEqual(markers, newMarkers)) {
        setMarkers(newMarkers);
        adjustMapView(newMarkers);
      }
    } catch (error) {
      console.error('마커 업데이트 중 오류 발생:', error);
      setError('마커 업데이트에 실패했습니다.');
    }
  }, [dayPlaces, activeTab, map, markers]);

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
            gridSize={60} // 클러스터링 격자 크기 감소 (마커가 더 가까이 있을 때만 클러스터링)
            minLevel={5} // 클러스터링이 시작되는 최소 줌 레벨 감소 (더 넓은 영역에서 클러스터링)
            minClusterSize={2} // 클러스터링을 위한 최소 마커 수 감소 (2개 이상 겹치면 클러스터링)
            disableClickZoom={false} // 클러스터 클릭 시 줌인 가능
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
