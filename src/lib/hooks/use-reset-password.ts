import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { AUTH_TIMEOUTS, DEFAULT_FORM_VALUES } from '@/constants/auth.constants';
import { resetPasswordSchema } from '@/lib/schemas/auth-schema';
import { getResetPasswordErrorMessage } from '@/lib/utils/auth-error.util';
import { ResetPasswordFormValues } from '@/types/auth.type';
import { useResetPassword } from '@/lib/queries/auth-queries';

/**
 * 비밀번호 재설정 기능을 위한 커스텀 훅
 */
const useResetPasswordForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(
    AUTH_TIMEOUTS.PASSWORD_CHANGE_REDIRECT_DELAY_MS / 1000,
  );
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조 저장

  // TanStack Query 기반 훅 사용 - 콜백 추가
  const resetPasswordMutation = useResetPassword({
    onSuccess: () => {
      setIsSubmitted(true); // 성공 상태 설정
      startCountdown(); // 카운트다운 시작
    },
    onError: (err: unknown) => {
      const errorMessage =
        err instanceof Error
          ? err.message
          : '비밀번호 재설정 중 오류가 발생했습니다.';
      const errorMessages = getResetPasswordErrorMessage(errorMessage);
      setError(errorMessages[0]);
    },
  });

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

    // 컴포넌트 언마운트 시 에러 상태 초기화 및 타이머 클리어
    return () => {
      setError(null);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 카운트다운 시작 함수
  const startCountdown = useCallback(() => {
    // 기존 타이머 있으면 제거
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // 카운트다운 타이머 설정
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          // 카운트다운이 끝나면 홈으로 리다이렉트
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // 비밀번호 업데이트 제출 핸들러
  const handlePasswordUpdate = useCallback(
    async (data: ResetPasswordFormValues) => {
      setError(null);

      try {
        // 뮤테이션 실행만 하고 성공/실패 처리는 콜백에서
        await resetPasswordMutation.mutateAsync(data);
        return true;
      } catch (err) {
        // 에러 처리는 onError 콜백에서
        return false;
      }
    },
    [resetPasswordMutation],
  );

  // 즉시 홈으로 리다이렉트하는 함수
  const redirectToHome = useCallback(() => {
    // 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    // 홈으로 리다이렉트
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
