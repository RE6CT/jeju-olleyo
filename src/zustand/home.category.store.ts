'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CategoryState } from '@/types/home.category.type';

/**
 * 카테고리 상태 관리를 위한 Zustand 스토어
 * 로컬 스토리지를 활용하여 페이지 새로고침 후에도 선택된 카테고리를 유지합니다.
 */
const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      activeCategory: '전체', // 기본값은 '전체' 카테고리

      setActiveCategory: (category) => set({ activeCategory: category }),
    }),
    {
      name: 'travel-category-storage', // 로컬 스토리지 키 이름
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지 사용 (사용자 세션 동안만 유지)
      partialize: (state) => ({ activeCategory: state.activeCategory }), // 저장할 상태 선택
    },
  ),
);

export default useCategoryStore;
