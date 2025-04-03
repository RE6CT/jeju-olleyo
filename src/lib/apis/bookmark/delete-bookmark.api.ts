'use server';

import { createClient } from '@/lib/supabase/server';

const fetchDeleteBookmark = async (bookmarkId: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('bookmark_id', bookmarkId);

  if (error) throw new Error(error.message);
};

export default fetchDeleteBookmark;
