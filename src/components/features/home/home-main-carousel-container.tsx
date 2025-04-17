import MainCarousel from '@/components/features/home/home-main-carousel';
import carouselData from '@/data/carousel-data.json';

const MainCarouselContainer = () => {
  return <MainCarousel imageList={carouselData} />;
};

export default MainCarouselContainer;
