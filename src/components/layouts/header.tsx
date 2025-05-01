'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PATH } from '@/constants/path.constants';
import Nav from './nav';
import { Suspense } from 'react';
import Loading from '@/app/loading';

// SearchBar를 클라이언트 사이드에서만 렌더링
const SearchBar = dynamic(() => import('./search-bar'), {
  ssr: false,
  loading: () => <Loading />,
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

  // 마이페이지인지 체크
  const isMyPage =
    pathname.includes(PATH.ACCOUNT.substring(1)) ||
    pathname.includes(PATH.BOOKMARKS.substring(1)) ||
    pathname.includes(PATH.LIKES.substring(1)) ||
    pathname.includes(PATH.COMMENTS.substring(1)) ||
    pathname.includes(PATH.RESERVATIONS.substring(1));

  // 장소상세페이지인지 체크
  const isPlaceDetailPage = pathname.includes(PATH.PLACES.substring(1));

  // 로그인 페이지에서는 무조건 헤더를 숨김
  if (isSignInPage) {
    return null;
  }

  // 인증 페이지일 때 로고만 있는 헤더 (모바일에서는 CSS로 숨김)
  if (isOtherAuthPage) {
    return (
      <header className="hidden h-[86px] w-full flex-col justify-between gap-2 bg-white px-[16px] pt-[51px] sm:px-[28px] sm:pt-0 md:flex md:px-[36px]">
        <Link
          href={PATH.HOME}
          className="flex h-full flex-shrink-0 items-center"
        >
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

  // 장소 상세 페이지 & 모바일이면 숨김 (md 이상에서는 보여줌)
  if (isPlaceDetailPage) {
    return (
      <header className="hidden flex-col md:flex">
        <div className="mb-[19px] mt-3 flex h-fit w-full items-center justify-between gap-2 bg-transparent px-4 md:my-0 md:h-[64px] md:bg-white md:px-7 lg:h-[86px] lg:px-9">
          <div className="flex items-center gap-[13px] md:gap-[30px] lg:gap-[42px]">
            <Link href={PATH.HOME} className="flex-shrink-0">
              <Image
                src="/logo/color_logo.png"
                alt="로고"
                width={116}
                height={61}
                priority
                className="hidden object-cover lg:block"
              />
              <Image
                src="/logo/color_logo.png"
                alt="로고"
                width={86.7}
                height={45.1}
                priority
                className="hidden object-cover md:block lg:hidden"
              />
            </Link>
            <div className="hidden w-[335px] md:block">
              <Suspense fallback={<Loading />}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
          <Nav />
        </div>
      </header>
    );
  }

  // 일반 페이지 헤더
  return (
    <header className={`${isMyPage ? 'hidden md:flex' : 'flex'} flex flex-col`}>
      <div className="mb-[19px] mt-3 flex h-fit w-full items-center justify-between gap-2 bg-transparent px-4 md:my-0 md:h-[64px] md:bg-white md:px-7 lg:h-[86px] lg:px-9">
        <div className="flex items-center gap-[13px] md:gap-[30px] lg:gap-[42px]">
          <Link href={PATH.HOME} className="flex-shrink-0">
            {/* 웹용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={116}
              height={61}
              priority
              className="hidden object-cover lg:block"
            />
            {/* 태블릿용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={86.7}
              height={45.1}
              priority
              className="hidden object-cover md:block lg:hidden"
            />
            {/* 모바일용 */}
            <Image
              src="/logo/color_logo.png"
              alt="로고"
              width={80.1}
              height={41}
              priority
              className="block object-cover md:hidden"
            />
          </Link>
          {/* 검색바 */}
          <div className="w-[310px] sm:w-[251px] md:w-[335px]">
            <Suspense fallback={<Loading />}>
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
