// 알림 유형 정의
export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

// 알림 상태 타입 정의
export type AlertState = {
  isOpen: boolean;
  title: string;
  message: string;
  type: AlertType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
};

// 알림 스토어 타입 정의
export type AlertStore = AlertState & {
  open: (params: Omit<AlertState, 'isOpen'>) => void;
  close: () => void;
};

// 알림 훅 옵션 타입 정의
export type AlertOptions = Omit<AlertState, 'isOpen' | 'title' | 'message'>;
