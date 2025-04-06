'use client';

import { useState } from 'react';
import { fetchGetBookmarkByIdQuery } from '../apis/bookmark/get-bookmark.api';
import fetchDeleteBookmark from '../apis/bookmark/delete-bookmark.api';
import fetchAddBookmarkByIdQuery from '../apis/bookmark/add-bookmark.api';

/**
 * 북마크 조회, 추가, 삭제 기능 제공 훅
 * @param place 장소 ID
 * @param userId 사용자 ID
 * @param initialBookmarks 초기 북마크 여부 상태
 * @param place_lat 해당 장소의 위도 (카카오맵 좌표 표시)
 * @param place_lng 해당 장소의 경도 (카카오맵 좌표 표시)
 */
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
