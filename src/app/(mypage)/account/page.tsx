import { Suspense } from 'react';

import Loading from '@/app/loading';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import PersonalInfo from './_components/account-personal-info';
import ProfileInfo from './_components/account-profile-info';
import SecurityInfo from './_components/account-security-info';

const AccountPage = async () => {
  const { user } = await fetchGetCurrentUser();

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-9">
      <h2 className="semibold-28 w-full">회원정보 수정</h2>
      <Suspense fallback={<Loading />}>
        <ProfileInfo
          userId={user.id}
          nickname={user.nickname}
          profileImage={user.avatar_url}
        />
        <PersonalInfo
          userId={user.id}
          email={user.email ?? '이메일 없음'}
          phone={user.phone}
        />
        <SecurityInfo userId={user.id} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
