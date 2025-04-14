import MainCarousel from './home-main-carousel';
import fetchGetImagesByMainCarousel from '@/lib/apis/home/home.api';

const MainCarouselContainer = async () => {
  const data = await fetchGetImagesByMainCarousel();

  return <MainCarousel imageList={data} />;
};

export default MainCarouselContainer;
