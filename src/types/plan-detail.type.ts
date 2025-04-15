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

// 장소 리스트에 고유 아이디 추가 -> 드래그 앤 드랍시 중복 장소 데이터에 대해 중복 동작 방지
export type PlaceWithUniqueId = Place & {
  uniqueId: string;
};

export type TabType = '전체보기' | number;

export type DayPlaces = {
  [key: number]: PlaceWithUniqueId[];
};
