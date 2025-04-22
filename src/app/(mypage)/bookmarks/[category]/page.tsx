import { CategoryParamType } from '@/types/category.type';
import BookmarksList from '../_components/bookmarks-list';

const BookmarksPage = async ({
  params,
}: {
  params: { category: CategoryParamType };
}) => {
  const category = params.category || 'all';

  return (
    <div className="flex w-full flex-col gap-5">
      <BookmarksList category={category} />
    </div>
  );
};

export default BookmarksPage;
