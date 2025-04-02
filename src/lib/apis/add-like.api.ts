'use server';

import { createClient } from '../supabase/server';

const addLike = async (planId: number, userId: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from('plan_likes').insert({
    planId,
    userId,
  });

  if (error) throw new Error(error.message);
};

export default addLike;
