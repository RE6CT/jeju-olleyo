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
      <Command className="mt-1 w-[400px] rounded-full border">
        <CommandInput
          placeholder="제주 여행, 어디부터 시작할까요?"
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
