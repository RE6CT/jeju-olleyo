'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * 장소에 대한 사용자의 북마크 여부 확인
 * @param place 장소 ID
 * @param userId 사용자 ID
 *
 */
const fetchGetBookmarkByIdQuery = async (place: number, userId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('bookmark_id')
    .eq('place', place)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export default fetchGetBookmarkByIdQuery;
