'use server';

import { cookies } from 'next/headers';

import { PATH } from '@/constants/path.constants';
import { Provider } from '@supabase/supabase-js';
import { getServerClient } from '@/lib/supabase/server';
import { handleError } from '@/lib/utils/handleError';
import {
  LoginFormValues,
  RegisterFormValues,
  AuthResult,
} from '@/types/auth.type';

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
          id: data.user.id,
          email: data.user.email ?? null,
          nickname: data.user.user_metadata?.nickname || null,
          phone: data.user.user_metadata?.phone || null,
          avatar_url: data.user.user_metadata?.avatar_url || null,
        }
      : null;

    return { user: userInfo, error: null };
  } catch (error: unknown) {
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
  } catch (error: unknown) {
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
      provider: provider as Provider,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      const handled = handleError('소셜 로그인 URL 생성', error);
      return { url: null, error: handled.error };
    }

    return { url: data?.url || null, error: null };
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    const handled = handleError('로그아웃 처리', error);
    return { success: false, error: handled.error };
  }
};

/**
 * 현재 로그인한 사용자 정보를 가져오는 서버 액션
 * @returns 사용자 정보 또는 오류 객체
 */
export const fetchGetCurrentUser = async () => {
  try {
    // 세션 먼저 확인하여 불필요한 getUser 호출 방지
    const supabase = await getServerClient();
    const { data: sessionData } = await supabase.auth.getSession();

    // 세션이 없는 경우 즉시 null 반환 (오류로 처리하지 않음)
    if (!sessionData.session) {
      return { user: null, error: null };
    }

    // 세션이 있는 경우에만 사용자 정보 조회
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      // 세션 누락 오류인 경우 특별 처리
      if (error.message?.includes('Auth session missing')) {
        return { user: null, error: null };
      }

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
      email: data.user.email ?? null,
      avatar_url:
        data.user.user_metadata?.profile_img ||
        data.user.user_metadata?.avatar_url ||
        null,
      nickname:
        data.user.user_metadata?.nickname ||
        data.user.user_metadata?.full_name ||
        '사용자',
      phone: data.user.user_metadata?.phone || null,
    };

    return { user: userInfo, error: null };
  } catch (error: unknown) {
    // 세션 관련 오류인 경우 특별 처리
    if (
      error instanceof Error &&
      error.message?.includes('Auth session missing')
    ) {
      return { user: null, error: null };
    }

    const handled = handleError('사용자 정보 조회', error);
    return { user: null, error: handled.error };
  }
};

/**
 * 비밀번호 재설정 이메일 전송 서버 액션
 */
export const fetchSendPasswordResetEmail = async (
  email: string,
): Promise<AuthResult> => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${PATH.RESET_PASSWORD}`,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, status: error.status || 500 },
      };
    }

    return { success: true, error: null };
  } catch (error: unknown) {
    const handled = handleError('비밀번호 재설정 메일 전송', error);
    return { success: false, error: handled.error };
  }
};

/**
 * 비밀번호 업데이트 서버 액션
 */
export const fetchUpdatePassword = async (
  password: string,
): Promise<AuthResult> => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return {
        success: false,
        error: { message: error.message, status: error.status || 500 },
      };
    }

    // 비밀번호 변경 성공 시 provider 쿠키 설정
    cookies().set('provider', 'email', {
      path: PATH.HOME,
      maxAge: 60 * 60 * 24 * 7, // 7일간 유지
      httpOnly: false,
    });

    return { success: true, error: null };
  } catch (error: unknown) {
    const handled = handleError('비밀번호 업데이트', error);
    return { success: false, error: handled.error };
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
