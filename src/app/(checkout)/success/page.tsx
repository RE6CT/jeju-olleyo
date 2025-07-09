import { PATH } from '@/constants/path.constants';
import { validateReservationData } from '@/lib/apis/flight/get-reservations.api';
import { fetchUpdateTicketStatusByOrderId } from '@/lib/apis/flight/update-reservations.api';
import { confirmPayment } from '@/lib/apis/pay/pay.api';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <Image
        src="/character/happy.png"
        alt="결제 성공"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[120px]"
      />
      <h3 className="semibold-24">성공적으로 결제되었습니다.</h3>
      <div className="flex flex-col items-center justify-center gap-3 rounded-16 border border-gray-100 bg-white p-4">
        <div className="flex flex-col items-center">
          <p className="medium-16 text-gray-800">주문번호</p>
          <p className="regular-14 text-description">{orderId}</p>
        </div>
        <div>
          <p className="medium-16 text-gray-800">결제 금액</p>
          <p className="regular-14 text-description">
            {Number(amount).toLocaleString()}원
          </p>
        </div>
      </div>
      <Link
        href={PATH.RESERVATIONS}
        className="regular-16 rounded-24 bg-secondary-400 px-4 py-[10px] text-white hover:bg-secondary-500"
      >
        예약 내역 확인하기
      </Link>
    </div>
  );
};

export default SuccessPage;
