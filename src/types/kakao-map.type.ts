export type KakaoMapOptions = {
  center: {
    lat: number;
    lng: number;
  };
  level: number;
};

export type KakaoMapInstance = {
  setCenter(latlng: { getLat(): number; getLng(): number }): void;
  setLevel(level: number): void;
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
  image?: any; // 마커 이미지
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
  setMap(map: KakaoMapInstance | null): void;
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
