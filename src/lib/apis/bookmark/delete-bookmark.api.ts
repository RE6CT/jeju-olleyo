'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * 장소에 대한 북마크 추가
 * @param bookmarkId 북마크 ID
 */
const fetchDeleteBookmark = async (bookmarkId: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('bookmark_id', bookmarkId);

  if (error) throw new Error(error.message);
};

export default fetchDeleteBookmark;
