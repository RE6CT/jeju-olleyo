import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';
import { UserBookmarks } from '@/types/mypage.type';
import Image from 'next/image';
import Link from 'next/link';

const BookmarksPage = async () => {
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  const bookmarks: UserBookmarks | null =
    await fetchGetAllBookmarksByUserId(userId);

  return (
    <>
      <p>{bookmarks?.length}개의 장소를 북마크했어요</p>
      <h2 className="text-2xl">내가 북마크한 장소</h2>
      {bookmarks?.length === 0 ? (
        <div>아직 북마크한 장소가 없습니다.</div>
      ) : (
        <ul className="grid w-full grid-cols-3 gap-5">
          {bookmarks?.map((place) => (
            <li key={place.placeId}>
              <Link
                href={`/place/${place.placeId}`}
                className="flex w-full flex-col justify-center"
              >
                <div className="relative aspect-square">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center">
                  {place.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BookmarksPage;
