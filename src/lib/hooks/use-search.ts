'use client';

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import { Place } from '@/types/search.type';

const useSearch = (query: string) => {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

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

  // 일단 카테고리별 페이지 없는 상태라서 전체 데이터 로딩
  // TODO : 카테고리별 페이지 만들면, 검색어 없을 경우, '전체' 카테고리 페이지로 리다이렉트 예정
  useEffect(() => {
    if (!query.trim()) {
      setResults(allPlaces);
      return;
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
