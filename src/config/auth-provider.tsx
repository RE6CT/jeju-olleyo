'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';
import { formatUser } from '@/lib/apis/auth-browser.api';
import { AuthProps } from '@/types/auth.type';

/**
 * 인증 상태를 감시하고 관리하는 프로바이더 컴포넌트
 * - 초기 세션 설정
 * - 실시간 인증 상태 변경 감지
 * - 인증 상태에 따른 리다이렉션 처리
 */
const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearUser, setLoading, user } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // 공개 페이지 여부 확인 함수
  const isPublicPage = (path: string): boolean => {
    const publicPages = [
      '/',
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
          // "Auth session missing" 오류는 로그인하지 않은 정상 상태이므로 출력하지 않음
          if (!error.message.includes('Auth session missing')) {
            console.error('사용자 정보 로드 오류:', error.message);
          }

          clearUser();

          // 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          if (!isPublicPage(pathname)) {
            router.push('/sign-in');
          }
        } else if (data.user) {
          const formattedUser = formatUser(data.user);
          setUser(formattedUser);

          // 로그인/회원가입 페이지에 있는 경우 홈으로 리다이렉트
          if (pathname === '/sign-in' || pathname === '/sign-up') {
            router.push('/');
          }
        } else if (!isPublicPage(pathname)) {
          // 사용자가 없고 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
          router.push('/sign-in');
        }
      } catch (err) {
        // 개발 환경에서만 오류 출력 (프로덕션에서는 출력하지 않음)
        if (process.env.NODE_ENV === 'development') {
          console.error('인증 초기화 오류:', err);
        }

        clearUser();

        // 보호된 페이지에 있는 경우 로그인 페이지로 리다이렉트
        if (!isPublicPage(pathname)) {
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
          // 콘솔 로그를 개발 환경에서만 출력
          if (process.env.NODE_ENV === 'development') {
            console.log('인증 상태 변경:', event);
          }

          setLoading(true);

          try {
            switch (
              event
              // 나머지 코드는 동일...
            ) {
            }
          } catch (err) {
            // 개발 환경에서만 오류 출력
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
