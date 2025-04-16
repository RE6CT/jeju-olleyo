import React, { MouseEvent } from 'react';

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
  /**
   * onToggle 함수 전 이벤트 버블링 방지용 함수
   */
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-12 border-none bg-white/10 p-0 hover:bg-transparent"
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0855 7C9.06817 7 4.18994 11.8782 4.18994 17.8955C4.18994 28.7911 17.0665 38.6961 24 41C30.9335 38.6961 43.81 28.7911 43.81 17.8955C43.81 11.8782 38.9318 7 32.9145 7C29.2298 7 25.9711 8.82946 24 11.6296C22.9951 10.1987 21.6604 9.03094 20.1087 8.22508C18.557 7.41923 16.834 6.99901 15.0855 7Z"
          fill="currentColor"
          className={isLiked ? 'text-primary-500' : 'text-gray-200'}
        />
      </svg>
    </button>
  );
};

export default LikeIcon;
