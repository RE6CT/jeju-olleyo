import { Database } from './supabase.type';
import { CamelCaseObject } from './common.type';

type PlansRow = Database['public']['Tables']['plans']['Row'];

// PlansRow를 CamelCase로 변환한 타입
export type Schedule = CamelCaseObject<PlansRow>;

export type ScheduleCardProps = {
  schedule: Schedule;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};
