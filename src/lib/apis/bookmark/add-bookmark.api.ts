'use server';

import { createClient } from '@/lib/supabase/server';

const fetchAddBookmarkByIdQuery = async (
  bookmark_id: number,
  user_id: string,
) => {
  const supabase = await createClient();

  const { error } = await supabase.from('bookmarks').insert({
    bookmark_id,
    user_id,
  });

  if (error) throw new Error(error.message);
};

export default fetchAddBookmarkByIdQuery;
