'use server';

import { getServerClient } from '@/lib/supabase/server';

const countLike = async (planId: number) => {
  const supabase = await getServerClient();

  const { count, error } = await supabase
    .from('plan_likes')
    .select('*', { count: 'exact', head: true })
    .eq('plan_id', planId);

  if (error) throw new Error(error.message);
  return count;
};

export default countLike;
