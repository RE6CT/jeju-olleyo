import { useState, useEffect } from 'react';
import { getCarRoute, createRouteInfo } from '@/lib/apis/map/directions';
import { getLatLng, createMarkerImage } from '@/lib/utils/map.util';
import { KakaoMapInstance, MarkerProps } from '@/types/kakao-map.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';

export const usePlanMap = ({
  dayPlaces,
  activeTab,
  setRouteSummary,
}: {
  dayPlaces: DayPlaces;
  activeTab: TabType;
  setRouteSummary: React.Dispatch<
    React.SetStateAction<{
      [key: number]: { distance: number; duration: number }[];
    }>
  >;
}) => {
  const [map, setMap] = useState<KakaoMapInstance | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [paths, setPaths] = useState<{
    [key: number]: { lat: number; lng: number }[];
  }>({});

  const handleMapLoad = (map: KakaoMapInstance) => {
    setMap(map);
    setIsLoading(false);
  };

  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  const getMarkersToShow = (): MarkerProps[] => {
    if (!dayPlaces) return [];

    try {
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

      const placesWithOrder = filteredPlaces.map((place, index) => ({
        ...place,
        order: index + 1,
      }));

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

  const adjustMapView = (markers: MarkerProps[]) => {
    if (!map || markers.length === 0) return;

    try {
      const bounds = new window.kakao.maps.LatLngBounds();
      markers.forEach((marker) => {
        bounds.extend(
          new window.kakao.maps.LatLng(
            marker.position.lat,
            marker.position.lng,
          ),
        );
      });

      map.setBounds(bounds);
    } catch (error) {
      console.error('지도 시점 조정 중 오류 발생:', error);
      setError('지도 시점 조정에 실패했습니다.');
    }
  };

  const searchRoute = async (markers: MarkerProps[], day: number) => {
    if (!map || markers.length < 2) return;

    try {
      const routeInfo = createRouteInfo(markers);
      const { path, sections } = await getCarRoute(routeInfo);

      const newPaths = { ...paths, [day]: path };
      setPaths(newPaths);

      const placeSummaries = markers.map((marker, index) => {
        if (index === markers.length - 1) return { distance: 0, duration: 0 };
        return sections[index];
      });

      setRouteSummary((prev) => ({
        ...prev,
        [day]: placeSummaries,
      }));
    } catch (error) {
      console.error('경로 검색 중 오류 발생:', error);
      setError('경로 검색에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (!map) return;

    let isMounted = true;

    const updateMarkersAndRoutes = () => {
      try {
        const newMarkers = getMarkersToShow();
        if (JSON.stringify(markers) !== JSON.stringify(newMarkers)) {
          setMarkers(newMarkers);
          adjustMapView(newMarkers);

          setPaths({});
          setRouteSummary({});

          if (activeTab === '전체보기') {
            Object.entries(dayPlaces).forEach(([day]) => {
              const dayMarkers = newMarkers.filter(
                (marker) => marker.day === parseInt(day),
              );
              searchRoute(dayMarkers, parseInt(day)).catch((error) => {
                if (isMounted) {
                  console.error('경로 검색 중 오류 발생:', error);
                  setError('경로 검색에 실패했습니다.');
                }
              });
            });
          } else {
            const dayMarkers = newMarkers.filter(
              (marker) => marker.day === activeTab,
            );
            searchRoute(dayMarkers, activeTab).catch((error) => {
              if (isMounted) {
                console.error('경로 검색 중 오류 발생:', error);
                setError('경로 검색에 실패했습니다.');
              }
            });
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

    return () => {
      isMounted = false;
    };
  }, [
    dayPlaces,
    activeTab,
    map,
    markers,
    adjustMapView,
    getMarkersToShow,
    searchRoute,
    setRouteSummary,
  ]);

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
