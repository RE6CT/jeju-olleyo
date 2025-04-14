import PlaceCard from '@/components/features/card/place-card';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';
import { UserBookmarks } from '@/types/mypage.type';

const BookmarksPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  const bookmarks: UserBookmarks | null =
    await fetchGetAllBookmarksByUserId(userId);

  if (!bookmarks) throw new Error('북마크 목록 로드 중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {bookmarks?.length}개의 장소를 북마크했어요
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
