'use client';

import Loading from '@/app/loading';
import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import PlaceCard from '@/components/features/card/place-card';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { PATH } from '@/constants/path.constants';
import useAuth from '@/lib/hooks/use-auth';
import { useGetBookMarks } from '@/lib/queries/use-get-bookmarks';
import { CategoryParamType, CategoryType } from '@/types/category.type';
import { useRouter, useSearchParams } from 'next/navigation';
import MypageDataCounts from '../../_components/mypage-data-counts';
import MypagePagination from '../../_components/mypage-pagination';

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

  const { user, isLoading } = useAuth();
  const { data: bookmarks, isLoading: isBookmarksLoading } = useGetBookMarks(
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

  if (isLoading || isBookmarksLoading) return <Loading />;

  return (
    <>
      <div>
        <MypageDataCounts pageType="bookmarks" />
        <h2 className="semibold-28 w-full pb-5 pt-4">내가 북마크한 장소</h2>

        <div className="w-fit">
          <CategoryFilterTabs
            tabs={Object.keys(TAB_LIST) as CategoryType[]}
            defaultTab={CATEGORY_KR_MAP[category] as CategoryType}
            onTabChange={handleFilterTabChange}
            tabsGapClass="gap-3"
            tabPaddingClass="px-5 py-2 semibold-16"
          />
        </div>
      </div>
      {bookmarks?.length === 0 ? (
        <div>아직 북마크한 장소가 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-20">
          <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
            {bookmarks?.map((place) => (
              <PlaceCard
                key={place.placeId}
                placeId={place.placeId}
                image={place.image}
                title={place.title}
                isBookmarked={true}
                isDragging={false}
              />
            ))}
          </div>
          <MypagePagination pageType="bookmarks" pageSize={PAGE_SIZE} />
        </div>
      )}
    </>
  );
};

export default BookmarksList;
