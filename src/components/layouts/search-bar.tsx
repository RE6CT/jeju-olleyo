'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { PATH } from '@/constants/path.constants';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

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
    <>
      <Command className="w-[300px] rounded-lg border">
        <CommandInput
          placeholder="검색어를 입력해 주세요"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
      </Command>
    </>
  );
};

export default SearchBar;
