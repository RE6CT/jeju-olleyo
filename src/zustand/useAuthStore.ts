import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { SocialUserInfo } from '@/types/auth.type';

interface AuthState {
  user: SocialUserInfo | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // 액션들
  setUser: (user: SocialUserInfo | null) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetError: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          error: null,
          isAuthenticated: !!user,
        }),
      clearUser: () =>
        set({
          user: null,
          error: null,
          isAuthenticated: false,
        }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      resetError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      // 타입 오류 해결을 위해 createJSONStorage 사용
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? sessionStorage
          : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
      ),
      partialize: (state) => ({
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              nickname: state.user.nickname,
              phone: state.user.phone,
              avatar_url: state.user.avatar_url,
              provider: state.user.provider,
            }
          : null,
      }),
    },
  ),
);

export default useAuthStore;
