import { MARKER } from '@/constants/map.constants';
import { MarkerImage } from '@/types/kakao-map.type';
import { Place } from '@/types/search.type';

/**
 * Place 객체에서 위도, 경도 정보를 추출하는 함수
 * @param place - 위도, 경도 정보가 포함된 Place 객체
 * @returns 위도, 경도 정보를 포함한 객체
 */
export const getLatLng = (place: Place) => {
  if ('latitude' in place && 'longitude' in place) {
    const lat =
      typeof place.latitude === 'string'
        ? parseFloat(place.latitude)
        : Number(place.latitude);
    const lng =
      typeof place.longitude === 'string'
        ? parseFloat(place.longitude)
        : Number(place.longitude);
    return { lat, lng };
  }
  if ('lat' in place && 'lng' in place) {
    const lat =
      typeof place.lat === 'string' ? parseFloat(place.lat) : Number(place.lat);
    const lng =
      typeof place.lng === 'string' ? parseFloat(place.lng) : Number(place.lng);
    return { lat, lng };
  }
  return { lat: 33.3616666, lng: 126.5291666 }; // 제주도 중심 좌표
};

/**
 * 마커 이미지를 생성하는 함수
 * @param day - 일자 (홀수/짝수에 따라 마커 색상 변경)
 * @returns 생성된 마커 이미지
 */
export const createMarkerImage = (day: number): MarkerImage => {
  const imageSize = new window.kakao.maps.Size(
    MARKER.SIZE.width,
    MARKER.SIZE.height,
  );
  const imageUrl = `/map/mapmarker-day${day}.png`;

  return new window.kakao.maps.MarkerImage(imageUrl, imageSize, {
    offset: new window.kakao.maps.Point(MARKER.OFFSET.x, MARKER.OFFSET.y),
  });
};
