'use server';

import { createClient } from '@/lib/supabase/server';

/**
 * 장소에 대한 북마크 추가
 * @param place 장소 ID
 * @param user_id 사용자 ID
 * @param place_lat 해당 장소의 위도 (카카오맵 좌표 표시)
 * @param place_lng 해당 장소의 경도 (카카오맵 좌표 표시)
 */
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
