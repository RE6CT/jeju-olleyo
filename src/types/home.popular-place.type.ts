import { CATEGORIES } from '@/constants/home.constants';

export type Place = {
  id: number;
  title: string;
  image: string | null;
  address: string;
  category: Category;
  isBookmarked: boolean;
};

export type Category = (typeof CATEGORIES)[number];

export type PlaceResponse = {
  place_id: number;
  title: string;
  image: string;
  address: string;
  category: Category;
  content_type: number;
  is_liked: boolean;
};
