const ReservationsPage = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">0건의 예약 내역이 있어요</p>
        <h2 className="semibold-28 w-full">항공권 예약 내역</h2>
      </div>
      {/* 여기에 예약 내역 리스트 */}
    </div>
  );
};

export default ReservationsPage;
