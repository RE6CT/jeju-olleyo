import { validateReservationData } from '@/lib/apis/flight/get-reservations.api';
import { fetchUpdateTicketStatusByOrderId } from '@/lib/apis/flight/update-reservations.api';
import { confirmPayment } from '@/lib/apis/pay/pay.api';
import { redirect } from 'next/navigation';

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

  try {
    if (!orderId || !amount || !paymentKey) {
      throw new Error('결제 데이터가 올바르지 않습니다.');
    }

    // 쿼리 파라미터에서 값이 결제 요청할 때 보낸 데이터와 동일한지 확인
    await validateReservationData(orderId, Number(amount));

    // 결제 승인 함수 호출
    await confirmPayment({ orderId, amount, paymentKey });

    // 결제 성공 시 티켓 상태를 결제 완료로 변경
    await fetchUpdateTicketStatusByOrderId(orderId);
  } catch (error) {
    console.error(`결제 실패: ${error}`);
    redirect(`/fail?message=${error}`);
  }

  return (
    <div>
      <h2>결제 성공</h2>
      <p>{`주문번호: ${orderId}`}</p>
      <p>{`결제 금액: ${Number(amount).toLocaleString()}원`}</p>
    </div>
  );
};

export default SuccessPage;
