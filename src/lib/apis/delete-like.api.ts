'use server';

import { getServerClient } from '../supabase/server';

const deleteLike = async (planLikeId: number) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('plan_likes')
    .delete()
    .eq('plan_like_id', planLikeId);

  if (error) throw new Error(error.message);
};

export default deleteLike;
