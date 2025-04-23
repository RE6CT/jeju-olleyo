import { PlanState } from '@/types/plan.type';
import { create } from 'zustand';

export const usePlanStore = create<PlanState>((set) => ({
  title: '',
  description: '',
  planImg: '',
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setPlanImg: (planImg) => set({ planImg }),
}));
