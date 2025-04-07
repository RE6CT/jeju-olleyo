import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthState } from '@/types/auth.type';

/**
 * 인증 상태 관리를 위한 Zustand 스토어
 * - 세션 스토리지에 사용자 정보를 유지
 * - 인증 상태, 로딩 상태, 에러 상태 관리
 */
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
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
      // 민감한 정보 필터링
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
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
