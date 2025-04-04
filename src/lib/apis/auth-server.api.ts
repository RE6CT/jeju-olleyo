'use server';

import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import { getServerClient } from '@/lib/supabase/server';
import { User, AuthError } from '@supabase/supabase-js';

/**
 * 로그인 기능을 처리하는 서버 액션
 * @param values 로그인 폼 데이터
 * @returns 사용자 정보와 에러 객체
 */
export const login = async (
  values: LoginFormValues,
): Promise<{ user: User | null; error: AuthError | null }> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  return {
    user: data?.user || null,
    error,
  };
};

/**
 * 회원가입 기능을 처리하는 서버 액션
 * @param values 회원가입 폼 데이터
 * @returns 사용자 정보와 에러 객체
 */
export const register = async (
  values: RegisterFormValues,
): Promise<{ user: User | null; error: AuthError | null }> => {
  const supabase = await getServerClient();
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

  return {
    user: data?.user || null,
    error,
  };
};

/**
 * 로그아웃 기능을 처리하는 서버 액션
 * @returns 에러 객체
 */
export const logout = async (): Promise<{ error: AuthError | null }> => {
  const supabase = await getServerClient();
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * 이메일 중복 여부를 확인하는 함수
 * @param email - 확인할 이메일 주소
 * @returns 이메일이 이미 존재하면 true, 존재하지 않으면 false
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email);

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return Boolean(data && data.length > 0);
};

/**
 * 닉네임 중복 여부를 확인하는 함수
 * @param nickname - 확인할 닉네임
 * @returns 닉네임이 이미 존재하면 true, 존재하지 않으면 false
 */
export const checkNickNameExists = async (
  nickname: string,
): Promise<boolean> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from('users')
    .select('nickname')
    .eq('nickname', nickname);

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return Boolean(data && data.length > 0);
};

/**
 * 닉네임 중복 여부를 확인하는 함수
 * @param phone - 확인할 휴대폰번호
 * @returns 닉네임이 이미 존재하면 true, 존재하지 않으면 false
 */

export const checkPhoneExists = async (phone: string): Promise<boolean> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from('users')
    .select('phone')
    .eq('phone', phone);

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return Boolean(data && data.length > 0);
};

/**
 * 비밀번호 재설정 이메일을 전송하는 서버 액션
 * @param email 사용자 이메일
 * @returns 에러 객체
 */
export const resetPassword = async (
  email: string,
): Promise<{
  error: { message: string; name: string; status: number } | null;
}> => {
  const getURL = () => {
    let url = process?.env?.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    url = url?.startsWith('http') ? url : `https://${url}`;
    url = url?.endsWith('/') ? url : `${url}/`;
    return `${url}/reset-password`;
  };

  try {
    const supabase = await getServerClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL(),
    });
    if (error) {
      return {
        error: {
          message: error.message,
          name: error.name,
          status: error.status as number,
        },
      };
    }

    return { error: null };
  } catch (err) {
    // 오류도 직렬화 가능한 형태로 변환
    return {
      error: {
        message: err instanceof Error ? err.message : '알 수 없는 오류',
        name: 'ResetPasswordError',
        status: 500,
      },
    };
  }
};

/**
 * 현재 로그인한 사용자 정보를 가져오는 서버 액션
 * @returns 사용자 정보와 에러 객체
 */
export const getCurrentUser = async (): Promise<{
  user: User | null;
  error: AuthError | null;
}> => {
  const supabase = await getServerClient();
  const { data, error } = await supabase.auth.getUser();
  return {
    user: data?.user || null,
    error,
  };
};
