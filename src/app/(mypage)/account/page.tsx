import ProfileInfo from './_components/account-profile-info';
import PersonalInfo from './_components/account-personal-info';
import SecurityInfo from './_components/account-security-info';
import { Suspense } from 'react';
import Loading from '@/app/loading';

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl">회원정보 수정</h2>
      <Suspense fallback={<Loading />}>
        <ul className="flex flex-col gap-10">
          <ProfileInfo />
          <PersonalInfo />
          <SecurityInfo />
        </ul>
      </Suspense>
    </div>
  );
};

export default AccountPage;
