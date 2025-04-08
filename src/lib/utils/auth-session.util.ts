import { getBrowserClient } from '@/lib/supabase/client';
import { formatUser } from '@/lib/apis/auth-browser.api';
import { SocialUserInfo } from '@/types/auth.type';

/**
 * 현재 인증 세션이 유효한지 체크하는 유틸리티 함수
 *
 * @returns {Promise<boolean>} 세션이 유효하면 true, 그렇지 않으면 false
 */
export const isValidSession = async (): Promise<boolean> => {
  try {
    const supabase = await getBrowserClient();
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('세션 확인 중 오류:', error);
    return false;
  }
};

/**
 * 현재 로그인한 사용자 정보를 가져오는 유틸리티 함수
 *
 * @returns {Promise<SocialUserInfo | null>} 사용자 정보 또는 null
 */
export const getCurrentUser = async (): Promise<SocialUserInfo | null> => {
  try {
    const supabase = await getBrowserClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return formatUser(data.user);
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    return null;
  }
};

/**
 * 인증이 필요한 페이지에서 사용자 세션을 확인하는 유틸리티 함수
 *
 * @returns {Promise<{isAuthenticated: boolean, user: SocialUserInfo | null}>} 인증 상태와 사용자 정보
 */
export const checkAuthSession = async (): Promise<{
  isAuthenticated: boolean;
  user: SocialUserInfo | null;
}> => {
  try {
    const isSessionValid = await isValidSession();

    if (!isSessionValid) {
      return { isAuthenticated: false, user: null };
    }

    const user = await getCurrentUser();
    return { isAuthenticated: !!user, user };
  } catch (error) {
    console.error('인증 세션 확인 중 오류:', error);
    return { isAuthenticated: false, user: null };
  }
};

/**
 * 로컬 스토리지에서 저장된 이메일을 가져오는 유틸리티 함수
 *
 * @param {string} storageKey - 이메일이 저장된 스토리지 키
 * @returns {string | null} 저장된 이메일 또는 null
 */
export const getSavedEmail = (storageKey: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(storageKey);
};

/**
 * 리다이렉트 URL을 생성하는 유틸리티 함수
 *
 * @param {string} basePath - 기본 경로
 * @param {Object} params - URL 파라미터 객체
 * @returns {string} 완성된 리다이렉트 URL
 */
export const createRedirectUrl = (
  basePath: string,
  params: Record<string, string> = {},
): string => {
  const url = new URL(basePath, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

/**
 * 공개 페이지인지 확인하는 유틸리티 함수
 *
 * @param {string} path - 확인할 경로
 * @param {string[]} publicPaths - 공개 페이지 경로 목록
 * @returns {boolean} 공개 페이지이면 true, 그렇지 않으면 false
 */
export const isPublicPage = (
  path: string,
  publicPaths: string[] = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password',
    '/auth/callback',
  ],
): boolean => {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
};
