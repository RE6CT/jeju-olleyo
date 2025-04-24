import { EmptyResultLink } from '@/components/commons/empty-result-link';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';

export const metadata = {
  title: '마이페이지 - 항공권 예약 내역',
};

const ReservationsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex w-full min-w-[200px] max-w-[250px] flex-col items-center">
        <div className="w-full">
          <Image
            src="/character/sunglasses.png"
            alt="준비중"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
      <p className="semibold-20 text-gray-600">준비중인 페이지입니다.</p>
      <EmptyResultLink href={PATH.TICKET} text="항공권 검색하러 가기" />
    </div>
  );
};

export default ReservationsPage;
