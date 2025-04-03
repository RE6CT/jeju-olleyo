'use client';

import useBookmark from '@/lib/hooks/use-bookmark';
import { Bookmark as BookmarkIcon } from 'lucide-react';

const Bookmark = ({
  userId,
  place,
  initialBookmarks,
  place_lat,
  place_lng,
}: {
  userId: string;
  place: number;
  initialBookmarks: boolean;
  place_lat: number;
  place_lng: number;
}) => {
  const { bookmarks, toggleBookmark } = useBookmark(
    place,
    userId,
    initialBookmarks,
    place_lat,
    place_lng,
  );

  return (
    <button onClick={toggleBookmark}>
      <BookmarkIcon className="h-5 w-5 cursor-pointer" />
    </button>
  );
};

export default Bookmark;
