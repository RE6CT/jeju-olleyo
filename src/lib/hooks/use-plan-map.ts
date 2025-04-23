import { useState, useEffect, useCallback, useRef } from 'react';
import { getCarRoute, createRouteInfo } from '@/lib/apis/map/directions';
import { getLatLng, createMarkerImage } from '@/lib/utils/map.util';
import { KakaoMapInstance, MarkerProps } from '@/types/kakao-map.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';

/**
 * 여행 계획 지도 관련 로직을 관리하는 커스텀 훅
 * @param dayPlaces - 각 일차별 여행지 정보
 * @param activeTab - 현재 활성화된 탭 (전체보기 또는 특정 일차)
 * @param updateRouteSummary - 경로 요약 정보를 업데이트하는 콜백 함수
 */
export const usePlanMap = ({
  dayPlaces,
  activeTab,
  updateRouteSummary,
}: {
  dayPlaces: DayPlaces;
  activeTab: TabType;
  updateRouteSummary: (
    day: number,
    summaries: { distance: number; duration: number }[],
  ) => void;
}) => {
  // 지도 인스턴스 상태
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState<string | null>(null);
  // 마커 정보 상태
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  // 경로 정보 상태
  const [paths, setPaths] = useState<{
    [key: number]: { lat: number; lng: number }[];
  }>({});

  /**
   * 경로 캐시 상태
   * - 목적: 카카오맵 API 호출 결과를 캐싱하여 동일한 경로를 다시 계산하지 않도록 함
   * - 키 형식: 'day-위도,경도|위도,경도...' (일차와 마커 위치 정보를 조합)
   * - 저장 내용: 계산된 경로(path)와 섹션 정보(sections)
   * - 사용 시점: searchRoute 함수 내에서 경로 계산 전에 캐시 확인
   */
  const [routeCache, setRouteCache] = useState<{
    [key: string]: { path: { lat: number; lng: number }[]; sections: any[] };
  }>({});

  /**
   * 이전 dayPlaces 상태를 추적하기 위한 ref
   * - 목적: dayPlaces의 변경 여부를 추적하여 불필요한 마커 업데이트(리렌더링)를 방지
   * - 저장 내용: 이전 dayPlaces 객체 전체
   * - 사용 시점: useEffect 내에서 마커 업데이트 전에 변경 여부 확인
   */
  const prevDayPlacesRef = useRef<DayPlaces>({});

  /**
   * 지도 로드 완료 핸들러
   * @param map - 로드된 카카오맵 인스턴스
   */
  const handleMapLoad = (map: KakaoMapInstance) => {
    setMap(map);
    setIsLoading(false);
  };

  /**
   * 지도 로드 실패 핸들러
   * @param error - 발생한 에러 객체
   */
  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  /**
   * 마커 클릭 시 해당 마커로 지도 포커스
   * @param marker - 클릭된 마커 객체
   */
  const handleMarkerClick = useCallback(
    (marker: MarkerProps) => {
      if (!map) return;

      try {
        // 클릭된 마커의 위치로 지도 중심 이동
        const position = new window.kakao.maps.LatLng(
          marker.position.lat,
          marker.position.lng,
        );

        map.setCenter(position);
        map.setLevel(4);
      } catch (error) {
        console.error('마커 포커스 중 오류 발생:', error);
      }
    },
    [map],
  );

  /**
   * 현재 활성화된 탭에 따라 표시할 마커 목록을 반환
   * @returns MarkerProps[] - 표시할 마커 목록
   */
  const getMarkersToShow = useCallback((): MarkerProps[] => {
    if (!dayPlaces) return [];

    try {
      // 전체보기 또는 특정 일차에 따라 마커 필터링
      const filteredPlaces =
        activeTab === '전체보기'
          ? Object.entries(dayPlaces).flatMap(([day, places]) =>
              (places || []).map((place) => ({
                ...place,
                day: parseInt(day),
                showDay: true, // 전체보기 시 일차 표시
              })),
            )
          : (dayPlaces[activeTab as number] || []).map((place) => ({
              ...place,
              day: activeTab as number,
              showDay: false, // 특정 일차 선택 시 일차 미표시
            }));

      // 마커 순서 정보 추가
      const placesWithOrder = filteredPlaces.map((place, index) => ({
        ...place,
        order: index + 1,
      }));

      // 마커 객체 생성
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
            onClick: () =>
              handleMarkerClick({
                position,
                title: place.title,
                day: place.day,
                order: place.order,
                showDay: place.showDay,
              }),
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
  }, [dayPlaces, activeTab, handleMarkerClick]);

  /**
   * 지도 뷰를 마커들의 위치에 맞게 조정
   * @param markers - 표시할 마커 목록
   */
  const adjustMapView = useCallback(
    (markers: MarkerProps[]) => {
      if (!map || markers.length === 0) return;

      try {
        // 모든 마커를 포함하는 경계 상자 생성
        const bounds = new window.kakao.maps.LatLngBounds();
        markers.forEach((marker) => {
          bounds.extend(
            new window.kakao.maps.LatLng(
              marker.position.lat,
              marker.position.lng,
            ),
          );
        });

        // 지도 뷰 조정
        map.setBounds(bounds);
      } catch (error) {
        console.error('지도 시점 조정 중 오류 발생:', error);
        setError('지도 시점 조정에 실패했습니다.');
      }
    },
    [map],
  );

  /**
   * 두 지점 간의 경로를 검색하고 캐싱
   * @param markers - 경로를 계산할 마커 목록
   * @param day - 일차 정보
   */
  const searchRoute = useCallback(
    async (markers: MarkerProps[], day: number) => {
      if (!map || markers.length < 2) return;

      try {
        // 캐시 키 생성 (일차와 마커 위치 정보를 조합)
        const cacheKey = `${day}-${markers.map((m) => `${m.position.lat},${m.position.lng}`).join('|')}`;

        // 캐시된 경로가 있으면 재사용
        if (routeCache[cacheKey]) {
          const { path, sections } = routeCache[cacheKey];
          setPaths((prev) => ({ ...prev, [day]: path }));
          updateRouteSummary(day, sections);
          return;
        }

        // 새로운 경로 계산
        const routeInfo = createRouteInfo(markers);
        const { path, sections } = await getCarRoute(routeInfo);

        // 경로 캐싱
        setRouteCache((prev) => ({ ...prev, [cacheKey]: { path, sections } }));
        setPaths((prev) => ({ ...prev, [day]: path }));

        // 경로 요약 정보 업데이트
        const placeSummaries = markers.map((marker, index) => {
          if (index === markers.length - 1) return { distance: 0, duration: 0 };
          return sections[index];
        });

        updateRouteSummary(day, placeSummaries);
      } catch (error) {
        console.error('경로 검색 중 오류 발생:', error);
        setError('경로 검색에 실패했습니다.');
      }
    },
    [map, routeCache, updateRouteSummary],
  );

  /**
   * 마커와 경로 정보 업데이트
   */
  useEffect(() => {
    if (!map) return;

    let isMounted = true;

    const updateMarkersAndRoutes = async () => {
      try {
        const newMarkers = getMarkersToShow();
        // dayPlaces 변경 여부 확인
        const dayPlacesChanged =
          JSON.stringify(dayPlaces) !==
          JSON.stringify(prevDayPlacesRef.current);

        // 마커나 dayPlaces가 변경된 경우에만 업데이트
        if (
          dayPlacesChanged ||
          JSON.stringify(markers) !== JSON.stringify(newMarkers)
        ) {
          setMarkers(newMarkers);
          adjustMapView(newMarkers);
          prevDayPlacesRef.current = dayPlaces;

          // 전체보기 모드
          if (activeTab === '전체보기') {
            // 모든 일차의 경로를 병렬로 계산
            const dayPromises = Object.entries(dayPlaces).map(async ([day]) => {
              const dayMarkers = newMarkers.filter(
                (marker) => marker.day === parseInt(day),
              );
              if (dayMarkers.length >= 2) {
                await searchRoute(dayMarkers, parseInt(day));
              }
            });
            await Promise.all(dayPromises);
          }
          // 특정 일차 선택 모드
          else {
            const dayMarkers = newMarkers.filter(
              (marker) => marker.day === activeTab,
            );
            if (dayMarkers.length >= 2) {
              await searchRoute(dayMarkers, activeTab);
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error('마커 업데이트 중 오류 발생:', error);
          setError('마커 업데이트에 실패했습니다.');
        }
      }
    };

    updateMarkersAndRoutes();

    // 컴포넌트 언마운트 시 정리
    return () => {
      isMounted = false;
    };
  }, [dayPlaces, activeTab, map, getMarkersToShow, adjustMapView, searchRoute]);

  return {
    map,
    isLoading,
    error,
    markers,
    paths,
    handleMapLoad,
    handleMapError,
  };
};
