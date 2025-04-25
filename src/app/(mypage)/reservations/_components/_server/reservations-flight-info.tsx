import Image from 'next/image';

const ReservationsFlightInfo = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <figure className="relative h-[60px] w-[60px] overflow-hidden rounded-[4px]">
        <Image
          src="/images/default_profile.svg"
          alt="항공사 이름"
          fill
          className="object-cover"
        />
      </figure>
      <div>
        <span className="medium-12">25.03.22 | 3명</span>
        <div className="flex gap-2">
          <span className="semibold-16">오후 6:20</span>
          <span className="regular-16 text-secondary-300">김포</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationsFlightInfo;
