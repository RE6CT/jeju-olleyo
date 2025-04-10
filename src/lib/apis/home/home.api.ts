import { getServerClient } from '@/lib/supabase/server';
import { CarouselImages } from '@/types/home.carousel.type';

/**
 * @function fetchGetImagesByMainCarousel
 * @description 메인 캐러셀에 표시할 이미지 데이터를 Supabase에서 가져옵니다.
 * 활성화된 이미지만 가져오고 표시 순서(display_order)에 따라 오름차순으로 정렬합니다.
 *
 * @async
 * @returns {Promise<CarouselImages[]>} 메인 캐러셀 이미지 데이터 배열을 담은 Promise
 */
export const fetchGetImagesByMainCarousel = async (): Promise<
  CarouselImages[]
> => {
  const supabase = getServerClient();
  const { data, error } = await supabase
    .from('main_carousel_images')
    .select('*');

  if (error) {
    console.error(
      '메인 캐러셀 이미지를 가져오는 중 오류가 발생했습니다:',
      error,
    );
    throw error;
  }

  return data as CarouselImages[];
};
