import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { AUTH_TIMEOUTS, DEFAULT_FORM_VALUES } from '@/constants/auth.constants';
import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { useResetPassword } from '@/lib/queries/auth-queries';
import useResetPasswordStore from '@/zustand/reset-password-store';

/**
 * 비밀번호 재설정 기능을 위한 커스텀 훅
 */
const useResetPasswordForm = () => {
  // Zustand 스토어 사용
  const {
    isSubmitted,
    countdown,
    error,
    setIsSubmitted,
    setCountdown,
    decrementCountdown,
    setError,
    reset,
  } = useResetPasswordStore();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 폼 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: DEFAULT_FORM_VALUES.RESET_PASSWORD,
  });

  // TanStack Query 기반 훅 사용
  const resetPasswordMutation = useResetPassword();

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

    // 초기 카운트다운 설정
    setCountdown(AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000);

    // 컴포넌트 언마운트 시 타이머 클리어 및 상태 초기화
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setError(null);
    };
  }, [setError, setCountdown]);

  // 카운트다운 타이머 효과 - 상태가 변경될 때마다 실행
  useEffect(() => {
    // isSubmitted가 true일 때만 타이머 시작
    if (isSubmitted && countdown > 0) {
      // 기존 타이머 제거
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // 새 타이머 시작
      timerRef.current = setInterval(() => {
        decrementCountdown();

        // 카운트다운이 0이 되면 타이머 종료 및 리다이렉트
        if (countdown <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          window.location.href = '/';
        }
      }, 1000);
    }

    // 컴포넌트 언마운트 또는 의존성 배열의 값이 변경될 때 타이머 정리
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isSubmitted, countdown, decrementCountdown]);

  // 비밀번호 업데이트 제출 핸들러
  const handlePasswordUpdate = useCallback(
    async (data: ResetPasswordFormValues) => {
      setError(null);

      try {
        // 뮤테이션 실행
        await resetPasswordMutation.mutateAsync(data);

        // 성공 상태 설정 - Zustand 스토어 사용
        setIsSubmitted(true);

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : '비밀번호 재설정 중 오류가 발생했습니다.';
        const errorMessages = getResetPasswordErrorMessage(errorMessage);
        setError(errorMessages[0]);
        return false;
      }
    },
    [resetPasswordMutation, setIsSubmitted, setError],
  );

  // 즉시 홈으로 리다이렉트하는 함수
  const redirectToHome = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    window.location.href = '/';
  }, []);

  return {
    isSubmitted,
    countdown,
    isLoading: resetPasswordMutation.isPending,
    error,
    register,
    errors,
    handleSubmit,
    handlePasswordUpdate,
    redirectToHome,
    resetError: () => setError(null),
  };
};

export default useResetPasswordForm;
