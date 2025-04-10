import { CamelCaseObject } from './common.type';
import { Tables } from './supabase.type';

type bookmarks = Tables<'bookmarks'>;
export type SearchCardProp = {
  bookmarks: CamelCaseObject<
    Pick<bookmarks, 'user_id' | 'place' | 'place_lat' | 'place_lng'>
  >;
  className: string | 'none';
  initialBookmarks: boolean;
  image: string;
  title: string;
};

type Plan = Tables<'plans'>;
export type PlanCardProp = {
  plan: CamelCaseObject<
    Pick<Plan, 'plan_img' | 'title' | 'description' | 'plan_id'>
  >;
  className: string | 'none';
  userId: string;
  initialLikes: number;
};

export type CategoryCardProp = {
  image: string;
  title: string;
  description: string;
  className: string | 'none';
  location: string;
  tag: string; // 추후에 컴포넌트로 분리할 가능성 있음 카페 명소 등등...
};
