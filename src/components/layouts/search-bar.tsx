'use client';

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PATH } from '@/constants/path.constants';
import { Input } from '../ui/input';
import SearchIcon from '../icons/search-icon';
import CloseIcon from '../icons/close-icon';
import useCustomToast from '@/lib/hooks/use-custom-toast';

const MAX_QUERY_LENGTH = 50;

/**
 * 반응형 검색바 컴포넌트
 * 화면 크기에 맞게 너비가 조정됨
 */
const SearchBar = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const params = useParams();
  const path = usePathname();

  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get('query') ?? '';
  const [inputValue, setInputValue] = useState(queryFromUrl);

  const { successToast } = useCustomToast();

  const category = params.category ?? 'all';

  useEffect(() => {
    const urlQuery = searchParams.get('query') ?? '';
    setInputValue(urlQuery);
  }, [path, searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  const handleSearch = () => {
    const query = inputValue.trim();
    if (query.length > MAX_QUERY_LENGTH) {
      successToast(`검색어는 ${MAX_QUERY_LENGTH}자를 넘을 수 없습니다.`);
      setInputValue('');
      return;
    }

    if (query) {
      handleAddKeyword(query);
      router.push(`${PATH.SEARCH}/${category}?query=${query}`);
      setOpen(false);
    }
  };

  const handleAddKeyword = (text: string) => {
    const deleteDuplicate = keywords.filter((keyword) => keyword !== text);
    const updated = [text, ...deleteDuplicate].slice(0, 5);
    setKeywords(updated);
  };

  const handleClearKeywords = () => {
    setKeywords([]);
  };

  // 클릭 이벤트 핸들러
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
    // 포커스 설정
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <div className="relative">
      <SearchIcon
        className="absolute left-[10px] top-1/2 z-10 -translate-y-1/2 transform"
        size={20}
        fill="gray-400"
      />
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="제주 여행, 어디부터 시작할까요?"
        className="medium-14 placeholder:medium-14 md:medium-14 md:placeholder:medium-14 rounded-full border-none bg-white py-[7.5px] pl-[38px] pr-[10px] placeholder:text-gray-400 md:bg-gray-50 md:py-2 lg:py-[9.5px]"
        onClick={handleInputClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <div
        className={`absolute left-0 right-0 top-full z-50 mt-1 ${!open ? 'hidden' : ''}`}
      >
        {keywords.length ? (
          <div className="w-full rounded-xl border-none bg-gray-50 shadow">
            <div className="medium-12 flex items-center justify-between px-4 py-3 text-gray-600">
              <span>최근 검색어</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearKeywords();
                }}
                className="medium-12 text-gray-400 hover:text-gray-500"
              >
                전체 삭제
              </button>
            </div>
            <ul className="regular-14 space-y-[11px] px-4 py-3 text-gray-800">
              {keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="flex cursor-pointer items-center justify-between hover:text-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setInputValue(keyword);
                    // 검색어 클릭 후 즉시 검색 실행
                    setTimeout(() => {
                      handleAddKeyword(keyword);
                      router.push(
                        `${PATH.SEARCH}/${category}?query=${keyword}`,
                      );
                      setOpen(false);
                    }, 0);
                  }}
                >
                  <span className="truncate">{keyword}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setKeywords((prev) => prev.filter((k) => k !== keyword));
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    <CloseIcon size={16} fill="gray-600" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="medium-12 w-full rounded-xl border-none bg-gray-50 px-4 py-3 text-gray-400 shadow">
            최근 검색어가 없습니다.
          </div>
        )}
      </div>

      {/* 클릭 바깥영역 감지용 오버레이 */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default SearchBar;
