'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { PATH } from '@/constants/path.constants';

import { Input } from '../ui/input';

/**
 * 반응형 검색바 컴포넌트
 * 화면 크기에 맞게 너비가 조정됨
 */
const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const path = usePathname();

  const category = params.category ?? 'all';

  const handleSearch = () => {
    const query = inputRef.current?.value;
    if (query) {
      router.push(`${PATH.SEARCH}/${category}?query=${query}`);
    }
  };

  useEffect(() => {
    if ((path === PATH.HOME || path !== PATH.SEARCH) && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [path]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform" />
      <Input
        placeholder="제주 여행, 어디부터 시작할까요?"
        ref={inputRef}
        className="placeholder:medium-14 medium-14 h-10 rounded-full border-none bg-gray-50 pl-[42px] placeholder:text-gray-400"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
    </div>
  );
};

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
    >
      <path
        d="M18.7937 33.5875C14.6591 33.5875 11.1602 32.1551 8.29701 29.2905C5.43386 26.4258 4.00152 22.9269 4 18.7937C3.99848 14.6606 5.43082 11.1617 8.29701 8.29701C11.1632 5.43234 14.6621 4 18.7937 4C22.9254 4 26.425 5.43234 29.2927 8.29701C32.1605 11.1617 33.592 14.6606 33.5875 18.7937C33.5875 20.4628 33.322 22.037 32.7909 23.5164C32.2598 24.9957 31.5391 26.3044 30.6287 27.4424L43.3741 40.1878C43.7914 40.605 44 41.1361 44 41.7809C44 42.4258 43.7914 42.9568 43.3741 43.3741C42.9568 43.7914 42.4258 44 41.7809 44C41.1361 44 40.605 43.7914 40.1878 43.3741L27.4424 30.6287C26.3044 31.5391 24.9957 32.2598 23.5164 32.7909C22.037 33.322 20.4628 33.5875 18.7937 33.5875ZM18.7937 29.0356C21.6387 29.0356 24.0573 28.0402 26.0495 26.0495C28.0417 24.0588 29.0371 21.6402 29.0356 18.7937C29.034 15.9473 28.0387 13.5294 26.0495 11.5403C24.0603 9.55107 21.6417 8.55495 18.7937 8.55192C15.9458 8.54889 13.5279 9.545 11.5403 11.5403C9.55259 13.5355 8.55647 15.9533 8.55192 18.7937C8.54737 21.6341 9.54348 24.0527 11.5403 26.0495C13.537 28.0463 15.9549 29.0416 18.7937 29.0356Z"
        className="fill-gray-900"
      />
    </svg>
  );
};

export default SearchBar;
