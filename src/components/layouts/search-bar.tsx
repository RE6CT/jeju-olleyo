'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { PATH } from '@/constants/path.constants';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

/**
 * 반응형 검색바 컴포넌트
 * 화면 크기에 맞게 너비가 조정됨
 */
const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const query = inputRef.current?.value;
    if (query) {
      router.push(`${PATH.SEARCH}?query=${query}`);
    }
  };

  return (
    <Command className="mt-1 w-full rounded-full border">
      <CommandInput
        placeholder="제주 여행, 어디부터 시작할까요?"
        ref={inputRef}
        className="h-8 text-xs sm:h-9 sm:text-xs md:h-10 md:text-sm lg:h-10 lg:text-base"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
    </Command>
  );
};

export default SearchBar;
