import { ResetPasswordState } from '@/types/auth.type';
import { create } from 'zustand';

const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  isSubmitted: false,
  countdown: 5, // AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000와 동일한 값 사용
  error: null,

  setIsSubmitted: (value) => set({ isSubmitted: value }),
  setCountdown: (value) => set({ countdown: value }),
  decrementCountdown: () =>
    set((state) => ({ countdown: Math.max(0, state.countdown - 1) })),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      isSubmitted: false,
      countdown: 5,
      error: null,
    }),
}));

export default useResetPasswordStore;
