import { DetailIntroRaw } from './\bkorea-tour.type';

export type Place = {
  address: string;
  category: string;
  content_type_id: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  title: string;
};

export type PlaceType = {
  address: string;
  category: string;
  content_type_id: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  title: string;
};

export type PlaceModalProps = {
  place: PlaceType;
  detailInfo?: DetailIntroRaw;
};
