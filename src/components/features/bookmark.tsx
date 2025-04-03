'use client';

import useBookmark from '@/lib/hooks/use-bookmark';

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

  return <button onClick={toggleBookmark}>북마크</button>;
};

export default Bookmark;
