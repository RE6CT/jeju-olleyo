'use server';

import {
  LoginFormValues,
  RegisterFormValues,
  AuthResult,
} from '@/types/auth.type';
import { getServerClient } from '@/lib/supabase/server';
import { PATH } from '@/constants/path.constants';
import { cookies } from 'next/headers';
import { handleError } from '@/lib/utils/handleError';

/**
 * 로그인 서버 액션
 */
export const fetchLogin = async (values: LoginFormValues) => {
  const supabase = getServerClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      return handleError('로그인 처리', error);
    }

    // provider 쿠키 설정
    cookies().set('provider', 'email', {
      path: PATH.HOME,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    });

    // 중요: 사용자 정보도 함께 반환
    const userInfo = data.user
      ? {
          email: data.user.email ?? null,
          nickname: data.user.user_metadata?.nickname || null,
          phone: data.user.user_metadata?.phone || null,
          avatar_url: data.user.user_metadata?.avatar_url || null,
        }
      : null;

    return { user: userInfo, error: null };
  } catch (error: any) {
    return handleError('로그인 처리', error);
  }
};

/**
 * 회원가입 서버 액션
 */
export const fetchRegister = async (values: RegisterFormValues) => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          nickname: values.nickname,
          phone: values.phone,
          profile_img: '',
        },
      },
    });

    if (error) {
      return handleError('회원가입 처리', error);
    }

    if (!data.user) {
      return { user: null, error: null };
    }

    // 회원가입 성공 시 provider 쿠키 설정
    cookies().set('provider', 'email', {
      path: PATH.HOME,
      maxAge: 60 * 60 * 24 * 7, // 7일간 유지
      httpOnly: false, // JavaScript에서 접근 가능하도록
    });

    return { error: null };
  } catch (error: any) {
    return handleError('회원가입 처리', error);
  }
};

/**
 * 소셜 로그인 URL 생성 서버 액션
 */
export const fetchSocialLoginUrl = async (
  provider: string,
  redirectTo: string = PATH.HOME,
) => {
  const supabase = await getServerClient();
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirectTo=${encodeURIComponent(
    redirectTo,
  )}&provider=${provider}`;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      const handled = handleError('소셜 로그인 URL 생성', error);
      return { url: null, error: handled.error };
    }

    return { url: data?.url || null, error: null };
  } catch (error: any) {
    const handled = handleError('소셜 로그인 URL 생성', error);
    return { url: null, error: handled.error };
  }
};

/**
 * 로그아웃 서버 액션
 */
export const fetchLogout = async (): Promise<AuthResult> => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.signOut({ scope: 'global' });

    if (error) {
      return {
        success: false,
        error: { message: error.message, status: error.status || 500 },
      };
    }

    // 인증 관련 쿠키 삭제
    const cookiesToClear = ['provider', 'sb-access-token', 'sb-refresh-token'];
    cookiesToClear.forEach((name) => {
      cookies().delete(name);
    });

    return { success: true, error: null };
  } catch (error: any) {
    const handled = handleError('로그아웃 처리', error);
    return { success: false, error: handled.error };
  }
};

/**
 * 현재 로그인한 사용자 정보를 가져오는 서버 액션
 */
export const fetchGetCurrentUser = async () => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      const handled = handleError('사용자 정보 조회', error);
      return { user: null, error: handled.error };
    }

    // 사용자가 없는 경우 null 반환
    if (!data.user) {
      return { user: null, error: null };
    }

    // 사용자 정보 포맷팅
    const userInfo = {
      id: data.user.id,
      email: data.user.email,
      avatar_url:
        data.user.user_metadata.profile_img ||
        data.user.user_metadata.avatar_url ||
        null,
      nickname:
        data.user.user_metadata.nickname ||
        data.user.user_metadata.full_name ||
        '사용자',
      phone: data.user.user_metadata.phone || null,
    };

    return { user: userInfo, error: null };
  } catch (error: any) {
    const handled = handleError('사용자 정보 조회', error);
    return { user: null, error: handled.error };
  }
};

/**
 * 이메일 중복 여부를 확인하는 함수
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .limit(1);

    if (error) {
      console.error('이메일 중복 확인 중 오류:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('이메일 중복 확인 중 예외:', error);
    return false;
  }
};

/**
 * 닉네임 중복 여부를 확인하는 함수
 */
export const checkNickNameExists = async (
  nickname: string,
): Promise<boolean> => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase
      .from('users')
      .select('nickname')
      .eq('nickname', nickname)
      .limit(1);

    if (error) {
      console.error('닉네임 중복 확인 중 오류:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('닉네임 중복 확인 중 예외:', error);
    return false;
  }
};

/**
 * 휴대폰 번호 중복 여부를 확인하는 함수
 */
export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase
      .from('users')
      .select('phone')
      .eq('phone', phone)
      .limit(1);

    if (error) {
      console.error('휴대폰 번호 중복 확인 중 오류:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('휴대폰 번호 중복 확인 중 예외:', error);
    return false;
  }
};
