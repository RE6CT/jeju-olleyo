'use client';

import { useState } from 'react';
import fetchGetBookmarkByIdQuery from '../apis/bookmark/get-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';
import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';

const useBookmark = (
  place: number,
  userId: string,
  initialBookmarks: boolean,
  place_lat: number,
  place_lng: number,
) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const toggleBookmark = async () => {
    const currentBookmark = await fetchGetBookmarkByIdQuery(place, userId);

    if (currentBookmark) {
      await fetchDeleteBookmark(currentBookmark.bookmark_id);
      setBookmarks(false);
    } else {
      await fetchAddBookmarkByIdQuery(place, userId, place_lat, place_lng);
      setBookmarks(true);
    }
  };

  return { bookmarks, toggleBookmark };
};

export default useBookmark;
