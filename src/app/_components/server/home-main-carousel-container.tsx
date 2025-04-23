import MainCarousel from '@/app/_components/client/home-main-carousel';
import carouselData from '@/data/carousel-data.json';

const MainCarouselContainer = () => {
  return <MainCarousel imageList={carouselData} />;
};

export default MainCarouselContainer;
