import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { PlaceModal } from '@/types/place-modal.type';

export const useGetPlans = (
  placeId: number,
  userId?: string,
): UseQueryResult<PlaceModal[] | null, Error> => {
  return useQuery<PlaceModal[] | null, Error>({
    queryKey: ['plansByPlaceId', placeId, userId],
    queryFn: async (): Promise<PlaceModal[] | null> => {
      if (!userId) return null;

      const supabase = await getBrowserClient();
      const { data, error } = await supabase.rpc('get_plans_by_place_id', {
        input_place_id: placeId,
        user_id_param: userId,
      });

      if (error) throw new Error(error.message);
      return data?.map(camelize) ?? [];
    },
  });
};
