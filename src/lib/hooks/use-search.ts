'use client';

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import { Place } from '@/types/search.type';
import { useRouter } from 'next/navigation';

const useSearch = (query: string) => {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await fetchGetAllPlaces();
        setAllPlaces(data ?? []);
      } catch (e) {
        console.error('장소 불러오기 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // 검색어 없을 경우, '전체' 카테고리 페이지로 리다이렉트
  useEffect(() => {
    if (!query.trim()) {
      router.replace('/categories/all');
    }

    const fuse = new Fuse(allPlaces, {
      keys: ['title', 'address'],
      threshold: 0.5,
    });

    const filtered = fuse.search(query).map((r) => r.item);
    setResults(filtered);
  }, [query, allPlaces]);

  return { results, loading };
};

export default useSearch;
