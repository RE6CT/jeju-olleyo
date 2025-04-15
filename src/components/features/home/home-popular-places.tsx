'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePopularPlaces } from '@/lib/hooks/use-popular-places';
import { Category } from '@/types/home.popular-place.type';
import { CATEGORIES } from '@/constants/home.constants';
import useDragScroll from '@/lib/hooks/use-drag-scroll';
import PlaceCard from '../card/place-card';

/**
 * 인기 장소를 카테고리별로 표시하는 컴포넌트
 * 카테고리 전환 시 UI 깜빡임을 방지하는 최적화 적용
 */
const PopularPlaces = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>('전체');
  const { places, isLoading, isFirstLoading } =
    usePopularPlaces(activeCategory);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isDragging } = useDragScroll(scrollContainerRef, { threshold: 5 });

  const handleViewMore = () => {
    router.push('/categories/all');
  };

  // 카테고리 변경 처리 함수
  const handleCategoryChange = (category: Category) => {
    if (category === activeCategory) return; // 같은 카테고리 클릭 시 무시
    setActiveCategory(category);
  };

  return (
    <section className="w-full px-4 py-6">
      <div style={{ width: '952px' }} className="mx-auto">
        {/* 전체 가로 길이 952px로 고정 */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">올레 인기 장소</h2>
          <button
            onClick={handleViewMore}
            className="regular-16 text-gray-600 hover:text-black"
          >
            더보기
          </button>
        </div>
        {/* 카테고리 탭 */}
        <div className="mb-6 flex space-x-2 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-[28px] border-[0.6px] border-solid border-[color:var(--Gray-600,#537384)] px-3 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'border-[#F60] bg-primary-100 text-primary-800'
                  : 'border-[color:var(--Gray-600,#537384)] text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* 장소 카드 슬라이더 */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex cursor-grab select-none overflow-x-auto pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              userSelect: 'none',
              gap: '11px', // 카드 간 간격 11px로 설정
              minHeight: '350px', // 최소 높이 유지로 레이아웃 안정화
            }}
          >
            {isFirstLoading ? (
              // 첫 로딩 시에만 스켈레톤 UI 표시
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 animate-pulse rounded-lg bg-gray-200"
                  style={{ width: '230px', height: '300px' }} // 카드 가로 길이 230px로 고정
                />
              ))
            ) : places.length > 0 ? (
              // 장소 카드 렌더링
              places.map((place) => (
                <div
                  key={place.id}
                  className="flex-shrink-0 transition-opacity duration-200"
                  style={{ width: '230px' }} // 카드 가로 길이 230px로 고정
                >
                  <PlaceCard
                    key={place.id}
                    placeId={place.id}
                    image={place.image || '/images/default_place_image.svg'}
                    title={place.title}
                    isLiked={place.isBookmarked}
                    isDragging={isDragging}
                    className="cursor-pointer select-none"
                  />
                </div>
              ))
            ) : (
              // 데이터가 없을 때
              <div className="w-full py-12 text-center text-gray-500">
                {activeCategory} 카테고리에 인기 장소가 없습니다.
              </div>
            )}
          </div>

          {/* 로딩 인디케이터 오버레이 (첫 로딩이 아닌 경우에만) */}
          {isLoading && !isFirstLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 backdrop-blur-[1px] transition-opacity">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularPlaces;
