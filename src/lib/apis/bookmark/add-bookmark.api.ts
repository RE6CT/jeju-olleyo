'use server';

import { createClient } from '@/lib/supabase/server';

const fetchAddBookmarkByIdQuery = async (
  place: number,
  user_id: string,
  place_lat: number,
  place_lng: number,
) => {
  const supabase = await createClient();

  const { error } = await supabase.from('bookmarks').insert({
    place,
    place_lat,
    place_lng,
    user_id,
  });

  if (error) throw new Error(error.message);
};

export default fetchAddBookmarkByIdQuery;
