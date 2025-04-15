'use client';

import PlaceCard from '@/components/features/card/place-card';
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';

/**
 * 북마크 페이지 내용 전체를 담고 있는 클라이언트 컴포넌트
 * @param userId - 사용자의 uuid
 */
const BookmarksList = ({ userId }: { userId: string }) => {
  const { data } = useGetDataCount(userId);
  const { bookmarks } = useBookmarkQuery(userId);

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {data?.bookmarkCount}개의 장소를 북마크했어요
        </p>
        <h2 className="semibold-28 w-full">내가 북마크한 장소</h2>
      </div>
      {bookmarks?.length === 0 ? (
        <div>아직 북마크한 장소가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {bookmarks?.map((place) => (
            <PlaceCard
              key={place.placeId}
              placeId={place.placeId}
              image={place.image}
              title={place.title}
              isLiked={true}
              isDragging={false}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BookmarksList;
