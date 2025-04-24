'use server';

import { PATH } from '@/constants/path.constants';
import { getServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 장소에 대한 북마크 추가
 * @param place_id 장소 ID
 * @param user_id 사용자 ID
 */
const fetchAddBookmarkByIdQuery = async (place_id: number, user_id: string) => {
  const supabase = await getServerClient();

  const { error } = await supabase.from('bookmarks').insert({
    place_id,
    user_id,
  });

  if (error) throw new Error(error.message);
  //revalidatePath(PATH.PLACES);
};

export default fetchAddBookmarkByIdQuery;
