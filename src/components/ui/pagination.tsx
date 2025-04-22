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
  backgroundColor = 'secondary-300',
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  backgroundColor?: string;
}) => {
  if (totalPages <= 1) return null; // 페이지가 1개 이하면 렌더링 하지 않음

  return (
    <div className="mt-6 flex justify-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-6 w-6 items-center justify-center"
      >
        <LeftArrow />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`medium-12 flex h-6 w-6 items-center justify-center rounded-full text-gray-500 ${currentPage === index + 1 ? `bg-${backgroundColor} text-white` : 'transparent'}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-6 w-6 items-center justify-center"
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default Pagination;

const LeftArrow = ({
  size = 16,
  fill = 'gray-500',
}: {
  size?: number;
  fill?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3809 26.6274C12.8169 26.0632 12.5 25.298 12.5 24.5002C12.5 23.7024 12.8169 22.9373 13.3809 22.3731L30.4011 5.35288C30.9686 4.80482 31.7286 4.50156 32.5174 4.50841C33.3063 4.51527 34.0609 4.83169 34.6188 5.38953C35.1766 5.94737 35.493 6.70199 35.4999 7.49086C35.5067 8.27973 35.2035 9.03973 34.6554 9.60718L19.7624 24.5002L34.6554 39.3933C35.2035 39.9608 35.5067 40.7208 35.4999 41.5096C35.493 42.2985 35.1766 43.0531 34.6188 43.611C34.0609 44.1688 33.3063 44.4852 32.5174 44.4921C31.7286 44.4989 30.9686 44.1957 30.4011 43.6476L13.3809 26.6274Z"
        fill="black"
        className={`fill-${fill}`}
      />
    </svg>
  );
};

const RightArrow = ({
  size = 16,
  fill = 'gray-500',
}: {
  size?: number;
  fill?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.6191 22.3726C35.1831 22.9368 35.5 23.702 35.5 24.4998C35.5 25.2976 35.1831 26.0627 34.6191 26.6269L17.5989 43.6471C17.0314 44.1952 16.2714 44.4984 15.4826 44.4916C14.6937 44.4847 13.9391 44.1683 13.3812 43.6105C12.8234 43.0526 12.507 42.298 12.5001 41.5091C12.4933 40.7203 12.7965 39.9603 13.3446 39.3928L28.2376 24.4998L13.3446 9.60669C12.7965 9.03924 12.4933 8.27924 12.5001 7.49037C12.507 6.70149 12.8234 5.94688 13.3812 5.38904C13.9391 4.8312 14.6937 4.51478 15.4826 4.50793C16.2714 4.50107 17.0314 4.80433 17.5989 5.35239L34.6191 22.3726Z"
        fill="black"
        className={`fill-${fill}`}
      />
    </svg>
  );
};
