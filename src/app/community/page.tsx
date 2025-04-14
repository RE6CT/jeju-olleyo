import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';

const Community = () => {
  return (
    <>
      <JejuBanner
        imageUrl="/images/jeju-banner.png"
        title="나만의 제주 여행 계획하기"
        buttonText="내 일정 만들러 가기"
        buttonUrl={PATH.PLAN_NEW}
      />
    </>
  );
};

export default Community;
