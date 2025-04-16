'use client';

import { useState, useEffect } from 'react';
import KakaoMap from '@/components/features/map/kakao-map';
import Clusterer from '@/components/features/map/clusterer';
import Polyline from '@/components/features/map/polyline';
import Loading from '@/app/loading';
import ErrorMessage from '@/app/error';
import { KakaoMapInstance, MarkerProps } from '@/types/kakao-map.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import { DEFAULT_MAP_OPTIONS } from '@/constants/map.constants';
import { getLatLng, createMarkerImage } from '@/lib/utils/map.util';
import { getCarRoute, createRouteInfo } from '@/lib/apis/map/directions';

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
  const [paths, setPaths] = useState<{
    [key: number]: { lat: number; lng: number }[];
  }>({});
  const [routeSummary, setRouteSummary] = useState<{
    [key: number]: { distance: number; duration: number };
  }>({});

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

  // 경로 검색 및 그리기
  const searchRoute = async (markers: MarkerProps[], day: number) => {
    if (!map || markers.length < 2) return;

    try {
      const routeInfo = createRouteInfo(markers);
      const { path, summary } = await getCarRoute(routeInfo, map);

      setPaths((prev) => ({
        ...prev,
        [day]: path,
      }));

      setRouteSummary((prev) => ({
        ...prev,
        [day]: summary,
      }));
    } catch (error) {
      console.error('경로 검색 중 오류 발생:', error);
      setError('경로 검색에 실패했습니다.');
    }
  };

  // 마커 목록 업데이트
  useEffect(() => {
    if (!map) return;

    try {
      const newMarkers = getMarkersToShow();
      if (!areMarkersEqual(markers, newMarkers)) {
        setMarkers(newMarkers);
        adjustMapView(newMarkers);

        // 경로 초기화
        setPaths({});
        setRouteSummary({});

        // 각 날짜별로 경로 검색
        if (activeTab === '전체보기') {
          Object.entries(dayPlaces).forEach(([day, places]) => {
            const dayMarkers = newMarkers.filter(
              (marker) => marker.day === parseInt(day),
            );
            searchRoute(dayMarkers, parseInt(day));
          });
        } else {
          const dayMarkers = newMarkers.filter(
            (marker) => marker.day === activeTab,
          );
          searchRoute(dayMarkers, activeTab);
        }
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
          <>
            <Clusterer
              map={map}
              markers={markers}
              gridSize={60}
              minLevel={5}
              minClusterSize={2}
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
            {Object.entries(paths).map(([day, path]) => (
              <Polyline
                key={day}
                map={map}
                path={path}
                strokeWeight={3}
                strokeColor={parseInt(day) % 2 === 0 ? '#4ECDC4' : '#FF6B6B'}
                strokeOpacity={0.8}
                strokeStyle="solid"
              />
            ))}
            // ... existing code ...
            {Object.entries(routeSummary).map(([day, summary]) => (
              <div
                key={day}
                className="absolute left-2 top-28 rounded-lg bg-white p-2 text-sm text-gray-700 shadow-md"
              >
                Day {day} | 🚗 {summary.distance}km | ⏳ {summary.duration}분
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PlanMap;
