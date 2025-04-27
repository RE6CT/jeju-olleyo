import { Suspense } from 'react';

import Loading from '@/app/loading';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import PersonalInfo from './_components/_client/account-personal-info';
import ProfileInfo from './_components/_client/account-profile-info';
import SecurityInfo from './_components/_client/account-security-info';

export const metadata = {
  title: '마이페이지 - 회원정보 수정',
};

const AccountPage = async () => {
  const { user } = await fetchGetCurrentUser();

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-4 md:gap-7 lg:gap-9">
      <h2 className="bold-24 lg:semibold-28 hidden w-full md:block">
        회원정보 수정
      </h2>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col gap-2">
          <h3 className="semibold-18 md:hidden">프로필</h3>
          <ProfileInfo
            userId={user.id}
            nickname={user.nickname}
            profileImage={user.avatar_url}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="semibold-18 md:hidden">개인 정보</h3>
          <PersonalInfo
            userId={user.id}
            email={user.email ?? '이메일 없음'}
            phone={user.phone}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="semibold-18 md:hidden">보안</h3>
          <SecurityInfo userId={user.id} />
        </div>
      </Suspense>
    </div>
  );
};

export default AccountPage;
