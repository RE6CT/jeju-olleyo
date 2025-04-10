import { PATH } from '@/constants/path.constants';
import { AuthError, Provider, User } from '@supabase/supabase-js';
import { getBrowserClient } from '../../supabase/client';
import { UserInfo } from '@/types/auth.type';
import { SOCIAL_AUTH } from '@/constants/auth.constants';

/**
 * 사용자 객체를 UserInfo 타입으로 변환하는 함수
 * @param user - Supabase User 객체
 * @returns 정형화된 사용자 정보 객체
 */
export const formatUser = (user: User | null): UserInfo | null => {
  if (!user) return null;

  const provider = user.app_metadata.provider || 'email';

  // 기본 사용자 정보
  let nickname = user.user_metadata?.nickname || null;
  let avatarUrl = user.user_metadata?.avatar_url || null;
  let phone = user.user_metadata?.phone || null;

  // 소셜 로그인 제공자별 정보 처리
  switch (provider) {
    case SOCIAL_AUTH.PROVIDERS.KAKAO:
      nickname =
        user.user_metadata?.name ||
        user.user_metadata?.kakao_name ||
        user.user_metadata?.preferred_username ||
        nickname;

      avatarUrl =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        user.user_metadata?.kakao_profile_image ||
        null;
      break;

    case SOCIAL_AUTH.PROVIDERS.GOOGLE:
      nickname =
        user.user_metadata?.name || user.user_metadata?.full_name || nickname;

      avatarUrl =
        user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
      break;
  }

  // 일관된 사용자 객체 반환
  const formattedUser = {
    email: user.email ?? null,
    nickname,
    phone,
    avatar_url: avatarUrl,
  };
  return formattedUser;
};

/**
 * 비밀번호 재설정 이메일을 전송하는 함수
 */
export const resetPassword = async (
  email: string,
): Promise<{ data: any; error: AuthError | null }> => {
  const browserClient = await getBrowserClient();

  return browserClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${PATH.RESET_PASSWORD}`,
  });
};

/**
 * 비밀번호 재설정 요청을 처리하는 함수
 */
export const updateUserPassword = async (
  password: string,
): Promise<{ error: AuthError | null }> => {
  const supabase = await getBrowserClient();
  return supabase.auth.updateUser({ password });
};

/**
 * 소셜 로그인 함수
 */
export const socialLogin = async (provider: 'google' | 'kakao') => {
  const supabase = await getBrowserClient();

  // 현재 URL에서 redirectTo 파라미터 추출
  let redirectPath = '/';
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectParam = urlParams.get('redirectTo');
    if (redirectParam) {
      redirectPath = redirectParam;
    }
  }

  // 리다이렉트 URL 생성
  const redirectUrl = `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectPath)}&provider=${provider}`;

  // 기본 옵션
  const options = {
    redirectTo: redirectUrl,
  };

  try {
    return await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });
  } catch (error: any) {
    console.error(`${provider} 로그인 중 오류 발생:`, error);
    return {
      data: null,
      error: {
        message: error.message || `${provider} 로그인 중 오류가 발생했습니다.`,
        status: error.status || 500,
      },
    };
  }
};

/**
 * 현재 세션 정보를 가져오는 함수
 */
export const getCurrentSession = async () => {
  const supabase = await getBrowserClient();

  try {
    const { data: sessionData, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    if (!sessionData.session) {
      return { session: null, user: null };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      throw userError;
    }

    const formattedUser = formatUser(userData.user);

    return {
      session: sessionData.session,
      user: formattedUser,
    };
  } catch (error) {
    console.error('세션 가져오기 오류:', error);
    return { session: null, user: null };
  }
};

/**
 * provider 정보를 쿠키에 저장하는 함수
 */
export const setProviderCookie = async (provider: string) => {
  try {
    await fetch(`/api/set-provider?provider=${provider}`, {
      method: 'GET',
      credentials: 'include',
    });
  } catch (error) {
    console.error('쿠키 설정 오류:', error);
  }
};

/**
 * 인증 관련 쿠키를 모두 삭제하는 함수
 */
export const clearAuthCookies = () => {
  if (typeof document === 'undefined') return;

  // Supabase 관련 쿠키 목록
  const cookiesToClear = [
    'provider',
    'sb-access-token',
    'sb-refresh-token',
    'supabase-auth-token',
    '__client-x-callback',
    '__supabase_session',
    'sb-bgznxwfpnvskfzsiisrn-auth-token',
  ];

  // 쿠키 삭제 (여러 도메인/경로 패턴에 대해 시도)
  cookiesToClear.forEach((cookieName) => {
    // 루트 경로
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;

    // 루트 경로, SameSite 속성 추가
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=None; Secure;`;

    // 현재 도메인
    const domain = window.location.hostname;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain};`;

    // 최상위 도메인
    if (domain.indexOf('.') !== -1) {
      const topDomain = domain.substring(domain.indexOf('.'));
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${topDomain};`;
    }
  });
};

/**
 * 로그아웃 함수
 */
export const logoutUser = async () => {
  const supabase = await getBrowserClient();

  try {
    // Supabase 로그아웃 (global scope로 모든 디바이스에서 로그아웃)
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      throw error;
    }

    // 쿠키 삭제
    clearAuthCookies();

    // 로컬 스토리지/세션 스토리지 정리
    if (typeof window !== 'undefined') {
      // Supabase 관련 로컬 스토리지 항목 삭제
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('supabase.auth.expires_at');

      // 세션 스토리지 항목 삭제
      sessionStorage.removeItem('auth-storage');

      // 기타 인증 관련 항목 삭제
      localStorage.removeItem('sb-bgznxwfpnvskfzsiisrn-auth-token');
      sessionStorage.removeItem('sb-bgznxwfpnvskfzsiisrn-auth-token');
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('로그아웃 중 오류 발생:', error);
    return {
      success: false,
      error: {
        message: error.message || '로그아웃 중 오류가 발생했습니다.',
        status: error.status || 500,
      },
    };
  }
};
