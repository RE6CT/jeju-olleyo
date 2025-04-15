import { CATEGORIES } from '@/constants/home.constants';

export type Place = {
  id: number;
  title: string;
  address: string;
  category: Category;
  content_type_id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  isBookmarked: boolean;
  bookmarkCount: number;
};

export type BookmarkStore = {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
};

export type Category = (typeof CATEGORIES)[number];
