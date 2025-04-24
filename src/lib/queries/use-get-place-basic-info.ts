import { useQuery } from '@tanstack/react-query';
import { getBrowserClient } from '@/lib/supabase/client';
import { Place } from '@/types/place.type';

export const useGetPlaceBasicInfo = (placeId: number) =>
  useQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      const supabase = await getBrowserClient();
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('place_id', placeId)
        .single();
      if (error || !data) throw new Error('장소 정보 없음');
      return data as Place;
    },
  });
