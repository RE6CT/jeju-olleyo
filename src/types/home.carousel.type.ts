export type CarouselImages = {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
};

export type MainCarouselProps = {
  imageList: CarouselImages[] | undefined;
};
