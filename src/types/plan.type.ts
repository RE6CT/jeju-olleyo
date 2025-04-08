import { Database } from './supabase.type';
import { CamelCaseObject } from './common.type';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';

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

// https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-keyof-typeof-%EC%82%AC%EC%9A%A9%EB%B2%95
export type FilterType =
  | (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES]
  | null;

export type PublicOption = (typeof PUBLIC_OPTIONS)[keyof typeof PUBLIC_OPTIONS];

export type FilterState = {
  type: FilterType;
  value: string;
};

export type FilterMenuProps = {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filter: FilterState;
  setInputValue: (value: string) => void;
};

export type FilterInputProps = {
  selectedFilter: FilterType;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedPublicOption: PublicOption;
  setSelectedPublicOption: (option: PublicOption) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  isDatePickerFocused: boolean;
  setIsDatePickerFocused: (focused: boolean) => void;
  filter: FilterState;
  applyFilter: () => void;
};
