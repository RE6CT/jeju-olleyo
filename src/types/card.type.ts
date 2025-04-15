import { CamelCaseObject, List } from './common.type';
import { Tables } from './supabase.type';

type bookmarks = Tables<'bookmarks'>;
export type SearchCardProp = {
  bookmarks: CamelCaseObject<Pick<bookmarks, 'user_id' | 'place_id'>>;
  className?: string | 'none';
  initialBookmarks: boolean;
  image: string;
  title: string;
};

export type ComboBoxProp = {
  list: List;
  value: string;
  setValue: (newValue: string) => void;
  defaultMessage: string;
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

export type PlaceCardProps = {
  placeId: number;
  image: string | null;
  title: string;
  isLiked: boolean;
  className?: string;
};
