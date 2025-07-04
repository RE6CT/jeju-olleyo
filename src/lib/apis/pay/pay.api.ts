/**
 * 결제 승인을 처리하는 함수
 * @param requestData.orderId - 주문 ID
 * @param requestData.amount - 결제 금액 정보
 * @param requestData.paymentKey - 결제 키
 */
export const confirmPayment = async (requestData: {
  orderId: string;
  amount: string;
  paymentKey: string;
}) => {
  const widgetSecretKey = process.env.TOSS_SECRET_KEY;
  const encryptedSecretKey =
    'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');

  if (!widgetSecretKey) {
    throw new Error('결제 위젯 키가 올바르지 않습니다.');
  }

  const response = await fetch(
    'https://api.tosspayments.com/v1/payments/confirm',
    {
      method: 'POST',
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    },
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
};
