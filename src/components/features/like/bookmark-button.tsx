import BookmarkIcon from '@/components/icons/bookmark-icon';
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
    e.preventDefault();
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
    <button
      onClick={handleBookmarkClick}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-[8px] border-none bg-white/10 md:h-14 md:w-14 lg:rounded-12 ${className}`}
      aria-label={isBookmarked ? '북마크 해제' : '북마크'}
    >
      <BookmarkIcon
        fill={isBookmarked ? 'primary-500' : 'gray-200'}
        size={56}
      />
    </button>
  );
};

export default BookmarkButton;
