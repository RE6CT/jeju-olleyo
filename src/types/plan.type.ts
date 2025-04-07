import { Database } from './supabase.type';
import { CamelCaseObject } from './common.type';

type PlansRow = Database['public']['Tables']['plans']['Row'];

// PlansRow를 CamelCase로 변환한 타입
export type Plan = CamelCaseObject<PlansRow>;

export type PlanCardProps = {
  plan: Plan;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export type PlanFilterOptions = {
  title?: string;
  startDate?: string;
  endDate?: string;
  isPublic?: boolean;
};
