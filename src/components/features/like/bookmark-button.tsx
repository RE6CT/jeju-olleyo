import BookmarkIcon from '@/components/commons/bookmark-icon';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { useBookmarkMutation } from '@/lib/mutations/use-bookmark-mutation';
import { useCurrentUser } from '@/lib/queries/auth-queries';

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
  const { mutate: toggleBookmark, isPending } = useBookmarkMutation();
  const { data: user } = useCurrentUser();
  const { successToast } = useCustomToast();

  /** 북마크 버튼 클릭 핸들러 */
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      successToast('로그인이 필요합니다.');
      return;
    }
    if (!isPending) {
      toggleBookmark({ userId: user.id, placeId });
    }
  };

  return (
    <BookmarkIcon
      isBookmarked={isBookmarked}
      onToggle={handleBookmarkClick}
      className={className}
    />
  );
};

export default BookmarkButton;
