import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { AUTH_TIMEOUTS } from '@/constants/auth.constants';
import useAuth from '@/lib/hooks/use-auth';
import useAuthStore from '@/zustand/auth.store';

/**
 * 비밀번호 재설정 기능을 위한 커스텀 훅
 *
 * @returns {Object} 비밀번호 재설정 관련 상태와 함수들
 */
const useResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(
    AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000,
  );
  const { handleUpdatePassword, isLoading } = useAuth();
  const { setError, resetError, error } = useAuthStore();

  // 폼 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // URL 해시에서 오류 정보 파싱
  useEffect(() => {
    const parseHashFragment = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          // 에러 메시지 변환 후 저장
          const errorMessages = getResetPasswordErrorMessage(
            errorDescription || error,
          );
          setError(errorMessages[0]);
        }
      }
    };

    parseHashFragment();

    // 컴포넌트 언마운트 시 에러 상태 초기화
    return () => resetError();
  }, [setError, resetError]);

  // 카운트다운 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSubmitted && countdown > 0) {
      // 카운트다운 타이머 시작
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // 카운트다운이 끝나면 window.location.href로 전체 페이지 리로드
            window.location.href = '/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [isSubmitted, countdown]);

  // 비밀번호 업데이트 제출 핸들러
  const handlePasswordUpdate = useCallback(
    async (data: ResetPasswordFormValues) => {
      resetError(); // 이전 에러 메시지 초기화

      try {
        const result = await handleUpdatePassword(data.password);

        if (result.success === false) {
          // 서버에서 반환된 실제 에러 메시지를 사용
          const errorMessages = getResetPasswordErrorMessage(
            result.errorMessage || '비밀번호 변경 중 오류가 발생했습니다.',
          );
          setError(errorMessages[0]);
          return false;
        }

        setIsSubmitted(true);
        return true;
      } catch (err) {
        // 예외 처리 (네트워크 오류 등)
        const errorMessages = getResetPasswordErrorMessage(
          err instanceof Error
            ? err.message
            : '비밀번호 재설정 중 오류가 발생했습니다.',
        );
        setError(errorMessages[0]);
        return false;
      }
    },
    [handleUpdatePassword, resetError, setError],
  );

  // 즉시 홈으로 리다이렉트하는 함수
  const redirectToHome = useCallback(() => {
    // window.location.href를 사용하여 전체 페이지 리로드
    window.location.href = '/';
  }, []);

  return {
    isSubmitted,
    countdown,
    isLoading,
    error,
    register,
    errors,
    isValid,
    handleSubmit,
    handlePasswordUpdate,
    redirectToHome,
  };
};

export default useResetPassword;
