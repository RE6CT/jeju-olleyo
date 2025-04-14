import { STORAGE_KEY, SOCIAL_AUTH } from '@/constants/auth.constants';
import { User } from '@supabase/supabase-js';
import { AuthResult, UserInfo } from '@/types/auth.type';
import { getBrowserClient } from '../../supabase/client';
import { handleError } from '@/lib/utils/handleError';
import { PATH } from '@/constants/path.constants';

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
  let avatarUrl =
    user.user_metadata?.profile_img || user.user_metadata?.avatar_url || null;
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
  return {
    id: user.id,
    email: user.email ?? null,
    nickname,
    phone,
    avatar_url: avatarUrl,
  };
};

/**
 * 비밀번호 재설정 이메일 전송 서버 액션
 */
export const fetchSendPasswordResetEmail = async (
  email: string,
): Promise<AuthResult> => {
  const supabase = getBrowserClient();

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
  } catch (error: any) {
    // handleError를 호출한 결과의 error 속성을 AuthResult에 맞게 래핑하여 반환합니다.
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
  const supabase = getBrowserClient();

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return {
        success: false,
        error: { message: error.message, status: error.status || 500 },
      };
    }

    // 비밀번호 변경 성공 시 provider 쿠키 설정
    if (typeof window !== 'undefined') {
      document.cookie = 'provider=email; max-age=604800; path=/;'; // 7일간 유지
    }

    return { success: true, error: null };
  } catch (error: any) {
    const handled = handleError('비밀번호 업데이트', error);
    return { success: false, error: handled.error };
  }
};

/**
 * 로컬 스토리지에 이메일 저장/삭제 함수
 * @param email - 저장할 이메일 주소
 * @param remember - 사용자가 "내 이메일 기억하기"를 선택했는지 여부
 */
export const saveEmailToStorage = (email: string, remember: boolean) => {
  if (typeof window === 'undefined') return;

  try {
    if (remember) {
      localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, email);
      localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
      localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
    }
  } catch (error) {
    handleError('이메일 저장 또는 삭제', error);
  }
};

/**
 * 로컬 스토리지에서 저장된 이메일 가져오기
 * @returns 저장된 이메일 주소 또는 null
 */
export const getSavedEmailFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    const shouldRemember =
      localStorage.getItem(STORAGE_KEY.REMEMBER_EMAIL) === 'true';
    if (!shouldRemember) return null;

    return localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
  } catch (error) {
    handleError('이메일 불러오기', error);
    return null;
  }
};

/**
 * 현재 세션 정보를 가져오는 함수 (클라이언트)
 * @returns { session, user, error } 형식의 객체 반환
 */
export const getCurrentSession = async () => {
  const supabase = await getBrowserClient();

  try {
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (error) throw error;

    if (!sessionData.session) {
      return { session: null, user: null };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    const formattedUser = formatUser(userData.user);

    return {
      session: sessionData.session,
      user: formattedUser,
    };
  } catch (error) {
    const { error: formattedError } = handleError('세션 정보 불러오기', error);
    return { session: null, user: null, error: formattedError };
  }
};

/**
 * 인증 관련 쿠키 및 스토리지 데이터 정리
 */
export const clearClientAuthData = () => {
  if (typeof window === 'undefined') return;

  try {
    // 쿠키 정리
    const cookiesToClear = [
      'provider',
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
    ];

    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

    // 로컬/세션 스토리지 정리
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('auth-storage');
  } catch (error) {
    handleError('클라이언트 인증 데이터 정리', error);
  }
};
