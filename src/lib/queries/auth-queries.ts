'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchGetCurrentUser,
  fetchSendPasswordResetEmail,
  fetchUpdatePassword,
  fetchSocialLoginUrl,
} from '@/lib/apis/auth/auth-server.api';
import {
  saveEmailToStorage,
  clearClientAuthData,
} from '@/lib/apis/auth/auth-browser.api';
import { PATH } from '@/constants/path.constants';
import {
  LoginFormValues,
  RegisterFormValues,
  EmailFormValues,
  ResetPasswordFormValues,
} from '@/types/auth.type';

// 사용자 정보 쿼리 키
export const USER_QUERY_KEY = ['user'];

/**
 * 현재 로그인한 사용자 정보를 가져오는 쿼리 훅
 */
export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const { user, error } = await fetchGetCurrentUser();
      if (error) {
        throw new Error(error.message);
      }
      return user;
    },
    // 중요: 인증 상태가 자주 변경되지 않도록 설정
    staleTime: Infinity, // 명시적으로 무효화하기 전까지 다시 가져오지 않음
    gcTime: 1000 * 60 * 60, // 캐시 유지 시간 (1시간)
    refetchOnMount: false, // 컴포넌트 마운트 시 다시 가져오지 않음
    refetchOnWindowFocus: false, // 창 포커스 시 다시 가져오지 않음
    retry: false,
    ...options,
  });
};

/**
 * 로그인 Mutation 훅
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const result = await fetchLogin(values);
      if (result.error) {
        throw new Error(result.error.message);
      }
      if (!result.user) {
        throw new Error('유저 정보가 없습니다.');
      }
      // 이메일 저장 처리
      saveEmailToStorage(values.email, values.remember);
      return result.user;
    },
    onSuccess: (user) => {
      // 사용자 정보 캐시 업데이트
      queryClient.setQueryData<typeof user>(USER_QUERY_KEY, user);

      // 리다이렉션 처리
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get('redirectTo') || PATH.HOME;
        router.push(redirectTo);
      }
    },
  });
};

/**
 * 회원가입 Mutation 훅
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterFormValues) => {
      const { error } = await fetchRegister(values);
      if (error) {
        throw new Error(error.message);
      }
      return true;
    },
    onSuccess: () => {
      // 사용자 정보 다시 가져오도록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });

      // 홈으로 리다이렉트
      router.push(PATH.HOME);
    },
  });
};

/**
 * 로그아웃 Mutation 훅
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { success, error } = await fetchLogout();
      if (!success && error) {
        throw new Error(error.message);
      }
      return success;
    },
    onSuccess: () => {
      // 클라이언트 측 데이터 정리
      clearClientAuthData();

      // 캐시에서 사용자 정보 제거
      queryClient.setQueryData(USER_QUERY_KEY, null);

      // 로그인 페이지로 리다이렉트
      router.push(`${PATH.SIGNIN}?t=logout`);
    },
  });
};

/**
 * 비밀번호 재설정 메일 전송 Mutation 훅
 */
export const useForgotPassword = (options = {}) => {
  return useMutation({
    mutationFn: async (values: EmailFormValues) => {
      const { success, error } = await fetchSendPasswordResetEmail(
        values.email,
      );
      if (!success && error) {
        throw new Error(error.message);
      }
      return values.email;
    },
    ...options,
  });
};

/**
 * 비밀번호 업데이트 Mutation 훅
 */
export const useResetPassword = (options = {}) => {
  return useMutation({
    mutationFn: async (data: ResetPasswordFormValues) => {
      const { success, error } = await fetchUpdatePassword(data.password);
      if (!success && error) {
        throw new Error(error.message);
      }
      return success;
    },
    ...options,
  });
};

/**
 * 소셜 로그인 URL 가져오기 Mutation 훅
 */
export const useSocialLoginUrl = () => {
  return useMutation({
    mutationFn: async ({
      provider,
      redirectTo,
    }: {
      provider: string;
      redirectTo: string;
    }) => {
      const { url, error } = await fetchSocialLoginUrl(provider, redirectTo);
      if (error) {
        throw new Error(error.message);
      }
      return url;
    },
    onSuccess: (url) => {
      if (url) {
        window.location.href = url;
      }
    },
  });
};
