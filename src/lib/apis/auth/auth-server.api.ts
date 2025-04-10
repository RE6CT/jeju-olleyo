'use server';

import {
  LoginFormValues,
  RegisterFormValues,
  AuthResult,
} from '@/types/auth.type';
import { getServerClient } from '@/lib/supabase/server';
import { PATH } from '@/constants/path.constants';
import { cookies } from 'next/headers';

/**
 * 로그인 서버 액션
 */
export const fetchLogin = async (values: LoginFormValues) => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // provider 쿠키 설정
    cookies().set('provider', 'email', {
      path: PATH.HOME,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: false,
    });

    return { error: null };
  } catch (error: any) {
    console.error('서버: 로그인 처리 중 예외 발생:', error);
    return {
      user: null,
      error: {
        message: error.message || '로그인 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
        },
      },
    });

    if (error) {
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    if (!data.user) {
      return { user: null, error: null };
    }

    return { error: null };
  } catch (error: any) {
    console.error('회원가입 처리 중 예외 발생:', error);
    return {
      user: null,
      error: {
        message: error.message || '회원가입 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
  const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}&provider=${provider}`;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      return {
        url: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    return { url: data?.url || null, error: null };
  } catch (error: any) {
    console.error('소셜 로그인 URL 생성 중 예외 발생:', error);
    return {
      url: null,
      error: {
        message: error.message || '소셜 로그인 준비 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('비밀번호 재설정 메일 전송 중 예외 발생:', error);
    return {
      success: false,
      error: {
        message:
          error.message || '비밀번호 재설정 메일 전송 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('비밀번호 업데이트 중 예외 발생:', error);
    return {
      success: false,
      error: {
        message: error.message || '비밀번호 업데이트 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // 인증 관련 쿠키 삭제
    const cookiesToClear = ['provider', 'sb-access-token', 'sb-refresh-token'];
    cookiesToClear.forEach((name) => {
      cookies().delete(name);
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('로그아웃 처리 중 예외 발생:', error);
    return {
      success: false,
      error: {
        message: error.message || '로그아웃 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // 사용자가 없는 경우 명시적으로 null 반환
    if (!data.user) {
      return { user: null, error: null };
    }

    // 사용자 정보 포맷팅
    const userInfo = {
      id: data.user.id,
      email: data.user.email,
      avatar_url: data.user.user_metadata.avatar_url || null,
      nickname:
        data.user.user_metadata.nickname ||
        data.user.user_metadata.full_name ||
        '사용자',
      phone: data.user.user_metadata.phone || null,
    };

    return { user: userInfo, error: null };
  } catch (error: any) {
    console.error('사용자 정보 조회 중 예외 발생:', error);
    return {
      user: null,
      error: {
        message:
          error.message || '사용자 정보를 가져오는 중 오류가 발생했습니다.',
        status: 500,
      },
    };
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
    console.error('이메일 중복 확인 중 오류:', error);
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
    console.error('닉네임 중복 확인 중 오류:', error);
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
    console.error('휴대폰 번호 중복 확인 중 오류:', error);
    return false;
  }
};
