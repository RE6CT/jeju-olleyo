import { ForgotPasswordState } from '@/types/auth.type';
import { create } from 'zustand';

const useForgotPasswordStore = create<ForgotPasswordState>((set) => ({
  isSubmitted: false,
  submittedEmail: '',
  error: null,
  setIsSubmitted: (value) => set({ isSubmitted: value }),
  setSubmittedEmail: (email) => set({ submittedEmail: email }),
  setError: (error) => set({ error }),
  reset: () => set({ isSubmitted: false, submittedEmail: '', error: null }),
}));

export default useForgotPasswordStore;
