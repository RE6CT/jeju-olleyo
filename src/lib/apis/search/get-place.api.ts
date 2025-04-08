'use server';

import { getServerClient } from '@/lib/supabase/server';

const fetchGetAllPlaces = async () => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.from('places').select('*');

  if (error) throw new Error(error.message);

  return data;
};

export default fetchGetAllPlaces;
