import { confirmPayment } from '@/lib/apis/pay/pay.api';

const SuccessPage = async ({
  searchParams,
}: {
  searchParams: {
    orderId?: string;
    amount?: string;
    paymentKey?: string;
  };
}) => {
  const { orderId, amount, paymentKey } = searchParams;

  // TODO: 쿼리 파라미터에서 값이 결제 요청할 때 보낸 데이터와 동일한지 확인

  const requestData = {
    orderId,
    amount,
    paymentKey,
  };

  // 결제 승인 함수 호출
  await confirmPayment(requestData);

  // TODO: 결제 성공 로직 추가

  return (
    <div>
      <h2>결제 성공</h2>
      <p>{`주문번호: ${orderId}`}</p>
      <p>{`결제 금액: ${Number(amount).toLocaleString()}원`}</p>
      <p>{`paymentKey: ${paymentKey}`}</p>
    </div>
  );
};

export default SuccessPage;
