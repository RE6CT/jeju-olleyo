import { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';

const useTossPayments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    /**
     * 토스 페이먼츠 SDK 초기화 함수
     */
    const fetchPaymentWidgets = async () => {
      try {
        // SDK 초기화
        const tossPayments = await loadTossPayments(
          process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '',
        );
      } catch (err) {
        console.error('토스페이먼츠 SDK 초기화 중 에러 발생:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentWidgets();
  }, []);

  return {
    isLoading,
    isError,
  };
};

export default useTossPayments;
