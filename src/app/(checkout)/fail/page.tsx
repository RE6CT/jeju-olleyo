import { PATH } from '@/constants/path.constants';
import Image from 'next/image';
import Link from 'next/link';

const FailPage = ({
  searchParams,
}: {
  searchParams: {
    message?: string;
  };
}) => {
  const { message } = searchParams;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <Image
        src="/character/sad.png"
        alt="결제 실패"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[120px]"
      />
      <div className="flex flex-col items-center gap-2 px-8">
        <h3 className="semibold-24 text-gray-700">결제에 실패했습니다.</h3>
        <p className="regular-16 text-description">{message}</p>
      </div>
      <Link
        href={PATH.TICKET}
        className="regular-16 rounded-24 bg-secondary-400 px-4 py-[10px] text-white hover:bg-secondary-500"
      >
        항공권 예약 바로가기
      </Link>
    </div>
  );
};

export default FailPage;
