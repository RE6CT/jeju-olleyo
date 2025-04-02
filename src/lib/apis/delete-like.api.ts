'use server';

import { createClient } from '../supabase/server';

const deleteLike = async (planLikeId: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from('plan_likes')
    .delete()
    .eq('plan_like_id', planLikeId);

  if (error) throw new Error(error.message);
};

export default deleteLike;
