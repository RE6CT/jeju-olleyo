import { AuthError, Provider, User } from '@supabase/supabase-js';
import { getBrowserClient } from '../supabase/client';
import { SocialUserInfo } from '@/types/auth.type';

/**
 * 사용자 객체를 UserInfo 타입으로 변환하는 함수
 * @param user - Supabase User 객체
 * @returns 정형화된 사용자 정보 객체
 */
export const formatUser = (user: User | null): SocialUserInfo | null => {
  if (!user) return null;

  const provider = user.app_metadata.provider;

  // 기본 사용자 정보
  let nickname = user.user_metadata?.nickname || null;
  let avatarUrl = user.user_metadata?.avatar_url || null;
  let phone = user.user_metadata?.phone || null;

  // 소셜 로그인 제공자별 정보 처리
  switch (provider) {
    case 'kakao':
      // 카카오 사용자 메타데이터에서 정보 추출
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

    case 'google':
      // 구글 사용자 메타데이터에서 정보 추출
      nickname =
        user.user_metadata?.name || user.user_metadata?.full_name || nickname;

      avatarUrl =
        user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
      break;

    // 다른 소셜 로그인 제공자 추가 가능
  }

  // 모든 출처에서 일관된 사용자 객체 형식 반환
  return {
    id: user.id,
    email: user.email as string,
    nickname: nickname,
    phone: phone,
    avatar_url: avatarUrl,
    provider: provider || 'email',
  };
};

/**
 * 비밀번호 재설정 이메일을 전송하는 클라이언트 액션
 * @param email 사용자 이메일
 * @returns 결과 객체
 */
export const resetPassword = async (
  email: string,
): Promise<{ data: any; error: AuthError | null }> => {
  const browserClient = await getBrowserClient();

  const { data, error } = await browserClient.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${process?.env?.NEXT_PUBLIC_SITE_URL}/reset-password`,
    },
  );

  return { data, error };
};

/**
 * 비밀번호 재설정 요청을 처리하는 클라이언트 액션
 * @param password 새 비밀번호
 * @returns 결과 객체
 */
export const updateUserPassword = async (
  password: string,
): Promise<{ error: AuthError | null }> => {
  const supabase = await getBrowserClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });
  return { error };
};

/**
 * 소셜 로그인 제공자 타입
 */
export type SocialProvider = 'google' | 'kakao';

/**
 * 소셜 로그인을 처리하는 함수
 * @param provider - 소셜 로그인 제공자 (google, kakao)
 * @returns 로그인 결과
 */
export const socialLogin = async (provider: SocialProvider) => {
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

  // 현재 도메인 기반 리다이렉트 URL 생성
  const redirectUrl = `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectPath)}&provider=${provider}`;

  // 기본 옵션
  const baseOptions = {
    redirectTo: redirectUrl,
  };

  // 제공자별 추가 옵션
  const providerOptions = {
    kakao: {
      queryParams: {
        scope: 'profile_nickname,profile_image,account_email',
      },
    },
    google: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        include_granted_scopes: 'true',
        scope:
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      },
    },
  };

  try {
    const options = {
      ...baseOptions,
      ...(provider === 'kakao' ? providerOptions.kakao : {}),
      ...(provider === 'google' ? providerOptions.google : {}),
    };

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options,
    });

    if (error) {
      throw error;
    }

    return { data, error: null };
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
 * 구글 로그인을 처리하는 함수
 * @returns 로그인 결과
 */
export const googleLogin = async () => {
  return socialLogin('google');
};

/**
 * 카카오 로그인을 처리하는 함수
 * @returns 로그인 결과
 */
export const kakaoLogin = async () => {
  return socialLogin('kakao');
};

/**
 * 현재 세션 정보를 가져오는 함수
 * @returns 세션과 사용자 정보
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
 * 사용자 정보 업데이트 함수
 * @param userData - 업데이트할 사용자 정보
 * @returns 업데이트 결과
 */
export const updateUserProfile = async (userData: {
  nickname?: string;
  avatar_url?: string;
  phone?: string;
}) => {
  const supabase = await getBrowserClient();

  try {
    const { data, error } = await supabase.auth.updateUser({
      data: userData,
    });

    if (error) {
      throw error;
    }

    return {
      user: formatUser(data.user),
      error: null,
    };
  } catch (error: any) {
    console.error('프로필 업데이트 오류:', error);
    return {
      user: null,
      error: {
        message:
          error.message || '사용자 정보 업데이트 중 오류가 발생했습니다.',
        status: error.status || 500,
      },
    };
  }
};
