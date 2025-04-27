import { ArrowDown } from '@/components/icons/arrow-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path.constants';
import Link from 'next/link';

const TITLE = {
  bookmarks: '내가 북마크한 장소',
  likes: '내가 좋아요한 일정',
  comments: '내가 쓴 댓글',
};

const MypageActivitiesDropdown = ({
  pageType,
}: {
  pageType: 'bookmarks' | 'likes' | 'comments';
}) => {
  return (
    <nav className="block md:hidden" aria-label="내 활동 네비게이션">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus:outline-none focus-visible:outline-none"
        >
          <button
            className="semibold-18 flex w-fit items-center gap-[10px]"
            aria-haspopup="true"
            aria-expanded="false"
            aria-controls="activity-menu"
          >
            <span>{TITLE[pageType]}</span>
            <ArrowDown size={16} fill="gray-900" aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          id="activity-menu"
          className="!rounded-12 border-none px-4 py-2 shadow-dropdown"
          role="menu"
          aria-labelledby="activity-dropdown-button"
        >
          <DropdownMenuItem
            className="medium-16 py-2 text-gray-900 focus:text-primary-500"
            role="menuitem"
          >
            <Link
              href={PATH.BOOKMARKS}
              className="block w-full"
              aria-current={pageType === 'bookmarks' ? 'page' : undefined}
            >
              내가 북마크한 장소
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="text-gray-100" aria-hidden="true" />
          <DropdownMenuItem
            className="medium-16 py-2 text-gray-900 focus:text-primary-500"
            role="menuitem"
          >
            <Link
              href={PATH.LIKES}
              className="block w-full"
              aria-current={pageType === 'likes' ? 'page' : undefined}
            >
              내가 좋아요한 일정
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="text-gray-100" aria-hidden="true" />
          <DropdownMenuItem
            className="medium-16 py-2 text-gray-900 focus:text-primary-500"
            role="menuitem"
          >
            <Link
              href={PATH.COMMENTS}
              className="block w-full"
              aria-current={pageType === 'comments' ? 'page' : undefined}
            >
              내가 쓴 댓글
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default MypageActivitiesDropdown;
