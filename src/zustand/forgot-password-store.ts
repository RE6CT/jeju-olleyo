import { ForgotPasswordState } from '@/types/auth.type';
import { create } from 'zustand';

const initialState = {
  isSubmitted: false,
  submittedEmail: '',
  error: null,
};

const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  ...initialState,
  setIsSubmitted: (value) => set({ isSubmitted: value }),
  setSubmittedEmail: (email) => set({ submittedEmail: email }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));

export default useForgotPasswordStore;
