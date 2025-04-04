'use server';

import { getServerClient } from '../supabase/server';

const getLike = async (planId: number, userId: string) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('plan_likes')
    .select('plan_like_id')
    .eq('plan_id', planId)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export default getLike;
