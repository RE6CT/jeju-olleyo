import { useSearchParams } from 'next/navigation';

/**
 * URL 쿼리 파라미터에서 리다이렉트 경로를 가져오는 커스텀 훅
 * @returns 리다이렉트 경로 (기본값: '/')
 */
const useRedirectParams = (): string => {
  const searchParams = useSearchParams();
  return searchParams.get('redirectTo') || '/';
};

export default useRedirectParams;
