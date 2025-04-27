import { ArrowLeft, ArrowRight } from '../icons/arrow-icon';

/**
 * 페이지네이션 컴포넌트
 * @param currentPage - 현재 페이지
 * @param totalPages - 총 페이지 수
 * @param onPageChange - 페이지 변경 시 실행될 함수
 * @param backgroundColor - 선택된 페이지 배경 색깔
 * @param hideOnSinglePage - 페이지가 한개 있을 때 컴포넌트 숨길지 여부
 *
 * @example
 * ```tsx
 * <Pagination currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)} />
 * ```
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  backgroundColor = 'secondary-300',
  hideOnSinglePage = true,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  backgroundColor?: string;
  hideOnSinglePage?: boolean;
}) => {
  if (hideOnSinglePage && totalPages <= 1) return null; // 페이지가 1개 이하면 렌더링 하지 않음

  return (
    <div className="mt-3 flex justify-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-6 w-6 items-center justify-center"
      >
        <ArrowLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`medium-12 flex h-6 w-6 items-center justify-center rounded-full ${currentPage === index + 1 ? `bg-${backgroundColor} text-white` : 'text-gray-500'}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-6 w-6 items-center justify-center"
      >
        <ArrowRight size={16} fill="gray-500" />
      </button>
    </div>
  );
};

export default Pagination;
