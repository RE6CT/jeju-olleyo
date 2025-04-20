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

// map marker 클러스터링 옵션
export const CLUSTERER_OPTIONS = {
  GRID_SIZE: 60,
  MIN_LEVEL: 5,
  MIN_CLUSTER_SIZE: 2,
  DISABLE_CLICK_ZOOM: false,
  STYLES: [
    {
      width: '40px',
      height: '40px',
      background: '#FF6B6B',
      borderRadius: '20px',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '41px',
    },
  ],
} as const;

// 폴리라인 스타일 옵션
export const POLYLINE_OPTIONS = {
  STROKE_WEIGHT: 3,
  STROKE_OPACITY: 0.8,
  STROKE_STYLE: 'solid',
  COLORS: {
    EVEN: '#4ECDC4',
    ODD: '#FF6B6B',
  },
} as const;
