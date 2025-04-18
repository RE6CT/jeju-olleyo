'use client';

import { useEffect, useState } from 'react';

import { Place } from '@/types/search.type';

import { getBrowserClient } from '../supabase/client';
import { camelize } from '../utils/camelize';

const PAGE_SIZE = 16;

const useSearch = (query: string) => {
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);

  const fetchNextPage = async (reset = false) => {
    setLoading(true);

    try {
      const supabase = await getBrowserClient();

      const from = reset ? 0 : page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from('places')
        .select('*')
        .or(`title.ilike.%${query}%,address.ilike.%${query}%`)
        .range(from, to);

      if (error) {
        console.error('검색 실패', error.message);
        return;
      }

      const camelized = data.map(camelize) as Place[];

      if (reset) {
        setResults(camelized); // reset이면 덮어쓰기
        setPage(1);
      } else {
        setResults((prev) => [...prev, ...camelized]); // 누적
        setPage((prev) => prev + 1);
      }

      if (camelized.length < PAGE_SIZE) {
        setMore(false);
      }
    } catch (err) {
      console.error('검색 요청 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(0);
    setMore(true);

    if (query.trim()) {
      fetchNextPage(true); // reset = true
    }
  }, [query]);

  return { results, loading, more, fetchNextPage };
};

export default useSearch;
