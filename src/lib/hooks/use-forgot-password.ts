import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { EmailFormValues } from '@/types/auth.type';
import { fetchSendPasswordResetEmail } from '@/lib/apis/auth/auth-server.api';
import { getForgotPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import useAuthStore from '@/zustand/auth.store';
import { DEFAULT_FORM_VALUES } from '@/constants/auth.constants';

/**
 * 비밀번호 찾기 기능을 위한 커스텀 훅
 */
const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { setError, resetError, error } = useAuthStore();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: DEFAULT_FORM_VALUES.FORGOT_PASSWORD,
  });

  // 비밀번호 재설정 요청 핸들러
  const handleResetPassword = async (data: EmailFormValues) => {
    setIsLoading(true);
    resetError();

    try {
      // 서버 액션 호출
      const result = await fetchSendPasswordResetEmail(data.email);

      if (!result.success) {
        const errorMessages = getForgotPasswordErrorMessage(
          result.error?.message || '알 수 없는 오류',
        );
        setError(errorMessages[0]);
        setIsLoading(false);
        return false;
      }

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      return true;
    } catch (error) {
      console.error('예외 발생:', error);
      const errorMessages = getForgotPasswordErrorMessage(
        error instanceof Error ? error.message : '알 수 없는 오류',
      );
      setError(errorMessages[0]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSubmitted,
    submittedEmail,
    error,
    register,
    errors,
    handleSubmit,
    handleResetPassword,
  };
};

export default useForgotPassword;
