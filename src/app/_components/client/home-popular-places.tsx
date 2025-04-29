'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

import { CATEGORIES } from '@/constants/home.constants';
import { Category, Place } from '@/types/home.popular-place.type';
import PlaceCard from '@/components/features/card/place-card';
import { usePopularPlaces } from '@/lib/hooks/use-popular-places';

/**
 * 인기 장소를 카테고리별로 표시하는 컴포넌트
 * 그리드 레이아웃 + 반응형 카테고리 버튼/텍스트
 */
const PopularPlaces = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const [placeCount, setPlaceCount] = useState(9);
  const { places, isLoading, isFirstLoading } =
    usePopularPlaces(activeCategory);

  // 화면 크기에 따라 불러올 카드 개수 조절
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024)
        setPlaceCount(8); // lg: 4×2
      else if (window.innerWidth >= 768)
        setPlaceCount(6); // md: 3×2
      else setPlaceCount(9); // sm: 3×3
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const handleViewMore = () => router.push('/categories/all');
  const handleCategoryChange = (cat: Category) => {
    if (cat !== activeCategory) setActiveCategory(cat);
  };

  // 카테고리 버튼 (반응형 패딩·폰트)
  const categoryButtons = useMemo(
    () =>
      CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={`flex h-7 w-[46px] items-center justify-center md:h-8 md:w-[56px] lg:w-[66px] ${
            activeCategory === cat
              ? 'medium-12 rounded-[36px] border-[0.665px] border-solid border-primary-600 bg-primary-100 text-primary-800'
              : 'medium-12 rounded-[36px] border-[0.665px] border-solid border-gray-500 text-gray-600'
          } `}
        >
          {cat}
        </button>
      )),
    [activeCategory],
  );

  // 스켈레톤 & 카드 리스트 생성
  const placeCards = useMemo(() => {
    const items = isFirstLoading
      ? Array.from({ length: placeCount }, () => ({} as Place))
      : places.slice(0, placeCount);

    if (!items.length) {
      return (
        <div className="col-span-full py-12 text-center text-gray-500">
          {activeCategory}에 인기 장소가 없습니다.
        </div>
      );
    }

    return items.map((place: Place, idx: number) => {
      if (isFirstLoading) {
        return (
          <div
            key={idx}
            className="w-full animate-pulse rounded-12 bg-gray-200 pb-[100%]"
          />
        );
      }
      return (
        <PlaceCard
          key={place.id}
          placeId={place.id}
          image={place.image}
          title={place.title}
          isBookmarked={place.isBookmarked}
        />
      );
    });
  }, [places, isFirstLoading, placeCount, activeCategory]);

  return (
    <section className="flex w-[375px] flex-col items-start gap-3 px-4 py-0 md:w-full lg:w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between self-stretch">
        <h2 className="semibold-20 lg:semibold-22 text-center text-gray-900">
          올레 인기 장소
        </h2>
        <div className="flex items-center justify-center gap-2.5 p-2.5">
          <button
            onClick={handleViewMore}
            className="regular-14 md:regular-16 text-center text-gray-600"
          >
            더보기
          </button>
        </div>
      </div>

      {/* 카테고리 탭: 한 줄 고정 가로 스크롤 */}
      <div className="flex items-center gap-2 md:gap-3">{categoryButtons}</div>

      {/* 카드 그리드: sm 3col, md 3col, lg 4col */}
      <div className="grid w-full grid-cols-3 gap-[11px] md:grid-cols-3 lg:grid-cols-4">
        {placeCards}
      </div>

      {/* 로딩 인디케이터 */}
      {isLoading && !isFirstLoading}
    </section>
  );
};

export default PopularPlaces;
