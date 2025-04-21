import BookmarkIcon from '@/components/commons/bookmark-icon';

/**
 * 북마크 버튼 컴포넌트
 * @param isBookmarked - 북마크 여부
 * @param placeId - 카드의 장소 id
 */
const BookmarkButton = ({
  isBookmarked,
  placeId,
  className,
}: {
  isBookmarked: boolean;
  placeId: number;
  className?: string;
}) => {
  const handleBookmarkClick = () => {};

  return (
    <BookmarkIcon
      isBookmarked={isBookmarked}
      onToggle={handleBookmarkClick}
      className={className}
    />
  );
};

export default BookmarkButton;
