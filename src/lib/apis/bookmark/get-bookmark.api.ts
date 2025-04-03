'use server';

import { createClient } from '@/lib/supabase/server';

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
