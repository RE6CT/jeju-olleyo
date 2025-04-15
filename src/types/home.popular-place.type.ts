import { CATEGORIES } from '@/constants/home.constants';

export type Place = {
  id: number;
  title: string;
  address: string;
  category: string;
  content_type_id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  isBookmarked: boolean;
  name: string;
  bookmarkCount: number;
};

export type BookmarkStore = {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
};

export type PlaceCardProps = {
  place: Place;
};

export type Category = (typeof CATEGORIES)[number];
