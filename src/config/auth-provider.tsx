'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';
import { formatUser } from '@/lib/apis/auth/auth-browser.api';
import { AuthProps } from '@/types/auth.type';
import { PATH } from '@/constants/path.constants';
import { AUTH_ROUTES } from '@/constants/auth.constants';

/**
 * 인증 상태를 감시하고 관리하는 프로바이더 컴포넌트
 */
const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearUser, setLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 공개 페이지 여부 확인
  const isPublicPage = (path: string): boolean => {
    return (
      AUTH_ROUTES.PUBLIC_ROUTES.some((page) => path.startsWith(page)) ||
      path === PATH.HOME
    );
  };

  // 초기 인증 상태 설정
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const supabase = await getBrowserClient();

      try {
        // 초기 사용자 상태 확인
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          if (!error.message.includes('Auth session missing')) {
            console.error('사용자 정보 로드 오류:', error.message);
          }

          clearUser();

          // 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          if (!isPublicPage(pathname)) {
            router.push(
              `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(pathname)}`,
            );
          }
        } else if (data.session) {
          // 사용자 정보를 가져오기 위한 추가 호출
          const { data: userData } = await supabase.auth.getUser();

          // 사용자 정보 저장
          if (userData.user) {
            const formattedUser = formatUser(userData.user);
            setUser(formattedUser);

            // 로그인/회원가입 페이지에 있는 경우 홈으로 리다이렉트
            if (pathname === PATH.SIGNIN || pathname === PATH.SIGNUP) {
              router.push(PATH.HOME);
            }
          }
        } else if (!isPublicPage(pathname)) {
          // 사용자가 없고 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          router.push(
            `${PATH.SIGNIN}?redirectTo=${encodeURIComponent(pathname)}`,
          );
        }
      } catch (err) {
        console.error('인증 초기화 오류:', err);
        clearUser();

        if (!isPublicPage(pathname)) {
          router.push(PATH.SIGNIN);
        }
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [pathname, router, clearUser, setLoading, setUser]);

  // 인증 상태 변경 감지
  useEffect(() => {
    if (!isInitialized) return;

    const setupAuthListener = async () => {
      const supabase = await getBrowserClient();

      // 인증 상태 변경 리스너 설정
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setLoading(true);

          try {
            // INITIAL_SESSION 이벤트도 처리
            if (
              (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') &&
              session?.user
            ) {
              const formattedUser = formatUser(session.user);
              setUser(formattedUser);

              // URL 파라미터에서 리다이렉트 경로 확인
              if (typeof window !== 'undefined') {
                const params = new URLSearchParams(window.location.search);
                const redirectTo = params.get('redirectTo') || PATH.HOME;

                // 로그인 페이지나 회원가입 페이지, 콜백 페이지에서 로그인한 경우에만 리다이렉트
                const isAuthPage =
                  pathname.includes(PATH.SIGNIN) ||
                  pathname.includes(PATH.SIGNUP) ||
                  pathname.includes(PATH.CALLBACK);

                if (isAuthPage) {
                  window.location.href = redirectTo;
                }
              }
            } else if (event === 'SIGNED_OUT') {
              clearUser();
              router.push(PATH.SIGNIN);
            } else if (event === 'USER_UPDATED' && session?.user) {
              const formattedUser = formatUser(session.user);
              setUser(formattedUser);
            } else if (event === 'PASSWORD_RECOVERY') {
              router.push(PATH.RESET_PASSWORD);
            }
          } catch (err) {
            console.error('인증 상태 변경 처리 오류:', err);
          } finally {
            setLoading(false);
          }
        },
      );

      // 컴포넌트 언마운트 시 리스너 정리
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, [isInitialized, pathname, router, setUser, clearUser, setLoading]);

  return <>{children}</>;
};

export default AuthProvider;
