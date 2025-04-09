// TODO : 검색 페이지 최종 로직 확정 시, 변수 타입 카멜케이스로 변경 예정

export type Place = {
  id: number;
  place_id: number;
  title: string;
  address: string;
  category: string;
  content_type_id: number;
  image: string | null;
  lat: number;
  lng: number;
};
