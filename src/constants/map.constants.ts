import { KakaoMapOptions } from '@/types/kakao-map.type';
import { Size, Point } from '@/types/global/window.type';

// 마커 관련 상수 정의
export const MARKER = {
  SIZE: {
    width: 56,
    height: 33,
  } as Size,
  OFFSET: {
    x: 28,
    y: 33,
  } as Point,
} as const;

// 초기 설정 map option
export const DEFAULT_MAP_OPTIONS: KakaoMapOptions = {
  center: { lat: 33.3616666, lng: 126.5291666 },
  level: 10,
};
