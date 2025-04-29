'use client';

import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import PlaceCard from '@/components/features/card/place-card';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { PATH } from '@/constants/path.constants';
import useAuth from '@/lib/hooks/use-auth';
import { useGetBookMarks } from '@/lib/queries/use-get-bookmarks';
import { CategoryParamType, CategoryType } from '@/types/category.type';
import { useRouter, useSearchParams } from 'next/navigation';
import MypageDataCounts from '../../../_components/_client/mypage-data-counts';
import MypagePagination from '../../../_components/_client/mypage-pagination';
import EmptyResult from '@/components/commons/empty-result-link';
import MypageActivitiesDropdown from '@/app/(mypage)/_components/_client/mypage-activities-dropdown';

const PAGE_SIZE = 9;
const TAB_LIST: Record<CategoryType, CategoryParamType> = {
  전체: 'all',
  명소: 'toursite',
  숙박: 'accommodation',
  맛집: 'restaurant',
  카페: 'cafe',
};

/**
 * 카테고리별 북마크 페이지 내용 전체를 담고 있는 클라이언트 컴포넌트
 * @param category - 현재 북마크 페이지의 카테고리
 */
const BookmarksList = ({ category }: { category: CategoryParamType }) => {
  const router = useRouter();

  // URL에서 페이지 번호 가져오기
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const { user } = useAuth();
  const { data: bookmarks } = useGetBookMarks(
    user?.id,
    currentPage,
    PAGE_SIZE,
    CATEGORY_KR_MAP[category] as CategoryType,
  );

  /**
   * 탭 이동 핸들러
   * @param tab - 현재 탭
   */
  const handleFilterTabChange = (tab: CategoryType) => {
    router.push(`${PATH.BOOKMARKS}/${TAB_LIST[tab]}?page=1`);
  };

  return (
    <>
      <section className="flex flex-col gap-[10px] md:gap-4 lg:gap-5">
        <MypageActivitiesDropdown pageType="bookmarks" />
        <div className="hidden flex-col md:flex md:gap-2 lg:gap-4">
          <MypageDataCounts pageType="bookmarks" />
          <h2 className="md:bold-24 lg:semibold-28 w-full">
            내가 북마크한 장소
          </h2>
        </div>

        <nav className="w-fit">
          <CategoryFilterTabs
            tabs={Object.keys(TAB_LIST) as CategoryType[]}
            defaultTab={CATEGORY_KR_MAP[category] as CategoryType}
            onTabChange={handleFilterTabChange}
            tabsGapClass="gap-2 md:gap-3"
            tabPaddingClass="px-3 py-[5px] md:px-4 lg:px-5 md:py-1 lg:py-2"
            tabFontClass="medium-12 md:medium-14 lg:semibold-16"
          />
        </nav>
      </section>

      {bookmarks?.length === 0 ? (
        <div role="region" aria-label="북마크한 장소 없음">
          <EmptyResult
            buttonText="제주도 여행지 보러가기"
            href={`${PATH.CATEGORIES}/all`}
            imagePath="/empty-result/empty_bookmarks.png"
          />
        </div>
      ) : (
        <section className="flex flex-col gap-20">
          <ul className="grid list-none grid-cols-3 gap-x-3 gap-y-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks?.map((place) => (
              <li key={place.placeId}>
                <PlaceCard
                  placeId={place.placeId}
                  image={place.image}
                  title={place.title}
                  isBookmarked={true}
                />
              </li>
            ))}
          </ul>

          <nav aria-label="페이지 탐색">
            <MypagePagination pageType="bookmarks" pageSize={PAGE_SIZE} />
          </nav>
        </section>
      )}
    </>
  );
};

export default BookmarksList;
