export type CarouselImages = {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
  mobile_image_url: string;
};

export type MainCarouselProps = {
  imageList: CarouselImages[] | undefined;
};

// 서버 컴포넌트에서 초기 상태를 전달받기 위한 확장 타입
export type EnhancedMainCarouselProps = MainCarouselProps & {
  initialIsMobile: boolean;
  initialViewportWidth?: number;
};

export type NavigationButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
};

export type ProgressIndicatorProps = {
  current: number;
  total: number;
  progress: number;
};
