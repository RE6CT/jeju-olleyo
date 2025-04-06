'use server';

import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { UserBookmark } from '@/types/mypage.type';

/**
 * 장소에 대한 사용자의 북마크 여부 확인
 * @param place 장소 ID
 * @param userId 사용자 ID
 */
export const fetchGetBookmarkByIdQuery = async (
  place: number,
  userId: string,
) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('bookmark_id')
    .eq('place', place)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * 사용자의 북마크 목록을 가져오는 함수
 * @param userId - 사용자 ID
 * @returns 사용자의 북마크 목록
 */
export const fetchGetAllBookmarksByUserId = async (userId: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.rpc('get_user_bookmarks', {
    user_id_param: userId,
  });

  if (error) throw new Error(error.message);

  const camelizedData = data ? camelize(data) : null;
  return camelizedData;
};
