import { CategoryParamType } from '@/types/category.type';
import BookmarksList from '../_components/_client/bookmarks-list';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export const metadata = {
  title: '마이페이지 - 내가 북마크한 장소',
};

const BookmarksPage = async ({
  params,
}: {
  params: { category: CategoryParamType };
}) => {
  const category = params.category || 'all';

  return (
    <div className="flex w-full flex-col gap-5">
      <Suspense fallback={<Loading />}>
        <BookmarksList category={category} />
      </Suspense>
    </div>
  );
};

export default BookmarksPage;
