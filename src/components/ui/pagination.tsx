import { Button } from '@/components/ui/button';

/**
 * 페이지네이션 컴포넌트
 * @param currentPage - 현재 페이지
 * @param totalPages - 총 페이지 수
 * @param onPageChange - 페이지 변경 시 실행될 함수
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
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null; // 페이지가 1개 이하면 렌더링 하지 않음

  return (
    <div className="mt-6 flex justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          variant={currentPage === index + 1 ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </div>
  );
};

export default Pagination;
