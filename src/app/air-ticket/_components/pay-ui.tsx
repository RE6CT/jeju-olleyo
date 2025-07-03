'use client';

import useAuth from '@/lib/hooks/use-auth';
import useTossPayments from '@/lib/hooks/use-toss-payments';

/**
 * 결제 UI 컴포넌트
 * @param value - 금액
 * @param orderName - 주문 이름
 */
const PayUI = ({
  value,
  orderName,
  className,
}: {
  value: number;
  orderName: string;
  className?: string;
}) => {
  const { user } = useAuth();
  const { ready, requestPayment } = useTossPayments(user?.id, value);

  return (
    <div className={`wrapper ${className}`}>
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 결제하기 버튼 */}
        <button
          disabled={!ready}
          onClick={() => requestPayment(orderName)}
          className="w-full rounded-12 bg-secondary-400 px-2 py-[10px] text-white hover:bg-secondary-500"
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PayUI;
