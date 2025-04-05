import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';

const BookmarksPage = async () => {
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  const { data: bookmarks, count } = await fetchGetAllBookmarksByUserId(userId);

  return (
    <>
      <p>{count}개의 장소를 북마크했어요</p>
      <h2 className="text-2xl">내가 북마크한 장소</h2>
      <div className="grid grid-cols-3">
        {bookmarks?.map(() => (
          <div>
            <img />
            <h3>북마크 타이틀</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookmarksPage;
