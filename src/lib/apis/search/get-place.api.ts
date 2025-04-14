'use server';

import { getServerClient } from '@/lib/supabase/server';

/**
 *
 * 모든 장소 데이터 불러오는 함수
 */
const fetchGetAllPlaces = async () => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.from('places').select('*');

  if (error) throw new Error(error.message);

  return data;
};

export default fetchGetAllPlaces;
