import { useEffect, useState } from 'react';
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

/**
 * 토스 결제 시스템 관련 훅
 * @param customerKey - 결제 요청 사용자의 UUID
 * @param value - 결제 금액
 */
const useTossPayments = (customerKey: string | undefined, value: number) => {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value,
  });
  const [ready, setReady] = useState(false);

  // 위젯 초기화
  useEffect(() => {
    if (!customerKey || !clientKey) return;

    const fetchPaymentWidgets = async () => {
      try {
        // SDK 초기화
        const tossPayments = await loadTossPayments(clientKey);

        // 위젯 초기화
        const widgets = tossPayments.widgets({
          customerKey,
        });

        setWidgets(widgets);
      } catch (error) {
        console.error('토스페이먼츠 위젯 초기화 중 에러 발생:', error);
      }
    };

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  // 결제 UI 렌더링
  useEffect(() => {
    const renderPaymentWidgets = async () => {
      // 위젯이 로드되지 않았다면 실행하지 않기
      if (!widgets) return;

      // 위젯의 결제 금액을 결제하려는 금액으로 초기화
      await widgets.setAmount(amount);

      // 결제 UI 렌더링
      await widgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });

      // 이용약관 UI 렌더링
      await widgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });

      setReady(true);
    };

    renderPaymentWidgets();
  }, [widgets]);

  /**
   * 결제를 요청하는 함수
   * @param orderName - 주문 이름
   */
  const requestPayment = async (orderName: string, orderId: string) => {
    if (!widgets) {
      return;
    }

    try {
      await widgets.requestPayment({
        orderId,
        orderName,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { ready, requestPayment };
};

export default useTossPayments;
