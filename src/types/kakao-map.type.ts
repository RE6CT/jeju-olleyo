export type KakaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

export type KakaoMapInstance = {
  setCenter: (latlng: LatLng) => void;
  setLevel: (level: number) => void;
  setBounds: (bounds: LatLngBounds) => void;
  panTo: (
    latlng: LatLng,
    options?: { animate: boolean; duration: number },
  ) => void; // 중심 좌표 기준 부드럽게 이동(필요하다면 zoom 이동까지)
  getCenter(): { getLat(): number; getLng(): number };
  getLevel(): number;
};

export type KakaoMapProps = KakaoMapOptions & {
  onMapLoad: (map: KakaoMapInstance) => void;
  onError: (error: Error) => void;
};

export type MarkerOptions = {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  clickable?: boolean;
  draggable?: boolean;
  onClick?: () => void;
  day?: number; // 일자 (홀수/짝수에 따라 마커 색상 변경)
  order?: number; // 순서 번호
  showDay?: boolean; // 일자 표시 여부
  image?: MarkerImage; // 마커 이미지
};

export type MarkerInstance = {
  setMap(map: KakaoMapInstance | null): void;
  setPosition(position: { getLat(): number; getLng(): number }): void;
  setTitle(title: string): void;
  setClickable(clickable: boolean): void;
  setDraggable(draggable: boolean): void;
  addListener(event: string, callback: () => void): void;
};

export type MarkerProps = MarkerOptions & {
  map?: KakaoMapInstance;
  onClick?: () => void;
};

export type ClustererOptions = {
  map: KakaoMapInstance;
  markers: MarkerProps[];
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
  }[];
};

export type ClustererInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
  clear: () => void;
};

export type PolylineOptions = {
  path: {
    lat: number;
    lng: number;
  }[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: 'solid' | 'dot' | 'dash' | 'dashdot';
};

export type PolylineInstance = {
  setMap(map: KakaoMapInstance | null): void;
  setOptions(options: PolylineOptions): void;
  setPath(path: { getLat(): number; getLng(): number }[]): void;
};

export type PolylineProps = PolylineOptions & {
  map?: KakaoMapInstance;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type LatLngBounds = {
  extend: (latlng: LatLng) => void;
  getCenter: () => { getLat(): number; getLng(): number };
};

export type MarkerImage = {
  src: string;
  size: Size;
  options?: {
    offset?: Point;
  };
};

export type Size = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type RouteInfo = {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  via: { lat: number; lng: number }[];
};

export type RouteSummary = {
  distance: number;
  duration: number;
};

export type KakaoMapSection = {
  distance: number;
  duration: number;
  roads: KakaoMapRoad[];
};

export type KakaoMapRoad = {
  vertexes: number[];
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertex_type: string;
};

export type KakaoMapResponse = {
  routes: {
    sections: KakaoMapSection[];
  }[];
};

export type LocationData = {
  visit_order: number | null;
  places: {
    id: number;
    address: string;
    place_id: number;
    content_type_id: number;
    image: string | null;
    lng: number;
    lat: number;
    title: string;
    category: string;
  };
};

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
    LatLng: new (
      lat: number,
      lng: number,
    ) => {
      getLat: () => number;
      getLng: () => number;
    };
    Map: new (
      container: HTMLElement,
      options: {
        center: {
          getLat(): number;
          getLng(): number;
        };
        level: number;
      },
    ) => KakaoMapInstance;
    Marker: new (options: {
      position: { getLat(): number; getLng(): number };
      map?: KakaoMapInstance;
    }) => {
      setMap: (map: KakaoMapInstance | null) => void;
      setPosition: (position: { getLat(): number; getLng(): number }) => void;
    };
    MarkerImage: new (
      src: string,
      size: { width: number; height: number },
      options?: {
        offset?: { x: number; y: number };
      },
    ) => void;
    Size: new (width: number, height: number) => void;
    Point: new (x: number, y: number) => void;
    load: (callback: () => void) => void;
  };
};
