'use server';

import { createClient } from '../supabase/server';
// 나중에 유저 여부 체크 필요

export async function toggleLike(planId: number, userId: string) {
  const supabase = await createClient();

  const { data: currentLike, error } = await supabase
    .from('plan_likes')
    .select('plan_like_id')
    .eq('plan_id', planId)
    .eq('user_id', userId)
    .single();

  if (error) throw new Error(error.message);

  if (currentLike) {
    const { error: deleteError } = await supabase
      .from('plan_likes')
      .delete()
      .eq('plan_like_id', currentLike.planLikeId);

    if (deleteError) throw new Error(deleteError.message);
  } else {
    const { error: addError } = await supabase.from('plan_likes').insert({
      planId,
      userId,
    });

    if (addError) throw new Error(addError.message);
  }

  const { count, error: countError } = await supabase
    .from('plan_likes')
    .select('*', { count: 'exact', head: true })
    .eq('plan_id', planId);

  if (countError) throw new Error(countError.message);

  return count;
}
