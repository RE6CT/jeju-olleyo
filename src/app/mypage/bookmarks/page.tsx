import fetchGetAllBookmarks from '@/lib/apis/bookmarks/get-bookmarks.api';

const BookmarksPage = async () => {
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  const { data: bookmarks, count } = await fetchGetAllBookmarks(userId);

  console.log('bookmarks ➡️', bookmarks);
  console.log('count ➡️', count);

  return (
    <>
      <p>{count}개의 장소를 북마크했어요</p>
      <h2 className="text-2xl">내가 북마크한 장소</h2>
    </>
  );
};

export default BookmarksPage;
