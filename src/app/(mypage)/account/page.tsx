import ProfileInfo from './_components/account-profile-info';
import PersonalInfo from './_components/account-personal-info';
import SecurityInfo from './_components/account-security-info';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

const AccountPage = async () => {
  const { user } = await fetchGetCurrentUser();

  if (!user) return;

  return (
    <div className="flex w-full flex-col gap-9">
      <Suspense fallback={<Loading />}>
        <h2 className="semibold-28 w-full">회원정보 수정</h2>
        <ProfileInfo
          userId={user.id}
          nickname={user.nickname}
          profileImage={user.avatar_url}
        />
        <PersonalInfo email={user.email ?? '이메일 없음'} phone={user.phone} />
        <SecurityInfo userId={user.id} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
