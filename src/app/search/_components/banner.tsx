'use client';

import { useMemo } from 'react';

const bannerImages = [
  '/line-banner-images/farm_ad.png',
  '/line-banner-images/resort_ad.png',
];

const Banner = () => {
  const randomImage = useMemo(() => {
    const index = Math.floor(Math.random() * bannerImages.length);
    return bannerImages[index];
  }, []);

  return (
    <img
      src={randomImage}
      alt="랜덤 배너"
      className="h-[61px] w-full object-cover object-left md:h-[84px] lg:h-[120px]"
    />
  );
};

export default Banner;
