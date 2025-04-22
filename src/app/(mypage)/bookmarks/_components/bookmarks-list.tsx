'use client';

import Loading from '@/app/loading';
import PlaceCard from '@/components/features/card/place-card';
import Pagination from '@/components/ui/pagination';
import useAuth from '@/lib/hooks/use-auth';
import { useGetBookMarks } from '@/lib/queries/use-get-bookmarks';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PAGE_SIZE = 9;

/** 북마크 페이지 내용 전체를 담고 있는 클라이언트 컴포넌트 */
const BookmarksList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 페이지 번호 가져오기
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [page, setPage] = useState<number>(currentPage);

  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );
  const { data: bookmarks, isLoading: isBookmarksLoading } = useGetBookMarks(
    user?.id,
    currentPage,
    PAGE_SIZE,
  );

  /**
   * 페이지 이동 클릭 핸들러
   * @param page - 이동할 페이지 숫자
   */
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setPage(page);
  };

  if (isLoading || isCountLoading || isBookmarksLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {countData?.bookmarkCount}개의 장소를 북마크했어요
        </p>
        <h2 className="semibold-28 w-full">내가 북마크한 장소</h2>
      </div>
      {bookmarks?.length === 0 ? (
        <div>아직 북마크한 장소가 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-10">
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
          <Pagination
            currentPage={page}
            totalPages={Math.ceil((countData?.bookmarkCount ?? 1) / PAGE_SIZE)}
            onPageChange={handlePageChange}
            backgroundColor="primary-500"
            hideOnSinglePage={false}
          />
        </div>
      )}
    </>
  );
};

export default BookmarksList;
