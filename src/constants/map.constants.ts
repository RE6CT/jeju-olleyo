import { KakaoMapOptions } from '@/types/kakao-map.type';

// 마커 관련 상수 정의
export const MARKER = {
  SIZE: {
    X: 56,
    Y: 33,
  },
  OFFSET: {
    X: 28,
    Y: 33,
  },
} as const;

// 초기 설정 map option
export const DEFAULT_MAP_OPTIONS: KakaoMapOptions = {
  center: { lat: 33.3616666, lng: 126.5291666 },
  level: 10,
};
