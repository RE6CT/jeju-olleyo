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
  gridSize?: number;
  minLevel?: number;
  minClusterSize?: number;
  disableClickZoom?: boolean;
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

export type ClustererInstance = {};

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
