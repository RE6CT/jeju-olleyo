import { CategoryType } from './category-badge.type';
import { Place } from './search.type';

export type CommentType = {
  planCommentId: number;
  userId: string;
  nickname: string;
  content: string;
  createdAt: Date;
};

export type BookmarkedPlace = {
  place_id: number;
  title: string;
  category: CategoryType;
  image: string;
  created_at: string;
};

export type TabType = '전체보기' | number;

export type DayPlaces = {
  [key: number]: Place[];
};
