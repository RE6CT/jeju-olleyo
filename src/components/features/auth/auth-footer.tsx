'use client';

import Link from 'next/link';
import { CardFooter } from '@/components/ui/card';
import { AuthFooterProps } from '@/types/auth.type';

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