'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

const SearchBarTest = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const query = inputRef.current?.value;
    if (query) {
      router.push(`/searchtest?query=${query}`);
    }
  };

  return (
    <>
      <Command className="w-[300px] rounded-lg border">
        <CommandInput
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="검색어를 입력해 주세요"
        />
      </Command>
    </>
  );
};

export default SearchBarTest;
