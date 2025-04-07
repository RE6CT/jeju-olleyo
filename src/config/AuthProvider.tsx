// providers/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/useAuthStore';
import { formatUser } from '@/lib/apis/auth-browser.api';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const { setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    const setupAuthListener = async () => {
      const supabase = await getBrowserClient();

      // 초기 사용자 상태 확인
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const formattedUser = formatUser(data.user);
        setUser(formattedUser);
      }

      // 인증 상태 변경 리스너 설정
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log(event);
          setLoading(true);

          if (event === 'SIGNED_IN' && session?.user) {
            // 사용자가 로그인했을 때
            console.log('2', session.user);
            const formattedUser = formatUser(session.user);
            setUser(formattedUser);

            // URL 파라미터에서 리다이렉트 경로 확인 (있으면 해당 경로로, 없으면 대시보드로)
            const params = new URLSearchParams(window.location.search);
            const redirectTo = params.get('redirectTo') || '/dashboard';

            if (
              window.location.pathname.includes('/auth/callback') ||
              window.location.pathname.includes('/login') ||
              window.location.pathname.includes('/register')
            ) {
              router.push(redirectTo);
            }
          } else if (event === 'SIGNED_OUT') {
            // 사용자가 로그아웃했을 때
            clearUser();
            router.push('/login');
          } else if (event === 'USER_UPDATED' && session?.user) {
            // 사용자 정보가 업데이트되었을 때
            const formattedUser = formatUser(session.user);
            setUser(formattedUser);
          } else if (event === 'PASSWORD_RECOVERY' && session?.user) {
            // 비밀번호 복구 이메일 인증 후
            router.push('/reset-password');
          }

          setLoading(false);
        },
      );

      // 컴포넌트 언마운트 시 리스너 정리
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    setupAuthListener();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
