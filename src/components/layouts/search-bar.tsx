'use client';

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { PATH } from '@/constants/path.constants';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * 반응형 검색바 컴포넌트
 * 화면 크기에 맞게 너비가 조정됨
 */
const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();

  const [keywords, setKeywords] = useState<string[]>([]);

  const handleSearch = () => {
    const query = inputRef.current?.value;
    if (query) {
      router.push(`${PATH.SEARCH}?query=${query}`);
      addKeyword(query);
    }
  };
  const addKeyword = (text: string) => {
    const updated = [text, ...keywords.filter((k) => k !== text)];
    const limited = updated.slice(0, 5);
    setKeywords(limited);
  };

  const removeKeyword = (text: string) => {
    setKeywords(keywords.filter((k) => k !== text));
  };

  const clearKeywords = () => {
    setKeywords([]);
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [path]);

  useEffect(() => {
    const saved = localStorage.getItem('keywords');
    if (saved) {
      setKeywords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

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
      <CommandGroup heading="최근검색어">
        {keywords.length > 0 && (
          <button
            onClick={clearKeywords}
            className="ml-auto mr-4 text-xs text-gray-500 hover:underline"
          >
            전체 삭제
          </button>
        )}
        <ul>
          {keywords.length > 0 ? (
            keywords.map((text) => (
              <CommandItem key={text} className="flex justify-between">
                <span
                  onClick={() => {
                    if (inputRef.current) inputRef.current.value = text;
                    handleSearch();
                  }}
                  className="cursor-pointer"
                >
                  {text}
                </span>
                <button
                  type="button"
                  onClick={() => removeKeyword(text)}
                  className="text-red-500 ml-2 text-xs"
                >
                  삭제
                </button>
              </CommandItem>
            ))
          ) : (
            <span>최근 검색어가 없습니다.</span>
          )}
        </ul>
      </CommandGroup>
    </Command>
  );
};

export default SearchBar;
