'use client';

import { useState } from 'react';
import fetchGetBookmarkByIdQuery from '../apis/bookmark/get-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';
import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';

const useBookmark = (
  bookmark_id: number,
  place: number,
  userId: string,
  initialBookmarks: boolean,
) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const toggleBookmark = async () => {
    const currentBookmark = await fetchGetBookmarkByIdQuery(place, userId);

    if (currentBookmark) {
      await fetchDeleteBookmark(currentBookmark.bookmark_id);
    } else {
      await fetchAddBookmarkByIdQuery(place, userId);
    }

    const updatedCount = await countLike(planId);
    setBookmarks(updatedCount != null ? updatedCount : likes);
  };

  return { toggleBookmark };
};

export default useLike;
