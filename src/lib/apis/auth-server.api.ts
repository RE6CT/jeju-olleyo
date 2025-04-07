'use server';

import { LoginFormValues, RegisterFormValues } from '@/types/auth.type';
import { getServerClient } from '@/lib/supabase/server';

/**
 * 로그인 기능을 처리하는 서버 액션
 * @param values 로그인 폼 데이터
 * @returns 직렬화 가능한 사용자 정보와 에러 객체
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
      // 오류 객체를 직렬화 가능한 형태로 변환
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // 사용자 객체에서 필요한 정보만 추출하여 반환
    return {
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email,
            nickname: data.user.user_metadata?.nickname || '사용자',
            phone: data.user.user_metadata?.phone || null,
            avatar_url: data.user.user_metadata?.avatar_url || null,
            provider: data.user.app_metadata?.provider || 'email',
          }
        : null,
      error: null,
    };
  } catch (error: any) {
    console.error('서버: 로그인 처리 중 예외 발생:', error);

    // 예외를 직렬화 가능한 형태로 변환
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
 * @returns 직렬화 가능한 사용자 정보와 에러 객체
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
      // 오류 객체를 직렬화 가능한 형태로 변환
      return {
        user: null,
        error: {
          message: error.message,
          status: error.status || 500,
        },
      };
    }

    // 사용자 객체에서 필요한 정보만 추출하여 반환
    return {
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email,
            nickname: data.user.user_metadata.nickname,
            phone: data.user.user_metadata.phone,
            avatar_url: null,
            provider: 'email', // 회원가입은 항상 이메일 방식
          }
        : null,
      error: null,
    };
  } catch (error: any) {
    console.error('회원가입 처리 중 예외 발생:', error);

    // 예외를 직렬화 가능한 형태로 변환
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
 * @returns 직렬화 가능한 에러 객체
 */
export const fetchLogout = async () => {
  const supabase = await getServerClient();

  try {
    const { error } = await supabase.auth.signOut({
      scope: 'global', // 모든 디바이스에서 로그아웃
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
 * @param email - 확인할 이메일 주소
 * @returns 이메일이 이미 존재하면 true, 존재하지 않으면 false
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const supabase = await getServerClient();

  try {
    // 데이터베이스의 users 테이블에서 이메일로 조회
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .limit(1);

    if (error) {
      console.error('이메일 중복 확인 중 오류:', error);
      return false;
    }

    // 사용자가 존재하는지 확인
    return data && data.length > 0;
  } catch (error) {
    console.error('이메일 중복 확인 중 오류:', error);
    return false; // 오류 발생 시 기본적으로 중복 없음으로 처리
  }
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
    return false; // 오류 발생 시 기본적으로 중복 없음으로 처리
  }
};

/**
 * 휴대폰 번호 중복 여부를 확인하는 함수
 * @param phone - 확인할 휴대폰번호
 * @returns 휴대폰 번호가 이미 존재하면 true, 존재하지 않으면 false
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
    return false; // 오류 발생 시 기본적으로 중복 없음으로 처리
  }
};

/**
 * 현재 로그인한 사용자 정보를 가져오는 서버 액션
 * @returns 직렬화 가능한 사용자 정보와 에러 객체
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

    // 사용자가 존재하지 않는 경우
    if (!data.user) {
      return { user: null, error: null };
    }

    // 사용자 정보 형식화
    const userInfo = {
      id: data.user.id,
      email: data.user.email,
      avatar_url:
        data.user.user_metadata.avatar_url || '/images/default-profile.png',
      nickname:
        data.user.user_metadata.nickname ||
        data.user.user_metadata.full_name ||
        '사용자',
      phone: data.user.user_metadata.phone || '미등록',
      provider: data.user.app_metadata?.provider || 'email',
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
