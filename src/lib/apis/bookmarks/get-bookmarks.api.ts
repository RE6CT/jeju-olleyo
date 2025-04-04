import { camelize } from '@/lib/utils/camelize';
import { createClient } from '../../supabase/server';

const fetchGetAllBookmarks = async (userId: string) => {
  const supabase = await createClient();

  const { data, count, error } = await supabase
    .from('bookmarks')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  const camelizedData = data ? camelize(data) : null;
  return { data: camelizedData, count };
};

export default fetchGetAllBookmarks;
