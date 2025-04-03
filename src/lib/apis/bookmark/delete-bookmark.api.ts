'use server';

import { createClient } from '@/lib/supabase/server';

const fetchDeleteBookmark = async (bookmark_id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('bookmark_id', bookmark_id);

  if (error) throw new Error(error.message);
};

export default fetchDeleteBookmark;
