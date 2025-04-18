import { KakaoMapAPI } from '../kakao-map.type';

// element 크기를 나타내는 타입
export type Size = {
  width: number; // 너비
  height: number; // 높이
};

// 좌표를 나타내는 타입
export type Point = {
  x: number; // x 좌표
  y: number; // y 좌표
};

declare global {
  interface Window {
    kakao: KakaoMapAPI;
  }
}

export {};
