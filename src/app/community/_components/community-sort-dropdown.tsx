'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { CommunitySortType } from '@/types/community.type';
import { useRouter, useSearchParams } from 'next/navigation';

const typeName = {
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
  const handleSortClick = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus:outline-none focus-visible:outline-none"
      >
        <button className="medium-14 flex items-center gap-1 whitespace-nowrap px-4 py-1 text-gray-500">
          {typeName[sortType]}
          <ArrowDownIcon size={14} className="fill-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!rounded-12 border-none px-4 py-2 shadow-dropdown">
        <DropdownMenuItem
          onClick={() => handleSortClick('popular')}
          className="medium-16"
        >
          인기순
        </DropdownMenuItem>
        <Separator className="my-[6px]" />
        <DropdownMenuItem
          onClick={() => handleSortClick('recent')}
          className="medium-16"
        >
          최신순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/** 아래쪽 화살표 아이콘 */
const ArrowDownIcon = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.1269 35.1191C25.5627 35.6831 24.7976 36 23.9998 36C23.202 36 22.4368 35.6831 21.8726 35.1191L4.8524 18.0989C4.30433 17.5314 4.00107 16.7714 4.00793 15.9826C4.01478 15.1937 4.33121 14.4391 4.88905 13.8812C5.44689 13.3234 6.20151 13.007 6.99038 13.0001C7.77925 12.9933 8.53925 13.2965 9.1067 13.8446L23.9998 28.7376L38.8928 13.8446C39.4603 13.2965 40.2203 12.9933 41.0091 13.0001C41.798 13.007 42.5526 13.3234 43.1105 13.8812C43.6683 14.4391 43.9847 15.1937 43.9916 15.9826C43.9984 16.7714 43.6952 17.5314 43.1471 18.0989L26.1269 35.1191Z"
        className={`${className}`}
      />
    </svg>
  );
};

export default SortDropdown;
