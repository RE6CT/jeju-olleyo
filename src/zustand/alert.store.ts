import { create } from 'zustand';

import { AlertState, AlertStore } from '@/types/alert.type';

// 기본 상태
const initialState: AlertState = {
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  confirmText: '확인',
  cancelText: '취소',
  autoClose: false,
  autoCloseTime: 3000,
};

// 알림 스토어 생성
const useAlertStore = create<AlertStore>((set) => ({
  ...initialState,

  // 알림 열기
  open: (params: Omit<AlertState, 'isOpen'>) => {
    set({ isOpen: true, ...params });
  },

  // 알림 닫기
  close: () => {
    set({ isOpen: false });
  },
}));

export default useAlertStore;
