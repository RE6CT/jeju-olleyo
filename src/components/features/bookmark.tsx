'use client';

import { Bookmark as BookmarkButton } from 'lucide-react';

import useBookmark from '@/lib/hooks/use-bookmark';

const Bookmark = ({
  userId,
  placeId,
  initialBookmarks,
}: {
  userId: string;
  placeId: number;
  initialBookmarks: boolean;
}) => {
  const { toggleBookmark } = useBookmark(placeId, userId, initialBookmarks);

  return (
    <button onClick={toggleBookmark}>
      <BookmarkButton className="h-5 w-5 cursor-pointer" />
    </button>
  );
};

export default Bookmark;
