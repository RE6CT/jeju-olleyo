'use server';

import { PATH } from '@/constants/path.constants';
import { getServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 좋아요를 삭제하는 함수
 * @param planLikeId - 좋아요 데이터의 id
 */
const fetchDeleteLike = async (planLikeId: number) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('plan_likes')
    .delete()
    .eq('plan_like_id', planLikeId);

  if (error) throw new Error(error.message);

  revalidatePath(PATH.COMMUNITY);
};

export default fetchDeleteLike;
