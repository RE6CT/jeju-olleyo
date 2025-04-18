'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * 에러 메시지를 표시하는 컴포넌트
 * @param title - 에러 메시지의 제목
 * @param description - 에러 메시지의 상세 설명
 *
 * @example
 * ```tsx
 * <ErrorMessage title="에러 메시지" description="에러 메시지 상세 설명" />
 * ```
 */
const ErrorMessage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="container mx-auto py-8">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
