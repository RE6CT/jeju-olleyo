import { AuthError, Provider, User } from '@supabase/supabase-js';
import { getBrowserClient } from '../supabase/client';
import { SocialUserInfo } from '@/types/auth.type';

/**
 * 사용자 객체를 UserInfo 타입으로 변환하는 함수
 */
export const formatUser = (user: User | null): SocialUserInfo | null => {
  if (!user) return null;

  // 카카오 또는 구글 로그인의 경우 provider 정보 설정
  const provider = user.app_metadata?.provider || null;

  // 카카오 로그인의 경우 프로필 이미지, 닉네임 처리
  let nickname = user.user_metadata?.nickname || null;
  let avatarUrl = user.user_metadata?.avatar_url || null;

  // 카카오 프로필 정보 처리
  if (provider === 'kakao') {
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
  }

  // 구글 프로필 정보 처리
  if (provider === 'google') {
    nickname =
      user.user_metadata?.name || user.user_metadata?.full_name || nickname;

    avatarUrl =
      user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
  }

  return {
    id: user.id,
    email: user.email as string,
    nickname: nickname,
    phone: user.user_metadata?.phone || null,
    avatar_url: avatarUrl,
    provider: provider,
  };
};

/**
 * 비밀번호 재설정 이메일을 전송하는 클라이언트 액션
 * @param email 사용자 이메일
 * @returns 에러 객체
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
 * @returns 에러 객체
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
 * @returns 로그인 결과 (data, error)
 */
export const socialLogin = async (provider: SocialProvider) => {
  const supabase = await getBrowserClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        // 카카오 로그인 시 프로필 이미지와 닉네임 스코프 추가
        ...(provider === 'kakao' && {
          queryParams: {
            scope: 'profile_nickname,profile_image,account_email',
          },
        }),
        // 구글의 경우 추가 옵션 설정
        ...(provider === 'google' && {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            include_granted_scopes: 'true',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          },
        }),
      },
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
 * @returns 로그인 결과 (data, error)
 */
export const googleLogin = async () => {
  return socialLogin('google');
};

/**
 * 카카오 로그인을 처리하는 함수
 * @returns 로그인 결과 (data, error)
 */
export const kakaoLogin = async () => {
  return socialLogin('kakao');
};
