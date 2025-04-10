'use server';

import {
  LoginFormValues,
  RegisterFormValues,
  UserInfo,
} from '@/types/auth.type';
import { getServerClient } from '@/lib/supabase/server';
import { setProviderCookie } from './auth-browser.api';
import { STORAGE_KEY } from '@/constants/auth.constants';

/**
 * 로그인 기능을 처리하는 서버 액션
 * @param values 로그인 폼 데이터
 * @returns 사용자 정보와 에러 객체
 */
export const fetchLogin = async (values: LoginFormValues) => {
  const supabase = await getServerClient();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error('서버: 로그인 실패', error.message);
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // 사용자 정보 반환
    if (!data.user) {
      return { user: null, error: null };
    }

    // 이메일 로그인 성공 시 provider 쿠키 설정
    await setProviderCookie('email');

    // 이메일 저장 처리
    if (values.remember && typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, values.email);
      localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
    } else if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
      localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
    }

    const userInfo: UserInfo = {
      email: data.user.email ?? null,
      nickname: data.user.user_metadata?.nickname || null,
      phone: data.user.user_metadata?.phone || null,
      avatar_url: data.user.user_metadata?.avatar_url || null,
    };

    return { user: userInfo, error: null };
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
 * 회원가입 기능을 처리하는 서버 액션
 * @param values 회원가입 폼 데이터
 * @returns 사용자 정보와 에러 객체
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

    const userInfo: UserInfo = {
      email: data.user.email ?? null,
      nickname: data.user.user_metadata.nickname,
      phone: data.user.user_metadata.phone,
      avatar_url: null,
    };

    return { user: userInfo, error: null };
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
 * 로그아웃 기능을 처리하는 서버 액션
 */
export const fetchLogout = async () => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.signOut({
      scope: 'global',
    });

    if (error) {
      return {
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    return { error: null };
  } catch (error: any) {
    console.error('로그아웃 처리 중 예외 발생:', error);
    return {
      error: {
        message: error.message || '로그아웃 중 오류가 발생했습니다.',
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

/**
 * 현재 로그인한 사용자 정보를 가져오는 서버 액션
 */
export const fetchGetCurrentUser = async () => {
  const supabase = await getServerClient();

  try {
    // 캐시 방지를 위한 옵션 추가
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

export const serverLogout = async () => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    return { success: !error, error };
  } catch (error) {
    console.error('서버 로그아웃 실패:', error);
    return { success: false, error };
  }
};
