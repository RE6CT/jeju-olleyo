'use client';

import SearchBarTest from '@/components/layouts/search-bar-test';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchTestPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchGetSearchByInput = async () => {
      if (!query) return;

      const res = await fetch(
        `/api/searchtest?query=${encodeURIComponent(query)}`,
      );
      const data = await res.json();

      setResults(data);
    };
    fetchGetSearchByInput();
  }, [query]);
  return (
    <>
      <div className="pt-20">
        검색 테스트 페이지 입니다.
        <SearchBarTest />
        <div>검색 결과는 아래와 같다.</div>
        <ul>
          {Array.isArray(results) ? (
            results.map((place: any) => (
              <div key={place.contentid}>
                <li>{place.title}</li>
                <li>{place.addr1}</li>
              </div>
            ))
          ) : (
            <div>검색 결과를 불러오는 중 오류가 발생했습니다.</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchTestPage;
