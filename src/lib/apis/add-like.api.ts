'use server';

import { getServerClient } from '../supabase/server';

const addLike = async (plan_id: number, user_id: string) => {
  const supabase = await getServerClient();

  const { error } = await supabase.from('plan_likes').insert({
    plan_id,
    user_id,
  });

  if (error) throw new Error(error.message);
};

export default addLike;
