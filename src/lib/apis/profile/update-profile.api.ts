'use server';

import { getServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const fetchUpdateNickname = async (userId: string, nickname: string) => {
  try {
    const supabase = await getServerClient();

    if (!nickname) throw new Error('닉네임 데이터가 전달되지 않았습니다.');

    const { error } = await supabase
      .from('users')
      .update({ nickname: nickname })
      .eq('user_id', userId);

    if (error) throw new Error(error.message);

    revalidatePath('/account');
    return { success: true, message: '닉네임이 성공적으로 변경되었습니다.' };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || '닉네임 변경 중 오류가 발생했습니다.',
    };
  }
};
