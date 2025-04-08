import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '@/constants/auth.constants';

/**
 * 이메일 저장 기능을 위한 커스텀 훅
 *
 * @returns {Object} 이메일 저장 관련 상태와 함수들
 */
const useRememberEmail = () => {
  const [savedEmail, setSavedEmail] = useState<string>('');
  const [rememberEmail, setRememberEmail] = useState<boolean>(false);

  // 컴포넌트 마운트 시 로컬 스토리지에서 저장된 이메일과 설정 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem(STORAGE_KEY.SAVED_EMAIL);
      const shouldRemember =
        localStorage.getItem(STORAGE_KEY.REMEMBER_EMAIL) === 'true';

      if (rememberedEmail && shouldRemember) {
        setSavedEmail(rememberedEmail);
        setRememberEmail(true);
      }
    }
  }, []);

  /**
   * 이메일 저장 처리 함수
   * @param email 저장할 이메일
   * @param remember 저장 여부
   */
  const handleSaveEmail = (email: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem(STORAGE_KEY.REMEMBER_EMAIL, 'true');
      localStorage.setItem(STORAGE_KEY.SAVED_EMAIL, email);
    } else {
      localStorage.removeItem(STORAGE_KEY.REMEMBER_EMAIL);
      localStorage.removeItem(STORAGE_KEY.SAVED_EMAIL);
    }
  };

  return {
    savedEmail,
    rememberEmail,
    handleSaveEmail,
  };
};

export default useRememberEmail;
