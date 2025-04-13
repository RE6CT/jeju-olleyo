import React, { useState } from 'react';
import { Button } from '../ui/button';

/**
 * 북마크 아이콘 컴포넌트
 */
const BookmarkIcon = ({
  isBookmarked: initialIsBookmarked,
  onToggle,
}: {
  isBookmarked: boolean;
  onToggle: () => void;
}) => {
  const [isBookmarkedState, setIsBookmarkedState] =
    useState(initialIsBookmarked);

  const toggleBookmark = () => {
    setIsBookmarkedState(!isBookmarkedState);
    onToggle();
    // TODO: 서버 액션 호출 추가
  };

  return (
    <Button
      onClick={toggleBookmark}
      variant="ghost"
      className="flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-transparent p-0 hover:bg-transparent"
      aria-label={isBookmarkedState ? '북마크 해제' : '북마크'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
          stroke="currentColor"
          fill={isBookmarkedState ? 'currentColor' : 'none'}
          strokeWidth="2"
          className={isBookmarkedState ? 'text-primary-500' : 'text-gray-200'}
        />
      </svg>
    </Button>
  );
};

export default BookmarkIcon;
