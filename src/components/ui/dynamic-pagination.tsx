import { ArrowLeft, ArrowRight } from '../icons/arrow-icon';

/**
 * 동적 영역을 갖는 페이지네이션 컴포넌트
 * @param currentPage - 현재 페이지
 * @param totalPages - 총 페이지 수
 * @param onPageChange - 페이지 변경 시 실행될 함수
 * @param maxVisiblePages - 최대 보이는 페이지 수
 * @param backgroundColor - 버튼 배경색
 *
 * @example
 * ```tsx
 * <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)} />
 * ```
 */
const DynamicPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 3,
  backgroundColor = 'secondary-300',
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  backgroundColor?: string;
}) => {
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
    <div className="mt-3 flex justify-center gap-3">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="flex h-6 w-6 items-center justify-center"
      >
        <ArrowLeft size={16} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`medium-12 flex h-6 w-6 items-center justify-center rounded-full text-gray-500 ${currentPage === page ? `bg-${backgroundColor} text-white` : 'transparent'}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="flex h-6 w-6 items-center justify-center"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default DynamicPagination;
