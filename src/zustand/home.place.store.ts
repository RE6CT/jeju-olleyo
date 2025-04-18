import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BookmarkStore } from '@/types/home.popular-place.type';

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
