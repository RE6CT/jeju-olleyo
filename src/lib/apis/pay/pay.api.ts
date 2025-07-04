import { redirect } from 'next/navigation';

/**
 * 결제 승인을 처리하는 함수
 * @param requestData.orderId - 주문 ID
 * @param requestData.amount - 결제 금액 정보
 * @param requestData.paymentKey - 결제 키
 */
export const confirmPayment = async (requestData: {
  orderId?: string;
  amount?: string;
  paymentKey?: string;
}) => {
  try {
    if (
      !requestData.orderId ||
      !requestData.amount ||
      !requestData.paymentKey
    ) {
      throw new Error();
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    );

    const json = await response.json();
    console.log(response.statusText);

    if (!response.ok) {
      // 결제 실패 시 실패 페이지로 리다이렉트
      redirect(`/fail?message=${json.message}&code=${json.code}`);
    }

    return json;
  } catch (error) {
    console.error('결제 승인 처리 중 에러 발생:', error);
    redirect('/fail?message=서버 오류가 발생했습니다&code=SERVER_ERROR');
  }
};
