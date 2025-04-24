'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { AUTH_ROUTES } from '@/constants/auth.constants';
import { PATH } from '@/constants/path.constants';
import { useCurrentUser, USER_QUERY_KEY } from '@/lib/queries/auth-queries';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 인증 상태를 감시하고 관리하는 프로바이더 컴포넌트
 * TanStack Query 기반으로 리팩토링됨
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // 사용자 정보 쿼리 사용
  const { data: user, isLoading, isError } = useCurrentUser();

  // 공개 페이지 여부 확인
  const isPublicPage = (path: string): boolean => {
    return (
      AUTH_ROUTES.PUBLIC_ROUTES.some((page) => path.startsWith(page)) ||
      path === PATH.HOME
    );
  };

  // 인증 상태에 따른 라우팅 로직
  useEffect(() => {
    // 로딩 중에는 아무 작업도 하지 않음
    if (isLoading) return;

    // 에러가 있거나 사용자가 없는 경우 (로그인되지 않은 경우)
    if (isError || !user) {
      // 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
      if (!isPublicPage(pathname)) {
        router.push(
          `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(pathname)}`,
        );
      }
    } else {
      // 로그인되어 있고 로그인/회원가입 페이지에 있는 경우 홈으로 리다이렉트
      if (pathname === PATH.SIGNIN || pathname === PATH.SIGNUP) {
        router.push(PATH.HOME);
      }
    }
  }, [isLoading, isError, user, pathname, router]);

  // 브라우저 클라이언트측 Auth 상태 변경 감지 리스너 설정
  useEffect(() => {
    // 여기에 Supabase auth 상태 변경 리스너 설정
    const setupAuthListener = async () => {
      const { getBrowserClient } = await import('@/lib/supabase/client');
      const supabase = getBrowserClient();

      // 인증 상태 변경 리스너 설정
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (
            (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
            session?.user
          ) {
            // 사용자 정보 다시 가져오도록 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
          } else if (event === 'SIGNED_OUT') {
            // 사용자 정보 캐시 제거
            queryClient.setQueryData(USER_QUERY_KEY, null);

            // 비공개 페이지에 있는 경우 로그인 페이지로 리다이렉트
            const currentPath = window.location.pathname;
            if (!isPublicPage(currentPath)) {
              router.push(PATH.SIGNIN);
            }
          } else if (event === 'USER_UPDATED' && session?.user) {
            // 사용자 정보 다시 가져오도록 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
          } else if (event === 'PASSWORD_RECOVERY') {
            router.push(PATH.RESET_PASSWORD);
          }
        },
      );

      // 컴포넌트 언마운트 시 리스너 정리
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, [pathname, router, queryClient]);

  return <>{children}</>;
};

export default AuthProvider;
