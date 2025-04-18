import { KakaoMapAPI } from '../kakao-map.type';

declare global {
  interface Window {
    kakao: KakaoMapAPI;
  }
}

export {};
