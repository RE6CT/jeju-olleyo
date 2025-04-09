import ProfileInfo from './_components/account-profile-info';
import PersonalInfo from './_components/account-personal-info';
import SecurityInfo from './_components/account-security-info';
import { Suspense } from 'react';
import Loading from '@/app/loading';

const AccountPage = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <Suspense fallback={<Loading />}>
        <h2 className="w-full text-2xl">회원정보 수정</h2>
        <ProfileInfo />
        <PersonalInfo />
        <SecurityInfo />
      </Suspense>
    </div>
  );
};

export default AccountPage;
