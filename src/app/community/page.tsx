import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import Duration from '@/components/commons/duration';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { data } from './mock-data';

const Community = async () => {
  const user = await fetchGetCurrentUser();
  const userId = user.user?.id;

  return (
    <>
      <JejuBanner
        imageUrl="/images/jeju-banner.png"
        title="나만의 제주 여행 계획하기"
        buttonText="내 일정 만들러 가기"
        buttonUrl={PATH.PLAN_NEW}
      />
      <div className="flex w-full max-w-[1024px] flex-col gap-3 p-9">
        <h2 className="semibold-22">올레 인기 일정</h2>
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
          {data.map((plan) => (
            <Link href="/">
              <div className="aspect-[310/216] rounded-12 bg-gray-100" />
              <div className="flex flex-col gap-1 p-2">
                <p className="medium-16 line-clamp-1">{plan.title}</p>
                <p className="regular-14 text-description line-clamp-2">
                  {plan.content}
                </p>
                <div className="medium-12 flex gap-2 text-gray-500">
                  <span>{plan.nickname}</span>
                  <Duration
                    start={plan.startDate}
                    end={plan.endDate}
                    separator="-"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
