import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetReservationsByUserId } from '@/lib/apis/flight/get-reservations.api';
import ReservationsCard from './_components/_server/reservations-card';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import EmptyResult from '@/components/commons/empty-result-link';

const ReservationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { user } = await fetchGetCurrentUser();
  if (!user?.id) return null;

  const showAll = searchParams.showAll === 'true';

  const { data: reservations, count } = await fetchGetReservationsByUserId(
    user.id,
    showAll,
  );

  if (!reservations)
    throw new Error('항공권 예약 내역 로드 중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-[10px] md:gap-5">
      <section className="flex-col md:flex md:gap-2 lg:gap-4">
        <p className="medium-14 lg:medium-16 hidden text-secondary-300 md:block">
          {count}건의 예약 내역이 있어요
        </p>
        <h2 className="semibold-18 md:bold-24 lg:semibold-28 w-full">
          항공권 예약 내역
        </h2>
      </section>
      <div className="flex flex-col gap-12">
        {count === 0 ? (
          <div role="region" aria-label="예약한 항공권 없음">
            <EmptyResult
              buttonText="제주도 항공권 보러가기"
              href={`${PATH.TICKET}`}
              imagePath="/empty-result/empty_reservations.png"
            />
          </div>
        ) : (
          <section>
            <ul className="flex flex-col gap-5">
              {reservations.map((reservation) => (
                <li key={reservation.ticketId}>
                  <ReservationsCard reservation={reservation} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {!showAll && count !== 0 && (
          <Link
            href={`${PATH.RESERVATIONS}?showAll=true`}
            className="medium-14 m-auto w-fit rounded-12 border border-secondary-300 px-[65px] py-2 text-secondary-300"
          >
            지난 예약 내역 보기
          </Link>
        )}
        {showAll && count !== 0 && (
          <Link
            href={PATH.RESERVATIONS}
            className="medium-14 m-auto w-fit rounded-12 border border-secondary-300 px-[65px] py-2 text-secondary-300"
          >
            지난 예약 내역 접기
          </Link>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
