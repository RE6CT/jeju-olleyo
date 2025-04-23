import { AlertOptions } from '@/types/alert.type';
import useAlertStore from '@/zustand/alert.store';

const useAlert = () => {
  const { open, close } = useAlertStore();

  // 알림 모달을 표시합니다.
  const showAlert = (
    title: string,
    message: string,
    options?: AlertOptions,
  ) => {
    open({
      title,
      message,
      type: options?.type || 'info',
      confirmText: options?.confirmText || '확인',
      cancelText: options?.cancelText,
      onConfirm: options?.onConfirm,
      onCancel: options?.onCancel,
      autoClose: options?.autoClose || false,
      autoCloseTime: options?.autoCloseTime || 3000,
    });
  };

  // 성공 알림을 표시합니다.
  const showSuccess = (
    title: string,
    message: string,
    options?: Omit<AlertOptions, 'type'>,
  ) => {
    showAlert(title, message, { ...options, type: 'success' });
  };

  // 오류 알림을 표시합니다.
  const showError = (
    title: string,
    message: string,
    options?: Omit<AlertOptions, 'type'>,
  ) => {
    showAlert(title, message, { ...options, type: 'error' });
  };

  // 경고 알림을 표시합니다.
  const showWarning = (
    title: string,
    message: string,
    options?: Omit<AlertOptions, 'type'>,
  ) => {
    showAlert(title, message, { ...options, type: 'warning' });
  };

  // 질문 알림을 표시합니다.
  const showQuestion = (
    title: string,
    message: string,
    options?: Omit<AlertOptions, 'type'>,
  ) => {
    showAlert(title, message, {
      ...options,
      type: 'question',
      cancelText: options?.cancelText || '취소',
    });
  };

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showQuestion,
    closeAlert: close,
  };
};

export default useAlert;
