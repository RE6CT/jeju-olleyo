import { useEffect, useState } from 'react';
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '';

const useTossPayments = (customerKey: string, value: number) => {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value,
  });
  const [ready, setReady] = useState(false);

  // 위젯 초기화
  useEffect(() => {
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
      if (widgets == null) {
        return;
      }

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
   * 주문서의 결제 금액이 변경되었을 경우 결제 금액을 업데이트하는 함수
   * @param value - 바뀐 결제 금액
   */
  const updateAmount = async (value: number) => {
    if (widgets === null) {
      return;
    }
    setAmount({ ...amount, value });
    await widgets.setAmount(amount);
  };
};

export default useTossPayments;
