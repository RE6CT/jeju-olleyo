import React, { useState } from 'react';
import { Button } from '../ui/button';

/**
 * 좋아요 아이콘 컴포넌트
 * @returns 좋아요 아이콘 SVG 컴포넌트
 *
 * @example
 * <LikeIcon isLiked={false} onToggle={() => {}} />
 */
const LikeIcon = ({
  isLiked,
  onToggle,
}: {
  isLiked: boolean;
  onToggle: () => void;
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const toggleLike = () => {
    setIsLikedState(!isLikedState);
    onToggle();
    // TODO: 서버 액션 호출 추가
  };

  return (
    <Button
      onClick={toggleLike}
      variant="ghost"
      className="flex h-6 w-6 cursor-pointer items-center justify-center border-none bg-transparent p-0 hover:bg-transparent"
      aria-label={isLikedState ? '좋아요 취소' : '좋아요'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0855 7C9.06817 7 4.18994 11.8782 4.18994 17.8955C4.18994 28.7911 17.0665 38.6961 24 41C30.9335 38.6961 43.81 28.7911 43.81 17.8955C43.81 11.8782 38.9318 7 32.9145 7C29.2298 7 25.9711 8.82946 24 11.6296C22.9951 10.1987 21.6604 9.03094 20.1087 8.22508C18.557 7.41923 16.834 6.99901 15.0855 7Z"
          stroke="currentColor"
          fill={isLikedState ? 'currentColor' : 'none'}
          strokeWidth="2"
          className={isLikedState ? 'text-primary-500' : 'text-gray-200'}
        />
      </svg>
    </Button>
  );
};

export default LikeIcon;
