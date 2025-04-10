'use client';

import useAuthStore from '@/zustand/auth.store';
import Image from 'next/image';

/**
 * 클라이언트 측 사용자 정보를 표시하는 컴포넌트
 */
const AuthClientInfo = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="mb-8 flex flex-col justify-center rounded-md bg-slate-100 p-6">
      <h2 className="mb-4 text-center text-xl font-semibold">
        클라이언트 사이드 데이터
      </h2>
      <div className="mb-4 flex justify-center">
        <Image
          src={user.avatar_url || '/images/default-profile.png'}
          alt="User Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <p className="mb-2">이메일: {user.email || 'example@example.com'}</p>
      <p className="mb-2">닉네임: {user.nickname || '사용자'}</p>
      <p className="mb-2">전화번호: {user.phone || '미등록'}</p>
    </div>
  );
};

export default AuthClientInfo;
