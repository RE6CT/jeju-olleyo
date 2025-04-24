import { useQuery } from '@tanstack/react-query';
import { getBrowserClient } from '@/lib/supabase/client';

export const useGetBookmarkCheck = (placeId: number, userId: string) =>
  useQuery({
    queryKey: ['bookmark', userId, placeId],
    queryFn: async () => {
      const supabase = await getBrowserClient();
      const { data } = await supabase
        .from('bookmarks')
        .select('place_id')
        .eq('place_id', placeId)
        .eq('user_id', userId)
        .maybeSingle();
      return !!data;
    },
  });
