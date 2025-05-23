import Link from 'next/link';

import { CardFooter } from '@/components/ui/card';
import { AuthFooterProps } from '@/types/auth.type';

/**
 * 인증 관련 페이지의 푸터 컴포넌트
 * @param question 질문 텍스트
 * @param linkText 링크 텍스트
 * @param linkHref 링크 URL
 */
const AuthFooter = ({ linkText, linkHref, onClick }: AuthFooterProps) => {
  return (
    <CardFooter className="flex justify-center">
      <div className="text-14 text-gray-600">
        <Link href={linkHref} onClick={onClick} className="text-secondary-300">
          {linkText}
        </Link>
      </div>
    </CardFooter>
  );
};

export default AuthFooter;
