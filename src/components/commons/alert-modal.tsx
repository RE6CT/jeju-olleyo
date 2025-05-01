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

/**
 * 알림 모달 컴포넌트
 * 다양한 타입의 알림 메시지를 표시하는 반응형 모달
 * 프로젝트의 레이아웃 크기(375px, 769px, 1024px)에 맞게 최적화됨
 * @returns React 컴포넌트
 */
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
        <DialogContent className="alert-modal mx-auto flex w-[calc(100%-1.5rem)] max-w-[300px] flex-col items-center justify-center p-2 md:max-w-[380px] md:p-4 lg:max-w-[420px]">
          <DialogTitle className="sr-only">알림</DialogTitle>
          <DialogDescription className="sr-only">
            이 모달은 알림을 위한 창입니다.
          </DialogDescription>
          <Image
            src={getCharacterImage(type)}
            alt={type}
            width={100}
            height={100}
            className="mb-1 h-14 w-14 md:mb-4 md:h-20 md:w-20 lg:h-24 lg:w-24"
            priority
          />

          <p
            className={cn(
              'semibold-20 text-center text-sm md:text-base',
              getTitleClass(type),
            )}
          >
            {title}
          </p>

          <p className="medium-16 mt-1 whitespace-pre-line text-center text-xs text-gray-900 md:mt-2 md:mt-3 md:text-sm lg:text-base">
            {message}
          </p>

          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
          >
            <div
              className={cn(
                'mt-3 w-full md:mt-4',
                onCancel
                  ? 'flex flex-col justify-between gap-2 md:flex-row'
                  : 'flex justify-center',
              )}
            >
              <Button
                type="submit"
                className={cn(
                  'order-1 mt-2 h-8 w-full rounded-xl bg-primary-500 text-xs hover:bg-primary-600 md:order-1 md:mt-0 md:h-9 md:flex-1 md:text-sm',
                  type === 'error' ? 'bg-red hover:bg-red/90' : '',
                  type === 'warning' ? 'bg-orange-500 hover:bg-orange-600' : '',
                  type === 'success' ? 'bg-green-600 hover:bg-green-700' : '',
                )}
                onClick={handleConfirm}
              >
                {confirmText}
              </Button>

              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  className="order-2 h-8 w-full rounded-xl border border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50 md:order-2 md:h-9 md:flex-1 md:text-sm"
                  onClick={handleCancel}
                >
                  {cancelText}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlertModal;
