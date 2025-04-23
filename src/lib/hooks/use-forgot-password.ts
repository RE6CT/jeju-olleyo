import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { getForgotPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { EmailFormValues } from '@/types/auth.type';
import { useForgotPassword } from '@/lib/queries/auth-queries';

/**
 * 비밀번호 찾기 기능을 위한 커스텀 훅
 */
const useForgotPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  // TanStack Query 기반 훅 사용 - onSuccess, onError 콜백 추가
  const forgotPasswordMutation = useForgotPassword({
    onSuccess: (email: string) => {
      setSubmittedEmail(email);
      setIsSubmitted(true);
    },
    onError: (err: unknown) => {
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류';
      const errorMessages = getForgotPasswordErrorMessage(errorMessage);
      setError(errorMessages[0]);
    },
  });

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // 비밀번호 재설정 요청 핸들러 - 단순화
  const handleResetPassword = async (data: EmailFormValues) => {
    setError(null);

    try {
      // 단순히 뮤테이션만 실행하고 상태 변경은 콜백에 맡김
      await forgotPasswordMutation.mutateAsync(data);
      return true;
    } catch (err) {
      // 에러 처리는 onError 콜백에서 처리
      return false;
    }
  };

  return {
    isLoading: forgotPasswordMutation.isPending,
    isSubmitted, // 이 상태가 유지되어야 함
    submittedEmail,
    error,
    register,
    errors,
    handleSubmit,
    handleResetPassword,
    resetError: () => setError(null),
  };
};

export default useForgotPasswordForm;
