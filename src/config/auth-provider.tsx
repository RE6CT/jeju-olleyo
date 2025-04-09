'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';
import { formatUser } from '@/lib/apis/auth/auth-browser.api';
import { AuthProps } from '@/types/auth.type';

/**
 * 인증 상태를 감시하고 관리하는 프로바이더 컴포넌트
 */
const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearUser, setLoading, user } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 공개 페이지 여부 확인 함수
  const isPublicPage = (path: string): boolean => {
    const publicPages = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/reset-password',
      '/auth/callback',
    ];

    return publicPages.some((page) => path.startsWith(page));
  };

  // 초기 인증 상태 설정
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const supabase = await getBrowserClient();

      try {
        // 초기 사용자 상태 확인
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          if (!error.message.includes('Auth session missing')) {
            console.error('사용자 정보 로드 오류:', error.message);
          }

          clearUser();

          // 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          if (!isPublicPage(pathname) && pathname !== '/') {
            router.push('/sign-in');
          }
        } else if (data.user) {
          const formattedUser = formatUser(data.user);
          setUser(formattedUser);

          // 로그인/회원가입 페이지에 있는 경우 홈으로 리다이렉트
          if (pathname === '/sign-in' || pathname === '/sign-up') {
            router.push('/');
          }
        } else if (!isPublicPage(pathname) && pathname !== '/') {
          // 사용자가 없고 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          router.push('/sign-in');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('인증 초기화 오류:', err);
        }

        clearUser();

        if (!isPublicPage(pathname) && pathname !== '/') {
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [pathname, router, setUser, clearUser, setLoading]);

  // 인증 상태 변경 감지
  useEffect(() => {
    if (!isInitialized) return;

    const setupAuthListener = async () => {
      const supabase = await getBrowserClient();

      // 인증 상태 변경 리스너 설정
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('인증 상태 변경:', event);
          }

          setLoading(true);

          try {
            switch (event) {
              case 'SIGNED_IN':
                if (session?.user) {
                  const formattedUser = formatUser(session.user);
                  setUser(formattedUser);

                  // URL 파라미터에서 리다이렉트 경로 확인
                  const params = new URLSearchParams(window.location.search);
                  const redirectTo = params.get('redirectTo') || '/';

                  // 로그인 페이지나 회원가입 페이지, 콜백 페이지에서 로그인한 경우에만 리다이렉트
                  const isAuthPage =
                    pathname.includes('/sign-in') ||
                    pathname.includes('/sign-up') ||
                    pathname.includes('/auth/callback');

                  if (isAuthPage) {
                    router.push(redirectTo);
                  }
                }
                break;

              case 'SIGNED_OUT':
                clearUser();
                router.push('/sign-in');
                break;

              case 'USER_UPDATED':
                if (session?.user) {
                  const formattedUser = formatUser(session.user);
                  setUser(formattedUser);
                }
                break;

              case 'PASSWORD_RECOVERY':
                router.push('/reset-password');
                break;
            }
          } catch (err) {
            if (process.env.NODE_ENV === 'development') {
              console.error('인증 상태 변경 처리 오류:', err);
            }
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
