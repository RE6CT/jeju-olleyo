import ProfileInfo from './_components/account-profile-info';
import PersonalInfo from './_components/account-personal-info';
import SecurityInfo from './_components/account-security-info';

const AccountPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl">회원정보 수정</h2>
      <ul className="flex flex-col gap-10">
        <ProfileInfo />
        <PersonalInfo />
        <SecurityInfo />
      </ul>
    </div>
  );
};

export default AccountPage;
