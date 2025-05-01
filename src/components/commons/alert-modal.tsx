'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/no-close-button-dialog';
import { cn } from '@/lib/utils';
import { AlertType } from '@/types/alert.type';
import useAlertStore from '@/zustand/alert.store';

const AlertModal = () => {
  const {
    isOpen,
    title,
    message,
    type,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    autoClose,
    autoCloseTime,
    close,
  } = useAlertStore();

  // 자동 닫기 타이머 설정
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        close();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseTime, close]);

  // 타입에 따른 캐릭터 이미지 경로 결정
  const getCharacterImage = (type: AlertType): string => {
    switch (type) {
      case 'success':
        return '/character/happy_color.svg';
      case 'error':
        return '/character/sad_color.svg';
      case 'warning':
        return '/character/surprise_color.svg';
      case 'question':
        return '/character/question_color.svg';
      default:
        return '/character/sunglasses.svg';
    }
  };

  // 타입에 따른 스타일 클래스 결정
  const getTitleClass = (type: AlertType): string => {
    switch (type) {
      case 'success':
        return 'text-orange-500';
      case 'error':
        return 'text-orange-500';
      case 'warning':
        return 'text-orange-500';
      default:
        return 'text-orange-500';
    }
  };

  // 확인 버튼 클릭 핸들러
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    close();
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    if (onCancel) onCancel();
    close();
  };

  return (
    <>
      {/* CSS 선택자를 통해 이 모달의 닫기 버튼만 숨김 */}
      <style jsx global>{`
        .alert-modal [aria-label='Close'] {
          display: none !important;
        }
      `}</style>

      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="alert-modal flex flex-col items-center justify-center p-6 sm:max-w-sm">
          <DialogTitle className="sr-only">알림</DialogTitle>
          <DialogDescription className="sr-only">
            이 모달은 알림을 위한 창입니다.
          </DialogDescription>
          <Image
            src={getCharacterImage(type)}
            alt={type}
            width={100}
            height={100}
            className="mb-4"
            priority
          />

          <p className={cn('semibold-20 text-center', getTitleClass(type))}>
            {title}
          </p>

          <p className="medium-16 mt-3 whitespace-pre-line text-center text-gray-900">
            {message}
          </p>

          <div
            className={cn(
              'mt-6 w-full',
              onCancel ? 'flex justify-between gap-4' : 'flex justify-center',
            )}
          >
            {onCancel && (
              <Button
                variant="outline"
                className="flex-1 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
            )}
            <Button
              className={cn(
                'flex-1 rounded-xl bg-primary-500 hover:bg-primary-600',
                type === 'error' ? 'bg-red hover:bg-red/90' : '',
                type === 'warning' ? 'bg-orange-500 hover:bg-orange-600' : '',
                type === 'success' ? 'bg-green-600 hover:bg-green-700' : '',
              )}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlertModal;
