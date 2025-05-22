import LikesList from './components/_client/likes-list';
import MypageDataCounts from '../_components/_client/mypage-data-counts';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import MypageActivitiesDropdown from '../_components/_client/mypage-activities-dropdown';

export const metadata = {
  title: '마이페이지 - 내가 좋아요한 일정',
};

const LikesPage = async () => {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-5">
      <Suspense fallback={<Loading />}>
        <MypageActivitiesDropdown pageType="likes" />
        <section className="hidden flex-col md:flex md:gap-2 lg:gap-4">
          <MypageDataCounts pageType="likes" />
          <h2 className="md:bold-24 lg:semibold-28 w-full">
            내가 좋아요한 일정
          </h2>
        </section>
        <LikesList />
      </Suspense>
    </div>
  );
};

export default LikesPage;
