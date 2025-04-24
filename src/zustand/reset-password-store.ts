import { ResetPasswordState } from '@/types/auth.type';
import { create } from 'zustand';
import { AUTH_TIMEOUTS } from '@/constants/auth.constants';

const COUNTDOWN_SECONDS =
  AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000;

const useResetPasswordStore = create<ResetPasswordState>((set) => ({
  isSubmitted: false,
  countdown: COUNTDOWN_SECONDS,
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
