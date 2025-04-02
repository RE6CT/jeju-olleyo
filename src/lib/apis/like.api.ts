'use server';

import { createClient } from '../supabase/server';
// 나중에 유저 여부 체크 필요

export async function toggleLike(plan_id: number, user_id: string) {
  const supabase = await createClient();

  const { data: currentLike, error } = await supabase
    .from('plan_likes')
    .select('plan_like_id')
    .eq('plan_id', plan_id)
    .eq('user_id', user_id)
    .single();

  if (error) throw new Error(error.message);

  if (currentLike) {
    const { error: deleteError } = await supabase
      .from('plan_likes')
      .delete()
      .eq('plan_like_id', currentLike.plan_like_id);

    if (deleteError) throw new Error(deleteError.message);
  } else {
    const { error: addError } = await supabase.from('plan_likes').insert({
      plan_id,
      user_id,
    });

    if (addError) throw new Error(addError.message);
  }

  const { count, error: countError } = await supabase
    .from('plan_likes')
    .select('*', { count: 'exact', head: true })
    .eq('plan_id', plan_id);

  if (countError) throw new Error(countError.message);

  return count;
}
