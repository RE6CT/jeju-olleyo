'use client';

import { useEffect, useState } from 'react';
import { Place } from '@/types/search.type';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '../supabase/client';

const useSearch = (query: string) => {
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        router.replace('/categories/all');
        return;
      }

      try {
        const supabase = await getBrowserClient();

        const { data, error } = await supabase
          .from('places')
          .select('*')
          .or(`title.ilike.%${query}%,address.ilike.%${query}%`);

        if (error) {
          console.error('검색 실패', error.message);
          return;
        }

        setResults(data as Place[]);
      } catch (err) {
        console.error('검색 요청 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return { results, loading };
};

export default useSearch;
