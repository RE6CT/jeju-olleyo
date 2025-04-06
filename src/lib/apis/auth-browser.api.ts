import { AuthError } from '@supabase/supabase-js';
import { getBrowserClient } from '../supabase/client';

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

export const updataUserPassword = async (
  password: string,
): Promise<{ error: AuthError | null }> => {
  const supabase = await getBrowserClient();
  const { error } = await supabase.auth.updateUser({
    password,
  });
  return { error };
};
