import { getBrowserClient } from '@/lib/supabase/client';
import useAuthStore from '@/zustand/auth.store';
import { formatUser } from '@/lib/apis/auth-browser.api';

/**
 * 사용자 세션을 새로고침하는 유틸리티 함수
 *
 * @returns {Promise<boolean>} 세션 새로고침 성공 여부
 */
export const refreshUserSession = async (): Promise<boolean> => {
  try {
    const supabase = await getBrowserClient();

    // 세션 갱신
    const { data, error } = await supabase.auth.refreshSession();

    if (error) {
      console.error('세션 갱신 실패:', error);
      return false;
    }

    // 세션이 없으면 실패로 처리
    if (!data.session) {
      return false;
    }

    // zustand 스토어에 사용자 정보 업데이트
    const setUser = useAuthStore.getState().setUser;
    const formattedUser = formatUser(data.user);

    if (formattedUser) {
      setUser(formattedUser);
    }

    return true;
  } catch (error) {
    console.error('세션 새로고침 중 오류:', error);
    return false;
  }
};

/**
 * 로그인/회원가입 후 세션을 강제로 다시 가져오는 함수
 *
 * @returns {Promise<boolean>} 세션 가져오기 성공 여부
 */
export const forceReloadSession = async (): Promise<boolean> => {
  try {
    const supabase = await getBrowserClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error('세션 가져오기 실패:', error);
      return false;
    }

    if (!data.session) {
      return false;
    }

    // 사용자 정보 가져오기
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      console.error('사용자 정보 가져오기 실패:', userError);
      return false;
    }

    // zustand 스토어에 사용자 정보 업데이트
    const setUser = useAuthStore.getState().setUser;
    const formattedUser = formatUser(userData.user);

    if (formattedUser) {
      setUser(formattedUser);
    }

    return true;
  } catch (error) {
    console.error('세션 강제 갱신 중 오류:', error);
    return false;
  }
};

/**
 * 전체 페이지 새로고침을 수행하는 함수
 *
 * @param {string} path - 새로고침 후 이동할 경로 (기본값: 현재 경로)
 */
export const fullPageRefresh = (path?: string): void => {
  if (typeof window !== 'undefined') {
    if (path) {
      window.location.href = path;
    } else {
      window.location.reload();
    }
  }
};
