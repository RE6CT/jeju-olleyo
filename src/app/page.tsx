import { getCurrentUser } from '@/lib/apis/auth-server.api';

const Home = async () => {
  const { user } = await getCurrentUser();

  // 사용자 데이터 활용
  const nickname = user?.user_metadata?.nickname;
  const email = user?.user_metadata?.email;
  const phone = user?.user_metadata?.phone;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center py-8">
      <h1 className="mb-6 text-3xl font-bold">안녕하세요, {nickname}님</h1>
      <p className="mb-4">대시보드에 오신 것을 환영합니다.</p>
      <p className="mb-4">이메일: {email}</p>
      <p className="mb-4">전화번호: {phone}</p>
    </div>
  );
}

export default Home;
