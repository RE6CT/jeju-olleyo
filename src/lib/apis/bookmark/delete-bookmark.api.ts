'use server';

import { getServerClient } from '@/lib/supabase/server';

/**
 * 북마크 삭제 함수
 * @param bookmarkId 북마크 ID
 */
const fetchDeleteBookmark = async (bookmarkId: number) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('bookmark_id', bookmarkId);

  if (error) throw new Error(error.message);
};

export default fetchDeleteBookmark;
