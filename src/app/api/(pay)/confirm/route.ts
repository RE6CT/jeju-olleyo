import { NextRequest, NextResponse } from 'next/server';

/**
 * 토스 페이먼츠 결제를 요청하는 API 라우트
 * @param request.paymentKey - 결제 키
 * @param request.orderId - 주문 ID
 * @param request.amount - 결제 금액 정보
 */
export async function POST(request: NextRequest) {
  try {
    // 클라이언트에서 받은 JSON 요청 바디
    const { paymentKey, orderId, amount } = await request.json();

    const widgetSecretKey = process.env.TOSS_SECRET_KEY;
    const encryptedSecretKey =
      'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');

    // 토스페이먼츠 API로 결제 승인 요청
    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          Authorization: encryptedSecretKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          amount: amount,
          paymentKey: paymentKey,
        }),
      },
    );

    const responseData = await response.json();

    if (response.ok) {
      // TODO: 결제 성공 로직
      return NextResponse.json(responseData, { status: response.status });
    } else {
      // TODO: 결제 실패 로직
      return NextResponse.json(responseData, { status: response.status });
    }
  } catch (error) {
    console.error('결제 승인 API 에러:', error);
    return NextResponse.json(
      {
        message: '서버 오류가 발생했습니다',
        code: 'SERVER_ERROR',
      },
      { status: 500 },
    );
  }
}
