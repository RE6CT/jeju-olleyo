import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from '@/lib/schemas/auth-schema';
import { getForgotPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { EmailFormValues } from '@/types/auth.type';
import { useForgotPassword as usePasswordResetMutation } from '@/lib/queries/auth-queries';
import useForgotPasswordStore from '@/zustand/forgot-password-store';

/**
 * 비밀번호 찾기 기능을 위한 커스텀 훅
 * React Query와 Zustand를 사용하여 폼 상태와 API 호출을 관리합니다.
 * @returns {Object} 폼 상태(isLoading, isSubmitted, error), 폼 핸들러(register, handleSubmit),
 * 비밀번호 재설정 함수(handleResetPassword), 에러 초기화 함수(resetError)
 */
const useForgotPasswordForm = () => {
  const {
    isSubmitted,
    submittedEmail,
    error,
    setIsSubmitted,
    setSubmittedEmail,
    setError,
  } = useForgotPasswordStore();

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

  // 비밀번호 재설정 요청을 위한 mutation 훅 사용
  const forgotPasswordMutation = usePasswordResetMutation();

  // 폼 제출 처리 함수
  const submitPasswordReset = async (data: EmailFormValues) => {
    // 에러 상태 초기화
    setError(null);

    try {
      // mutation 실행
      const email = await forgotPasswordMutation.mutateAsync(data);

      // 성공 시 상태 업데이트
      setSubmittedEmail(email);
      setIsSubmitted(true);

      return true;
    } catch (err) {
      // 오류 메시지 처리
      const errorMessage =
        err instanceof Error ? err.message : '알 수 없는 오류';
      const [firstMessage] = getForgotPasswordErrorMessage(errorMessage);
      // 에러 상태 업데이트
      setError(firstMessage ?? '알 수 없는 오류가 발생했습니다.');

      return false;
    }
  };

  // 외부에서 사용할 값들 반환
  return {
    isLoading: forgotPasswordMutation.isPending,
    isSubmitted,
    submittedEmail,
    error,
    register,
    errors,
    handleSubmit,
    handleResetPassword: submitPasswordReset,
    resetError: () => setError(null),
  };
};

export default useForgotPasswordForm;
