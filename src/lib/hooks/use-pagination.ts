import { INITIAL_PAGE } from '@/constants/plan.constants';
import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
  };
};
