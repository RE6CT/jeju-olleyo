import {
  KakaoMapResponse,
  KakaoMapRoad,
  KakaoMapSection,
  MarkerProps,
  RouteInfo,
  RouteSummary,
} from '@/types/kakao-map.type';

/**
 * 카카오맵 API를 사용하여 자동차 경로를 검색하고 그리는 함수
 * @param routeInfo 경로 정보 (출발지, 도착지, 경유지)
 * @param map 카카오맵 인스턴스
 * @returns Promise<{ path: { lat: number; lng: number }[]; summary: RouteSummary; sections: { distance: number; duration: number }[] }>
 */
export const getCarRoute = async (
  routeInfo: RouteInfo,
): Promise<{
  path: { lat: number; lng: number }[];
  summary: RouteSummary;
  sections: { distance: number; duration: number }[];
}> => {
  if (!routeInfo.start || !routeInfo.end) {
    throw new Error('출발지와 도착지를 설정해 주세요.');
  }

  // 동일한 좌표가 연속해서 있는지 확인
  const allPoints = [routeInfo.start, ...routeInfo.via, routeInfo.end];
  const uniquePoints = allPoints.filter(
    (point, index, self) =>
      index ===
      self.findIndex((p) => p.lat === point.lat && p.lng === point.lng),
  );

  // 동일한 좌표가 연속해서 있으면 빈 경로 반환
  if (uniquePoints.length !== allPoints.length) {
    return {
      path: [],
      summary: { distance: 0, duration: 0 },
      sections: [],
    };
  }

  const origin = `${routeInfo.start.lng},${routeInfo.start.lat}`;
  const destination = `${routeInfo.end.lng},${routeInfo.end.lat}`;
  const viaPoints = routeInfo.via
    .map((via) => `${via.lng},${via.lat}`)
    .join('|');

  const headers = {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
    'Content-Type': 'application/json',
  };

  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destination,
    waypoints: viaPoints,
    priority: 'RECOMMEND',
    car_type: '1',
    alternatives: 'false',
  });

  const requestUrl = `https://apis-navi.kakaomobility.com/v1/directions?${queryParams}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers,
      cache: 'no-cache',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: KakaoMapResponse = await response.json();

    let totalDistance = 0;
    let totalDuration = 0;
    const linePath: { lat: number; lng: number }[] = [];
    const sections: { distance: number; duration: number }[] = [];

    data.routes[0].sections.forEach((section: KakaoMapSection) => {
      const sectionDistance = section.distance;
      const sectionDuration = section.duration;

      totalDistance += sectionDistance;
      totalDuration += sectionDuration;

      sections.push({
        distance: Math.round(sectionDistance),
        duration: Math.round(sectionDuration / 60), // 초 -> 분 변환
      });

      section.roads.forEach((road: KakaoMapRoad) => {
        road.vertexes.forEach((_, index: number) => {
          if (index % 2 === 0) {
            linePath.push({
              lat: road.vertexes[index + 1],
              lng: road.vertexes[index],
            });
          }
        });
      });
    });

    return {
      path: linePath,
      summary: {
        distance: Math.round(totalDistance),
        duration: Math.round(totalDuration / 60), // 초 -> 분 변환
      },
      sections,
    };
  } catch (error) {
    console.error('경로 검색 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 마커 배열을 기반으로 경로 정보를 생성하는 함수
 * @param markers 마커 배열
 * @returns RouteInfo
 */
export const createRouteInfo = (markers: MarkerProps[]): RouteInfo => {
  const sortedMarkers = markers.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    start: sortedMarkers[0].position,
    end: sortedMarkers[sortedMarkers.length - 1].position,
    via: sortedMarkers.slice(1, -1).map((marker) => marker.position),
  };
};
