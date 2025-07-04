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
    const secretKey = process.env.TOSS_SECRET_KEY;

    if (
      !requestData.orderId ||
      !requestData.amount ||
      !requestData.paymentKey ||
      !secretKey
    ) {
      throw new Error('결제 데이터가 올바르지 않습니다.');
    }

    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    );

    const json = await response.json();

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
