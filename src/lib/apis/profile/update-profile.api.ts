'use server';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants/mypage.constants';
import { PATH } from '@/constants/path.constants';
import { ERROR_CODES } from '@/constants/supabase.constant';
import { getServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 유저의 닉네임을 업데이트하는 서버 액션 함수
 * @param userId - 유저의 uuid
 * @param nickname - 새 닉네임
 */
export const fetchUpdateNickname = async (userId: string, nickname: string) => {
  try {
    const supabase = await getServerClient();

    if (!nickname) throw new Error(ERROR_MESSAGES.NICKNAME_DATA_MISSING);

    const { error } = await supabase
      .from('users')
      .update({ nickname })
      .eq('user_id', userId);

    if (error) {
      if (error.code === ERROR_CODES.UNIQUE_VIOLATION) {
        throw new Error(ERROR_MESSAGES.NICKNAME_DUPLICATE);
      } else {
        throw new Error(error.message);
      }
    }

    revalidatePath(PATH.ACCOUNT);
    return { success: true, message: SUCCESS_MESSAGES.NICKNAME_UPDATED };
  } catch (error: unknown) {
    // 에러 메시지 없을 경우의 디폴트 메시지
    let errorMessage = ERROR_MESSAGES.NICKNAME_UPDATE_FAILED;

    // 에러 객체라면 해당 에러 메시지를 적용
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
