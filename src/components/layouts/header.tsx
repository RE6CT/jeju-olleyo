'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants/path.constants';

import Nav from './nav';
import SearchBar from './search-bar';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { LoadingSpinner } from '../commons/loading-spinner';

const Header = () => {
  const pathname = usePathname();
  const isWithoutHeaderComponent =
    pathname.includes(PATH.SIGNIN.substring(1)) ||
    pathname.includes(PATH.SIGNUP.substring(1)) ||
    pathname.includes(PATH.FORGOT_PASSWORD.substring(1)) ||
    pathname.includes(PATH.RESET_PASSWORD.substring(1));
  if (isWithoutHeaderComponent) {
    return (
      <header className="flex h-[86px] w-full flex-col items-center justify-between gap-2 bg-white px-[16px] pt-[51px] sm:px-[28px] sm:pt-0 md:px-[36px]">
        <Link href={PATH.HOME} className="flex-shrink-0">
          <Image
            src="/logo/color_logo.png"
            alt="로고"
            width={116}
            height={61}
            priority
            className="hidden object-cover sm:block"
          />
        </Link>
      </header>
    );
  }
  return (
    <header className="flex flex-col">
      <div className="flex h-[86px] w-full items-center justify-between gap-2 bg-white px-9">
        <div className="flex items-center gap-5 sm:gap-[42px]">
          <Link href={PATH.HOME} className="flex-shrink-0">
            {/* 웹용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={116}
              height={61}
              priority
              className="hidden object-cover md:block md:pr-[42px]"
            />
            {/* 태블릿용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={86.7}
              height={45.1}
              priority
              className="hidden object-cover sm:block sm:pr-[30px] md:hidden"
            />
            {/* 모바일용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={80.1}
              height={41}
              priority
              className="block object-cover sm:hidden"
            />
          </Link>

          {/* 검색바 */}
          <div className="w-[330px] sm:w-[251px] md:w-[335px]">
            <Suspense fallback={<LoadingSpinner />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
