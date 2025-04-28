'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import { PATH } from '@/constants/path.constants';
import { LoadingSpinner } from '../commons/loading-spinner';
import Nav from './nav';

// SearchBar를 클라이언트 사이드에서만 렌더링
const SearchBar = dynamic(() => import('./search-bar'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const Header = () => {
  const pathname = usePathname();

  // 로그인 페이지인지 체크
  const isSignInPage = pathname.includes(PATH.SIGNIN.substring(1));

  // 기타 인증 페이지인지 체크
  const isOtherAuthPage =
    pathname.includes(PATH.SIGNUP.substring(1)) ||
    pathname.includes(PATH.FORGOT_PASSWORD.substring(1)) ||
    pathname.includes(PATH.RESET_PASSWORD.substring(1));

  // 로그인 페이지에서는 무조건 헤더를 숨김
  if (isSignInPage) {
    return null;
  }

  // 인증 페이지일 때 로고만 있는 헤더 (모바일에서는 CSS로 숨김)
  if (isOtherAuthPage) {
    return (
      <header className="hidden h-[86px] w-full items-center justify-between gap-2 bg-gray-50 px-9 md:flex md:bg-white">
        <Link href={PATH.HOME} className="flex-shrink-0">
          <Image
            src="/logo/color_logo.png"
            alt="로고"
            width={116}
            height={61}
            priority
            className="object-cover"
          />
        </Link>
      </header>
    );
  }

  // 일반 페이지 헤더
  return (
    <header className="flex flex-col">
      <div className="flex h-[86px] w-full items-center justify-between gap-2 bg-white px-9">
        <div className="flex items-center gap-5 sm:gap-[42px]">
          <Link href={PATH.HOME} className="flex-shrink-0">
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={116}
              height={61}
              priority
              className="hidden object-cover sm:block"
            />
            <Image
              src="/logo/color_logo_single.png"
              alt="로고"
              width={28}
              height={28}
              priority
              className="block object-cover sm:hidden"
            />
          </Link>

          {/* 검색바 - 클라이언트 사이드에서만 렌더링 */}
          <div className="w-full sm:w-[357px]">
            <SearchBar />
          </div>
        </div>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
