import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <>
      <div>페이지를 찾을 수 없어요.</div>
      <Link href={PATH.HOME}>홈으로 돌아가기</Link>
    </>
  );
};

export default NotFound;
