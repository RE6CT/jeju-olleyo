import { BOTTOM_CATEGORIES } from '@/constants/home.constants';

export type PlaceWithLiked = {
  place_id: number;
  title: string;
  image: string;
  address: string;
  category: Category;
  is_liked: boolean;
};

export type Place = {
  id: number;
  title: string;
  image: string | null;
  address: string;
  category: Category;
  isBookmarked: boolean;
};

export type BookmarkStore = {
  bookmarks: number[];
  addBookmark: (id: number) => void;
  removeBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
};

export type Category = (typeof BOTTOM_CATEGORIES)[number];

export type PlaceResponse = {
  place_id: number;
  title: string;
  image: string;
  address: string;
  category: Category;
  content_type: number;
  is_liked: boolean;
};
