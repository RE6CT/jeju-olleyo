import { useSearchParams } from 'next/navigation';

/**
 * URL 쿼리 파라미터에서 리다이렉트 경로를 가져오는 커스텀 훅
 *
 * @param {Object} options - 옵션 객체
 * @param {string} options.defaultPath - 기본 리다이렉트 경로 (기본값: '/')
 * @param {string} options.paramName - 리다이렉트 경로를 담고 있는 쿼리 파라미터 이름 (기본값: 'redirectTo')
 * @returns {string} 리다이렉트 경로
 */
const useRedirectParams = ({
  defaultPath = '/',
  paramName = 'redirectTo',
}: {
  defaultPath?: string;
  paramName?: string;
} = {}): string => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get(paramName) || defaultPath;

  return redirectPath;
};

export default useRedirectParams;
