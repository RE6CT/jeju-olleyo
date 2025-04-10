import { useState, useEffect } from 'react';

/**
 * 쿠키에서 provider 값을 가져오는 커스텀 훅
 * @param {string | undefined} userId - 사용자 ID (의존성 배열에 사용)
 * @returns {string | undefined} provider 값
 *
 * @example
 * ``` typescript
 * const provider = useProviderFromCookie(userId);
 * ```
 */
const useProviderFromCookie = (userId: string) => {
  const [provider, setProvider] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getCookieValue = (name: string): string | undefined => {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];
    };

    const providerValue = getCookieValue('provider');
    setProvider(providerValue);
  }, [userId]);

  return provider;
};

export default useProviderFromCookie;
