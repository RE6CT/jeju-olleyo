'use client';

import useAuthStore from '@/zustand/auth.store';
import Image from 'next/image';
import React from 'react';

const AuthClientInfo = () => {
  const userClientInfo = useAuthStore((state) => state.user);
  return (
    <>
      {/* 클라이언트 데이터 */}
      <div className="mb-8 flex flex-col justify-center rounded-md bg-slate-100 p-6">
        <h2 className="mb-4 text-center text-xl font-semibold">
          클라이언트 사이드 데이터
        </h2>
        <div className="mb-4 flex justify-center">
          <Image
            src={userClientInfo?.avatar_url || '/images/default-profile.png'}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <p className="mb-2">이메일: {userClientInfo?.email}</p>
        <p className="mb-2">닉네임: {userClientInfo?.nickname}</p>
        <p className="mb-2">전화번호: {userClientInfo?.phone}</p>
      </div>
    </>
  );
};

export default AuthClientInfo;
