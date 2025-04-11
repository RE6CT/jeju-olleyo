import React, { useState } from 'react';
import BookmarkSvg from '../../../public/icons/bookmark.svg';
import { Button } from '../ui/button';

/**
 * 북마크 아이콘 컴포넌트
 */
const BookmarkIcon = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: 서버 액션 호출 추가
  };

  return (
    <Button
      onClick={toggleBookmark}
      className="rounded-12 flex aspect-square h-[56px] w-[56px] cursor-pointer items-center justify-center gap-[10px] border-none bg-[rgba(255,255,255,0.1)] px-[12px] py-[7px]"
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
    >
      <BookmarkSvg fill={isBookmarked ? 'primary-500' : 'gray-200'} />
    </Button>
  );
};

export default BookmarkIcon;
