'use server';

import { getServerClient } from '@/lib/supabase/server';

const fetchGetPlacesByCategory = async (category: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('category', category);

  if (error) throw new Error(error.message);

  return data;
};

export default fetchGetPlacesByCategory;
