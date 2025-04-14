import { CategoryType } from './category-badge.type';

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
