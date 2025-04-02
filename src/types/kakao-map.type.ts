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
