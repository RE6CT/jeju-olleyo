/**
 * 카카오맵 API의 기본 타입들
 */

import { Point, Size } from './global/window.type';

// 지도 위의 좌표를 나타내는 타입
export type LatLng = {
  lat: number; // 위도
  lng: number; // 경도
};

// 지도의 영역을 나타내는 타입
export type LatLngBounds = {
  extend: (latlng: LatLng) => void; // 위치 데이터를 추가하여 영역을 재결정하는 메서드
  getCenter: () => { getLat(): number; getLng(): number }; // 영역의 중심점을 반환하는 메서드
  getSouthWest: () => { getLat(): number; getLng(): number }; // 영역의 남서쪽 좌표를 반환하는 메서드
  getNorthEast: () => { getLat(): number; getLng(): number }; // 영역의 북동쪽 좌표를 반환하는 메서드
};

/**
 * 마커 관련 타입들
 */

// 마커 이미지 옵션 타입
export type MarkerImage = {
  src: string; // 이미지 URL
  size: Size; // 이미지 크기
  options?: {
    offset?: Point; // 이미지의 기준점
  };
};

// 마커 생성 옵션 타입
export type MarkerOptions = {
  position: LatLng; // 마커의 위치
  title: string; // 마커의 제목
  clickable?: boolean; // 클릭 가능 여부
  draggable?: boolean; // 드래그 가능 여부
  onClick?: () => void; // 클릭 이벤트 핸들러
  day?: number; // 일자 (홀수/짝수에 따라 마커 색상 변경)
  order?: number; // 순서 번호
  showDay?: boolean; // 일자 표시 여부
  image?: MarkerImage; // 마커 이미지
};

// 마커 인스턴스 타입
export type MarkerInstance = {
  setMap: (map: KakaoMapInstance | null) => void; // 마커를 지도에 표시하거나 제거
  setPosition: (position: LatLng) => void; // 마커의 위치 변경
  setTitle: (title: string) => void; // 마커의 제목 변경
  setClickable: (clickable: boolean) => void; // 마커의 클릭 가능 여부 변경
  setDraggable: (draggable: boolean) => void; // 마커의 드래그 가능 여부 변경
  setImage: (image: MarkerImage) => void; // 마커의 이미지 변경
  addListener: (event: string, callback: () => void) => void; // 이벤트 리스너 추가
  removeListener: (event: string, callback: () => void) => void; // 이벤트 리스너 제거
};

// 마커 속성 타입
export type MarkerProps = MarkerOptions & {
  map?: KakaoMapInstance; // 마커가 표시될 지도
  onClick?: () => void; // 클릭 이벤트 핸들러
};

/**
 * 지도 관련 타입들
 */

// 지도 생성 옵션 타입
export type KakaoMapOptions = {
  center: LatLng; // 지도의 중심 좌표
  level: number; // 지도의 확대 레벨
};

// 지도 인스턴스 타입
export type KakaoMapInstance = {
  setCenter: (latlng: LatLng) => void; // 지도의 중심 좌표 변경
  setLevel: (level: number) => void; // 지도의 확대 레벨 변경
  setBounds: (bounds: LatLngBounds) => void; // 지도의 영역 변경
  panTo: (
    latlng: LatLng,
    options?: { animate: boolean; duration: number },
  ) => void; // 중심 좌표 기준 부드럽게 이동
  getCenter(): { getLat(): number; getLng(): number }; // 지도의 중심 좌표 반환
  getLevel(): number; // 지도의 확대 레벨 반환
};

// 지도 컴포넌트 속성 타입
export type KakaoMapProps = KakaoMapOptions & {
  onMapLoad: (map: KakaoMapInstance) => void; // 지도 로드 완료 시 호출되는 콜백
  onError: (error: Error) => void; // 에러 발생 시 호출되는 콜백
};

/**
 * 클러스터 관련 타입들
 */

// 클러스터 생성 옵션 타입
export type ClustererOptions = {
  map: KakaoMapInstance; // 클러스터가 표시될 지도
  markers: MarkerProps[]; // 클러스터에 포함될 마커들
  gridSize?: number; // 클러스터의 격자 크기
  minLevel?: number; // 클러스터가 표시될 최소 지도 레벨
  minClusterSize?: number; // 클러스터가 생성될 최소 마커 수
  disableClickZoom?: boolean; // 클러스터 클릭 시 줌 동작 비활성화 여부
  styles?: {
    width: string;
    height: string;
    background: string;
    borderRadius: string;
    color: string;
    textAlign: string;
    lineHeight: string;
  }[]; // 클러스터 스타일
  onMarkerClick?: (marker: MarkerProps) => void; // 마커 클릭 이벤트 핸들러
};

// 클러스터 인스턴스 타입
export type ClustererInstance = {
  setMap: (map: KakaoMapInstance | null) => void; // 클러스터를 지도에 표시하거나 제거
  clear: () => void; // 클러스터 초기화
};

// 클러스터러 옵션 타입
export type MarkerClustererOptions = {
  map: KakaoMapInstance; // 클러스터러가 표시될 지도
  markers: MarkerInstance[]; // 클러스터러에 포함될 마커들
  gridSize?: number; // 클러스터러의 격자 크기
  minLevel?: number; // 클러스터러가 표시될 최소 지도 레벨
  minClusterSize?: number; // 클러스터러가 생성될 최소 마커 수
  disableClickZoom?: boolean; // 클러스터러 클릭 시 줌 동작 비활성화 여부
  styles?: {
    width: string;
    height: string;
    background: string;
    borderRadius: string;
    color: string;
    textAlign: string;
    lineHeight: string;
  }[]; // 클러스터러 스타일
};

// 클러스터러 인스턴스 타입
export type MarkerClustererInstance = {
  setMap: (map: KakaoMapInstance | null) => void; // 클러스터러를 지도에 표시하거나 제거
  clear: () => void; // 클러스터러 초기화
};

/**
 * 경로 관련 타입들
 */

// 경로 옵션 타입
export type PolylineOptions = {
  path: Array<{ lat: number; lng: number }>; // 경로를 구성하는 좌표들
  strokeWeight?: number; // 선의 두께
  strokeColor?: string; // 선의 색상
  strokeOpacity?: number; // 선의 투명도
  strokeStyle?: 'solid' | 'dot' | 'dash' | 'dashdot'; // 선의 스타일
};

// 경로 인스턴스 타입
export type PolylineInstance = {
  setMap: (map: KakaoMapInstance | null) => void; // 경로를 지도에 표시하거나 제거
  setOptions: (options: PolylineOptions) => void; // 경로 옵션 변경
  setPath: (path: LatLng[]) => void; // 경로 좌표 변경
};

// 경로 속성 타입
export type PolylineProps = PolylineOptions & {
  map?: KakaoMapInstance; // 경로가 표시될 지도
};

/**
 * 카카오맵 API 응답 타입들
 */

// 경로 정보 타입
export type RouteInfo = {
  start: LatLng; // 출발지 좌표
  end: LatLng; // 도착지 좌표
  via: LatLng[]; // 경유지 좌표들
};

// 경로 요약 정보 타입
export type RouteSummary = {
  distance: number; // 총 거리 (미터)
  duration: number; // 총 시간 (분)
};

// 경로 구간 정보 타입
export type KakaoMapSection = {
  distance: number; // 구간 거리
  duration: number; // 구간 시간
  roads: KakaoMapRoad[]; // 구간의 도로들
};

// 도로 정보 타입
export type KakaoMapRoad = {
  vertexes: number[]; // 도로의 정점들
  name: string; // 도로명
  distance: number; // 도로 거리
  duration: number; // 도로 통행 시간
  traffic_speed: number; // 교통 속도
  traffic_state: number; // 교통 상태
  vertex_type: string; // 정점 타입
};

// 카카오맵 API 응답 타입
export type KakaoMapResponse = {
  routes: {
    sections: KakaoMapSection[]; // 경로 구간들
  }[];
};

// 위치 데이터 타입
export type LocationData = {
  visit_order: number | null; // 방문 순서
  places: {
    id: number; // 장소 ID
    address: string; // 주소
    place_id: number; // 장소 ID
    content_type_id: number; // 콘텐츠 타입 ID
    image: string | null; // 이미지 URL
    lng: number; // 경도
    lat: number; // 위도
    title: string; // 제목
    category: string; // 카테고리
  };
};

// 이벤트 타겟 타입
export type KakaoMapEventTarget =
  | KakaoMapInstance
  | MarkerInstance
  | PolylineInstance
  | MarkerClustererInstance;

/**
 * 카카오맵 API 타입
 */

export type KakaoMapAPI = {
  maps: {
    services: {
      Geocoder: new () => {
        addressSearch: (
          address: string,
          callback: (
            result: Array<{
              address_name: string;
              y: string;
              x: string;
              address_type: string;
              address: {
                address_name: string;
                region_1depth_name: string;
                region_2depth_name: string;
                region_3depth_name: string;
                region_3depth_h_name: string;
                h_code: string;
                b_code: string;
                mountain_yn: string;
                main_address_no: string;
                sub_address_no: string;
                x: string;
                y: string;
              };
              road_address: {
                address_name: string;
                region_1depth_name: string;
                region_2depth_name: string;
                region_3depth_name: string;
                road_name: string;
                underground_yn: string;
                main_building_no: string;
                sub_building_no: string;
                building_name: string;
                zone_no: string;
                x: string;
                y: string;
              };
            }>,
            status: string,
          ) => void,
        ) => void;
      };
    };
    LatLng: new (lat: number, lng: number) => LatLng;
    Map: new (
      container: HTMLElement,
      options: {
        center: LatLng;
        level: number;
      },
    ) => KakaoMapInstance;
    Marker: new (options: {
      position: LatLng;
      map?: KakaoMapInstance;
      title?: string;
      clickable?: boolean;
      draggable?: boolean;
      image?: MarkerImage;
    }) => MarkerInstance;
    MarkerImage: new (
      src: string,
      size: Size,
      options?: {
        offset?: Point;
      },
    ) => MarkerImage;
    Size: new (width: number, height: number) => Size;
    Point: new (x: number, y: number) => Point;
    LatLngBounds: new () => LatLngBounds;
    Polyline: new (options: PolylineOptions) => PolylineInstance;
    MarkerClusterer: new (
      options: MarkerClustererOptions,
    ) => MarkerClustererInstance;
    event: {
      addListener: (
        target: KakaoMapEventTarget,
        event: string,
        callback: () => void,
      ) => void;
      removeListener: (
        target: KakaoMapEventTarget,
        event: string,
        callback: () => void,
      ) => void;
    };
    load: (callback: () => void) => void;
  };
};
