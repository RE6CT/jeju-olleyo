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

export type MarkerOptions = {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  clickable: boolean;
  draggable: boolean;
};

export type MarkerInstance = {
  setMap(map: KakaoMapInstance | null): void;
  setPosition(position: { getLat(): number; getLng(): number }): void;
  setTitle(title: string): void;
  setClickable(clickable: boolean): void;
  setDraggable(draggable: boolean): void;
};
