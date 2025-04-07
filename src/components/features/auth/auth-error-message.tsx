'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 인증 관련 에러 메시지를 표시하는 컴포넌트
 * @param props 컴포넌트 속성
 * @param props.messages 표시할 에러 메시지 배열
 * @param props.className 추가 CSS 클래스
 * @param props.variant 알림 스타일 (default, destructive)
 */
interface AuthErrorMessageProps {
  messages: string[];
  className?: string;
  variant?: 'default' | 'destructive';
}

const AuthErrorMessage = ({
  messages,
  className = '',
  variant = 'destructive',
}: AuthErrorMessageProps) => {
  if (!messages || messages.length === 0) return null;

  // 첫 번째 메시지만 사용하고 "다시 시도해주세요" 문구 제거
  let errorMessage = messages[0].replace(/다시 시도해주세요\.?/g, '').trim();

  // 메시지가 비어있다면 표시하지 않음
  if (errorMessage.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(className)}
      >
        <Alert variant={variant} className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-sm font-medium text-red-600">
            {errorMessage}
          </AlertDescription>
        </Alert>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthErrorMessage;
