import { useQuery } from '@tanstack/react-query';
import { DetailIntroRaw } from '@/types/korea-tour.type';

export const useGetPlaceDetailInfo = (placeId: number, contentTypeId: number) =>
  useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: async () => {
      const res = await fetch(
        `/api/korea-tour/detail?contentId=${placeId}&contentTypeId=${contentTypeId}`,
      );
      if (!res.ok) throw new Error('상세정보 fetch 실패');
      const data = await res.json();
      return data as DetailIntroRaw;
    },
  });
