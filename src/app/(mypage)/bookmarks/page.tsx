import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import BookmarksList from './_components/bookmarks-list';

const BookmarksPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  return (
    <div className="flex w-full flex-col gap-5">
      <BookmarksList userId={userId} />
    </div>
  );
};

export default BookmarksPage;
