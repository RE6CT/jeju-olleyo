const SuccessPage = ({
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

  // TODO: 결제 성공 로직 구현

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
