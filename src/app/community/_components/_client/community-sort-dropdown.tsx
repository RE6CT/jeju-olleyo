'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { CommunitySortType } from '@/types/community.type';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDown } from '@/components/icons/arrow-icon';

const sortTypeLabels = {
  popular: '인기순',
  recent: '최신순',
};

/**
 * 정렬 드롭다운 버튼 컴포넌트
 * @param sortType - 정렬 타입 ('popular' , 'recent' 등)
 */
const SortDropdown = ({ sortType }: { sortType: CommunitySortType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * 드롭다운 아이템 (정렬 타입) 선택 핸들러
   * @param value - 쿼리스트링 값으로 저장할 문자열
   */
  const handleSortClick = (value: CommunitySortType) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="sort-dropdown">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="focus:outline-none focus-visible:outline-none"
        >
          <button
            className="medium-14 flex items-center gap-1 whitespace-nowrap px-4 py-1 text-gray-500"
            aria-label={`정렬: ${sortTypeLabels[sortType]}`}
            aria-haspopup="true"
          >
            {sortTypeLabels[sortType]}
            <ArrowDown size={14} fill="gray-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="!rounded-12 border-none px-4 py-2 shadow-dropdown"
          role="menu"
        >
          <DropdownMenuItem
            onClick={() => handleSortClick('popular')}
            className="medium-16"
            role="menuitemradio"
            aria-checked={sortType === 'popular'}
          >
            <div className="flex gap-[10px]">
              <Checkbox
                id="popular"
                checked={sortType === 'popular'}
                className="flex h-5 w-5 items-center justify-center rounded-none border border-solid border-gray-100 bg-white"
              />
              <span>인기순</span>
            </div>
          </DropdownMenuItem>
          <Separator className="my-[6px]" />
          <DropdownMenuItem
            onClick={() => handleSortClick('recent')}
            className="medium-16"
            role="menuitemradio"
            aria-checked={sortType === 'recent'}
          >
            <div className="flex gap-[10px]">
              <Checkbox
                id="recent"
                checked={sortType === 'recent'}
                className="flex h-5 w-5 items-center justify-center rounded-none border border-solid border-gray-100 bg-white"
              />
              <span>최신순</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortDropdown;
