import ProfileInfo from './_components/account-profile-info';
import PersonalInfo from './_components/account-personal-info';
import SecurityInfo from './_components/account-security-info';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

// TODO - 이메일 없을 경우 하드코딩 제거
const AccountPage = async () => {
  const { user } = await fetchGetCurrentUser();

  if (!user) return;

  return (
    <div className="flex w-full flex-col gap-5">
      <Suspense fallback={<Loading />}>
        <h2 className="w-full text-2xl">회원정보 수정</h2>
        <ProfileInfo
          nickname={user.nickname}
          profileImage={user.avatar_url}
          provider={user.provider}
        />
        <PersonalInfo email={user.email ?? '이메일 없음'} phone={user.phone} />
        <SecurityInfo provider={user.provider} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
