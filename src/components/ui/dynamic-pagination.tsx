import { Button } from '@/components/ui/button';

const DynamicPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}) => {
  if (totalPages <= 1) return null;

  // 현재 페이지 주변의 페이지 넘버 계산
  const getPageNumbers = () => {
    const pages = [];

    // maxVisiblePages가 홀수면 현재 페이지가 중간, 짝수면 다음 페이지 쪽으로 더 많이 보이도록 계산
    const offset =
      maxVisiblePages % 2 === 0 ? 1 : Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - offset);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 시작 페이지 조정 (끝 페이지가 totalPages에 도달했을 때)
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 이전 영역의 첫 페이지가 보이도록
  const handlePrevClick = () => {
    const currentPages = getPageNumbers();
    const firstPage = currentPages[0];
    if (firstPage === 1) {
      onPageChange(1);
    } else {
      onPageChange(firstPage - 1);
    }
  };

  // 다음 영역의 첫 페이지가 보이도록
  const handleNextClick = () => {
    const currentPages = getPageNumbers();
    const lastPage = currentPages[currentPages.length - 1];
    if (lastPage === totalPages) {
      onPageChange(totalPages);
    } else {
      onPageChange(lastPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-6 flex justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="px-2"
      >
        이전
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
          className="px-2"
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-2"
      >
        다음
      </Button>
    </div>
  );
};

export default DynamicPagination;
