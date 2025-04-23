import { create } from 'zustand';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { PlanState } from '@/types/plan.type';

export const usePlanStore = create<PlanState>((set) => ({
  // 여행 기간
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  // 계획 기본 정보
  title: '',
  description: '',
  planImg: '',
  isReadOnly: false,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPlanImg: (planImg) => set({ planImg }),
  setIsReadOnly: (isReadOnly) => set({ isReadOnly }),

  // 일정 관련 정보 초기값
  dayPlaces: {},
  activeTab: '전체보기',
  setActiveTab: (activeTab) => set({ activeTab }),
  setDayPlaces: (dayPlaces) => set({ dayPlaces }),
}));
