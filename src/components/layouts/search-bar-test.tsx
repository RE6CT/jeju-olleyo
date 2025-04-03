'use client';

import { Command, CommandInput } from '@/components/ui/command';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

const SearchBarTest = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (query) {
      router.push(`searchtest?query=${query}`);
    }
  };

  return (
    <>
      <Command className="w-[300px] rounded-lg border">
        <CommandInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
