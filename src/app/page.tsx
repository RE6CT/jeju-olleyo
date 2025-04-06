import { getCurrentUser } from '@/lib/apis/auth-server.api';
import Image from 'next/image';

const Home = async () => {
  // 서버 컴포넌트에서 사용자 정보 가져오기
  const { user } = await getCurrentUser();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center py-8">
      <h1 className="mb-6 text-3xl font-bold">
        안녕하세요, {user?.nickname}님
      </h1>

      {/* 서버 사이드 데이터 */}
      <div className="mb-8 flex flex-col justify-center rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 text-center text-xl font-semibold">
          서버 사이드 데이터
        </h2>
        <div className="mb-4 flex justify-center">
          <Image
            src={user?.profileImage}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <p className="mb-2">이메일: {user?.email}</p>
        <p className="mb-2">닉네임: {user?.nickname}</p>
        <p className="mb-2">전화번호: {user?.phone}</p>
      </div>
    </div>
  );
};

export default Home;
