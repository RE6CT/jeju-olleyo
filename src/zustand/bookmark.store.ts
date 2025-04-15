import { BookmarkStore } from '@/types/home.popular-place.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 북마크 상태를 관리하는 Zustand 스토어
 * 로컬 스토리지에 북마크 정보를 저장하여 비로그인 상태에서도 북마크 기능 제공
 */
export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (id) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, id],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmarkId) => bookmarkId !== id),
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),
    }),
    {
      name: 'bookmark-storage',
    },
  ),
);
