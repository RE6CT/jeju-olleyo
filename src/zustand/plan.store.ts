import { create } from 'zustand';
import { PlanState, ScheduleModalStore } from '@/types/plan.type';

export const usePlanStore = create<PlanState>((set) => ({
  // 여행 기간
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  // 계획 기본 정보
  title: '',
  description: '',
  planImg: null,
  isReadOnly: false,
  planId: 0,
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPlanImg: (planImg) => set({ planImg }),
  setIsReadOnly: (isReadOnly) => set({ isReadOnly }),
  setPlanId: (planId) => set({ planId }),

  // 일정 관련 정보 초기값
  dayPlaces: {},
  activeTab: '전체보기',
  setActiveTab: (activeTab) => set({ activeTab }),
  setDayPlaces: (dayPlaces) => set({ dayPlaces }),

  // 경로 요약 정보
  routeSummary: {},
  setRouteSummary: (routeSummary) => set({ routeSummary }),
}));

// Selectors
export const usePlanTitle = () => usePlanStore((state) => state.title);
export const usePlanDescription = () =>
  usePlanStore((state) => state.description);
export const usePlanImg = () => usePlanStore((state) => state.planImg);
export const usePlanIsReadOnly = () =>
  usePlanStore((state) => state.isReadOnly);
export const usePlanId = () => usePlanStore((state) => state.planId);
export const usePlanStartDate = () => usePlanStore((state) => state.startDate);
export const usePlanEndDate = () => usePlanStore((state) => state.endDate);
export const usePlanDayPlaces = () => usePlanStore((state) => state.dayPlaces);
export const usePlanActiveTab = () => usePlanStore((state) => state.activeTab);

// Setter functions
export const usePlanSetTitle = () => usePlanStore((state) => state.setTitle);
export const usePlanSetDescription = () =>
  usePlanStore((state) => state.setDescription);
export const usePlanSetImg = () => usePlanStore((state) => state.setPlanImg);
export const usePlanSetIsReadOnly = () =>
  usePlanStore((state) => state.setIsReadOnly);
export const usePlanSetId = () => usePlanStore((state) => state.setPlanId);
export const usePlanSetStartDate = () =>
  usePlanStore((state) => state.setStartDate);
export const usePlanSetEndDate = () =>
  usePlanStore((state) => state.setEndDate);
export const usePlanSetDayPlaces = () =>
  usePlanStore((state) => state.setDayPlaces);
export const usePlanSetActiveTab = () =>
  usePlanStore((state) => state.setActiveTab);

export const usePlanRouteSummary = () => {
  const routeSummary = usePlanStore((state) => state.routeSummary);
  const setRouteSummary = usePlanStore((state) => state.setRouteSummary);
  return { routeSummary, setRouteSummary };
};

export const useScheduleModalStore = create<ScheduleModalStore>((set) => ({
  isDeleteModalOpen: false,
  isSaveModalOpen: false,
  isPublicModalOpen: false,
  dayToDelete: null,
  setIsDeleteModalOpen: (isOpen) => set({ isDeleteModalOpen: isOpen }),
  setIsSaveModalOpen: (isOpen) => set({ isSaveModalOpen: isOpen }),
  setIsPublicModalOpen: (isOpen) => set({ isPublicModalOpen: isOpen }),
  setDayToDelete: (day) => set({ dayToDelete: day }),
}));
