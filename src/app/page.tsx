import { fetchGetCurrentUser } from '@/lib/apis/auth-server.api';
import Image from 'next/image';
import AuthClientInfo from '@/components/features/auth/auth-client-info';

const Home = async () => {
  // 서버 컴포넌트에서 사용자 정보 가져오기
  const { user } = await fetchGetCurrentUser();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center py-8">
      <h1 className="mb-6 text-3xl font-bold">
        안녕하세요, {user?.nickname || '비회원'}님
      </h1>

      {/* 서버 사이드 데이터 */}
      <div className="mb-8 flex flex-col justify-center rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 text-center text-xl font-semibold">
          서버 사이드 데이터
        </h2>
        <div className="mb-4 flex justify-center">
          <Image
            src={user?.avatar_url || '/images/default-profile.png'}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <p className="mb-2">이메일: {user?.email || 'example@example.com'}</p>
        <p className="mb-2">닉네임: {user?.nickname || '사용자'}</p>
        <p className="mb-2">전화번호: {user?.phone || '미등록'}</p>
      </div>

      {/* 클라이언트 사이드 유저정보 */}
      <AuthClientInfo />
    </div>
  );
};

export default Home;
