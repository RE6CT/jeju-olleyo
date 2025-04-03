'use client';

import Link from 'next/link';
import { CardFooter } from '@/components/ui/card';
import { AuthFooterProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 푸터 컴포넌트
 *
 * @param question 질문 텍스트
 * @param linkText 링크 텍스트
 * @param linkHref 링크 URL
 */

const AuthFooter = ({ question, linkText, linkHref }: AuthFooterProps) => {
  return (
    <CardFooter className="flex justify-center">
      <div className="text-sm text-gray-600">
        {question}{' '}
        <Link href={linkHref} className="text-blue-600 hover:text-blue-800">
          {linkText}
        </Link>
      </div>
    </CardFooter>
  );
};

export default AuthFooter;
