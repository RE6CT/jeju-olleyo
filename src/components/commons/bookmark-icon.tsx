import React, { MouseEvent } from 'react';
import { Button } from '../ui/button';

/**
 * 북마크 아이콘 컴포넌트
 */
const BookmarkIcon = ({
  isBookmarked,
  onToggle,
}: {
  isBookmarked: boolean;
  onToggle: () => void;
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={onToggle}
      className="h-30 w-30 flex cursor-pointer items-center justify-center border-none bg-transparent p-0 hover:bg-transparent"
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.85757 20.5C6.71033 20.4995 6.5657 20.4572 6.4376 20.3772C6.30522 20.2952 6.19498 20.1759 6.11817 20.0316C6.04137 19.8872 6.00076 19.7229 6.0005 19.5556V5.70056C5.98891 5.13419 6.18033 4.5856 6.53328 4.17369C6.88623 3.76178 7.37226 3.51973 7.88605 3.5H16.1139C16.6277 3.51973 17.1138 3.76178 17.4667 4.17369C17.8197 4.5856 18.0111 5.13419 17.9995 5.70056V19.5556C17.9986 19.7204 17.9586 19.8821 17.8834 20.0246C17.8082 20.167 17.7005 20.2854 17.571 20.3678C17.4407 20.4507 17.2929 20.4943 17.1424 20.4943C16.992 20.4943 16.8442 20.4507 16.7139 20.3678L11.8543 17.3361L7.2861 20.3583C7.15716 20.4465 7.00928 20.4954 6.85757 20.5Z"
          stroke="currentColor"
          fill={isBookmarked ? 'currentColor' : 'none'}
          strokeWidth="2"
          className={isBookmarked ? 'text-primary-500' : 'text-gray-200'}
        />
      </svg>
    </button>
  );
};

export default BookmarkIcon;
