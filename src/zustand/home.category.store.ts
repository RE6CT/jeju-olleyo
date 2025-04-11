import { create } from 'zustand';
import { CategoryState } from '@/types/home.category.type';

/**
 * 카테고리 상태를 관리하는 Zustand 스토어
 */
const useCategoryStore = create<CategoryState>((set) => ({
  activeCategory: '전체',
  setActiveCategory: (category) => set({ activeCategory: category }),
}));

export default useCategoryStore;
