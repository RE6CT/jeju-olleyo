import BookmarksList from './_components/bookmarks-list';

const BookmarksPage = async () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <BookmarksList />
    </div>
  );
};

export default BookmarksPage;
