import { useState, useEffect } from 'react';

import { STORAGE_KEY } from '@/constants/auth.constants';

/**
 * 이메일 저장 기능을 위한 커스텀 훅
 */
const useRememberEmail = () => {
  const [savedEmail, setSavedEmail] = useState<string>('');

  // 컴포넌트 마운트 시 로컬 스토리지에서 저장된 이메일 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
      const shouldRemember =
        localStorage.getItem(STORAGE_KEY.REMEMBER_EMAIL) === 'true';

      if (rememberedEmail && shouldRemember) {
        setSavedEmail(rememberedEmail);
      }
    }
  }, []);

  return {
    savedEmail,
  };
};

export default useRememberEmail;
