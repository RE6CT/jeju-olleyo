'use server';

import { createClient } from '../supabase/server';

const fetchAddBookmarkByIdQuery = async (place: number, user_id: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from('bookmarks').insert({
    place,
    user_id,
  });

  if (error) throw new Error(error.message);
};

export default fetchAddBookmarkByIdQuery;
