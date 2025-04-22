'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import { Alert } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AuthErrorMessageProps } from '@/types/auth.type';

/**
 * 인증 관련 에러 메시지를 표시하는 컴포넌트
 * @param props 컴포넌트 속성
 * @param props.messages 표시할 에러 메시지 배열
 * @param props.className 추가 CSS 클래스
 * @param props.variant 알림 스타일 (default, destructive)
 */

const AuthErrorMessage = ({
  messages,
  className = '',
  variant = 'destructive',
}: AuthErrorMessageProps) => {
  if (!messages || messages.length === 0) return null;

  // 첫 번째 메시지만 사용하고 "다시 시도해주세요" 문구 제거
  const errorMessage = messages[0].replace(/다시 시도해주세요\.?/g, '').trim();

  // 메시지가 비어있다면 표시하지 않음
  if (errorMessage.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={cn('flex items-center justify-center', className)}
        aria-live="assertive"
        role="alert"
      >
        <Alert
          variant={variant}
          className="bg-red-50 rounded-12 border-red p-3"
        >
          <div className="grid grid-cols-[auto,1fr] items-center gap-2">
            <AlertCircle className="h-4 w-4 translate-y-[0px] text-red" />
            <span className="text-sm font-medium leading-none text-red">
              {errorMessage}
            </span>
          </div>
        </Alert>
      </motion.aside>
    </AnimatePresence>
  );
};

export default AuthErrorMessage;
