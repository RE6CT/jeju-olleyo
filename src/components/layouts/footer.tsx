'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * 웹사이트 푸터 컴포넌트
 * 로고, 개발자 정보, 디자이너 및 튜터 정보를 표시합니다.
 * 모바일과 태블릿/데스크탑에 최적화된 반응형 레이아웃 제공.
 */
const Footer = () => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (!isHomePage) {
    return null;
  }

  return (
    <>
      {/* 모바일 레이아웃 */}
      <footer className="flex h-[342px] w-full shrink-0 flex-col items-start gap-[11px] bg-gray-50 px-4 py-5 md:hidden">
        {/* 로고 및 카피라이트 */}
        <div className="flex flex-col items-start gap-1 self-stretch">
          <img
            src="/logo/color_logo.png"
            alt="Logo"
            className="flex aspect-[40/21] w-20 items-center justify-center gap-[0.867px]"
          />
          <p className="medium-12 self-stretch text-gray-600">
            2025 리왹트. All rights reserved.
          </p>
        </div>

        {/* 개발자 */}
        <div className="flex flex-col items-start gap-[11px] self-stretch border-b border-t border-solid border-b-gray-200 border-t-gray-200 px-0 pb-4 pt-2.5">
          <h3 className="medium-12 text-gray-600">개발자</h3>
          <div className="flex flex-wrap content-start items-start gap-[10px_50px] self-stretch">
            <div className="flex w-[53px] items-center gap-2">
              <span className="regular-10 flex-[1_0_0] text-gray-600">
                민정현
              </span>
              <Link
                href="https://github.com/Eletsia"
                className="flex h-4 w-[17px] shrink-0 items-center justify-center pb-[1.217px] pl-[2.013px] pr-[1.397px] pt-0.5"
              >
                <img src="/icons/github-icon.svg" alt="GitHub" />
              </Link>
            </div>
            <div className="flex w-[53px] items-center gap-2">
              <span className="regular-10 flex-[1_0_0] text-gray-600">
                조영현
              </span>
              <Link
                href="https://github.com/joyounghyun550"
                className="flex h-4 w-[17px] shrink-0 items-center justify-center pb-[1.217px] pl-[2.013px] pr-[1.397px] pt-0.5"
              >
                <img src="/icons/github-icon.svg" alt="GitHub" />
              </Link>
            </div>
            <div className="flex w-[53px] items-center gap-2">
              <span className="regular-10 flex-[1_0_0] text-gray-600">
                강푸른
              </span>
              <Link
                href="https://github.com/PureunKang"
                className="flex h-4 w-[17px] shrink-0 items-center justify-center pb-[1.217px] pl-[2.013px] pr-[1.397px] pt-0.5"
              >
                <img src="/icons/github-icon.svg" alt="GitHub" />
              </Link>
            </div>
            <div className="flex w-[53px] items-center gap-2">
              <span className="regular-10 flex-[1_0_0] text-gray-600">
                고용준
              </span>
              <Link
                href="https://github.com/mbdyjk"
                className="flex h-4 w-[17px] shrink-0 items-center justify-center pb-[1.217px] pl-[2.013px] pr-[1.397px] pt-0.5"
              >
                <img src="/icons/github-icon.svg" alt="GitHub" />
              </Link>
            </div>
            <div className="flex w-[53px] items-center gap-2">
              <span className="regular-10 flex-[1_0_0] text-gray-600">
                이소흔
              </span>
              <Link
                href="https://github.com/sohxxny"
                className="flex h-4 w-[17px] shrink-0 items-center justify-center pb-[1.217px] pl-[2.013px] pr-[1.397px] pt-0.5"
              >
                <img src="/icons/github-icon.svg" alt="GitHub" />
              </Link>
            </div>
          </div>
        </div>

        {/* 디자이너 섹션 */}
        <div className="flex items-center gap-2 self-stretch border-b border-solid border-b-gray-200 pb-4">
          <div className="flex w-[186px] flex-col items-start gap-[11px]">
            <h3 className="medium-12 w-[70px] text-gray-600">디자이너</h3>
            <div className="flex items-start gap-[50px] self-stretch">
              <div className="flex w-[53px] items-center gap-2.5">
                <span className="regular-10 text-gray-600">유진희</span>
              </div>
              <div className="flex w-[53px] items-center gap-2.5">
                <span className="regular-10 text-gray-600">최시현</span>
              </div>
            </div>
          </div>
        </div>

        {/* 튜터 섹션 */}
        <div className="flex items-center gap-2 self-stretch pb-4">
          <div className="flex w-[186px] flex-col items-start gap-[11px]">
            <h3 className="medium-12 w-[70px] text-gray-600">튜터</h3>
            <div className="flex items-start gap-[50px] self-stretch">
              <div className="flex w-[53px] items-center gap-2.5">
                <span className="regular-10 text-gray-600">김병연</span>
              </div>
              <div className="flex w-[53px] items-center gap-2.5">
                <span className="regular-10 text-gray-600">박가현</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* 데스크탑/태블릿 레이아웃 */}
      <footer className="hidden w-full bg-gray-50 md:flex md:flex-row md:items-center md:justify-center md:gap-[75px] md:px-[27px] md:py-[24px] lg:gap-[100px] lg:py-8 lg:pl-9 lg:pr-[123px]">
        {/* 로고 및 카피라이트 - 세로 중앙 정렬 */}
        <div className="md:flex md:h-auto md:w-[184px] md:shrink-0 md:items-start md:justify-center lg:h-[189px] lg:w-[244px] lg:px-0 lg:py-[42.5px]">
          <div className="md:flex md:w-full md:flex-col md:items-start md:gap-1.5 lg:w-[244px] lg:shrink-0 lg:items-start lg:gap-2 lg:self-stretch lg:pr-11">
            <div className="md:flex md:w-[108px] md:items-center md:justify-center lg:h-[75px] lg:gap-[1.548px]">
              <img
                src="/logo/color_logo.png"
                alt="Logo"
                className="md:mx-auto"
              />
            </div>
            <p className="md:medium-10 lg:medium-14 text-gray-600 md:text-center">
              2025 리왹트. All rights reserved.
            </p>
          </div>
        </div>
        <div className="gap-5 md:flex md:w-[400px] md:shrink-0 md:flex-col md:items-start lg:h-[126px] lg:w-[521px] lg:justify-center lg:gap-[27px]">
          {/* 개발자 - 5명이 한 줄로 정렬 */}
          <div className="md:flex md:items-center md:gap-8 md:self-stretch lg:h-6 lg:shrink-0 lg:items-start lg:gap-[54px]">
            <h3 className="md:semibold-12 lg:semibold-16 text-gray-600 md:w-[39.051px] md:flex-shrink-0 lg:w-[42px]">
              개발자
            </h3>
            <div className="md:flex md:flex-row md:items-center md:gap-6 lg:h-[21px] lg:w-[425px] lg:justify-center lg:gap-[30px]">
              <div className="md:flex md:items-center md:gap-1 lg:h-[21px] lg:w-[61px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-1">
                <span className="md:medium-10 lg:medium-14 text-gray-600">
                  민정현
                </span>
                <Link
                  href="https://github.com/Eletsia"
                  className="md:aspect-[1/1] md:h-4 md:w-4 lg:h-5 lg:w-5"
                >
                  <img src="/icons/github-icon.svg" alt="GitHub" />
                </Link>
              </div>
              <div className="md:flex md:items-center md:gap-1 lg:h-[21px] lg:w-[61px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-1">
                <span className="md:medium-10 lg:medium-14 text-gray-600">
                  조영현
                </span>
                <Link
                  href="https://github.com/joyounghyun550"
                  className="md:aspect-[1/1] md:h-4 md:w-4 lg:h-5 lg:w-5"
                >
                  <img src="/icons/github-icon.svg" alt="GitHub" />
                </Link>
              </div>
              <div className="md:flex md:items-center md:gap-1 lg:h-[21px] lg:w-[61px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-1">
                <span className="md:medium-10 lg:medium-14 text-gray-600">
                  강푸른
                </span>
                <Link
                  href="https://github.com/PureunKang"
                  className="md:aspect-[1/1] md:h-4 md:w-4 lg:h-5 lg:w-5"
                >
                  <img src="/icons/github-icon.svg" alt="GitHub" />
                </Link>
              </div>
              <div className="md:flex md:items-center md:gap-1 lg:h-[21px] lg:w-[61px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-1">
                <span className="md:medium-10 lg:medium-14 text-gray-600">
                  고용준
                </span>
                <Link
                  href="https://github.com/mbdyjk"
                  className="md:aspect-[1/1] md:h-4 md:w-4 lg:h-5 lg:w-5"
                >
                  <img src="/icons/github-icon.svg" alt="GitHub" />
                </Link>
              </div>
              <div className="md:flex md:items-center md:gap-1 lg:h-[21px] lg:w-[61px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-1">
                <span className="md:medium-10 lg:medium-14 text-gray-600">
                  이소흔
                </span>
                <Link
                  href="https://github.com/sohxxny"
                  className="md:aspect-[1/1] md:h-4 md:w-4 lg:h-5 lg:w-5"
                >
                  <img src="/icons/github-icon.svg" alt="GitHub" />
                </Link>
              </div>
            </div>
          </div>

          {/* 디자이너 섹션 */}
          <div className="md:flex md:w-[180px] md:items-center md:justify-start md:gap-5 lg:h-6 lg:w-[230px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-10">
            <h3 className="md:semibold-12 lg:semibold-16 text-gray-600 md:w-[52.568px] md:flex-shrink-0 lg:w-[56px]">
              디자이너
            </h3>
            <div className="md:flex md:items-center md:gap-11 lg:h-[21px] lg:w-[134px] lg:shrink-0 lg:items-start lg:gap-[55px] lg:pr-[5px]">
              <span className="md:medium-10 lg:medium-14 text-gray-600">
                유진희
              </span>
              <span className="md:medium-10 lg:medium-14 text-gray-600">
                최시현
              </span>
            </div>
          </div>

          {/* 튜터 섹션 */}
          <div className="md:flex md:w-[180px] md:items-center md:justify-start md:gap-5 lg:h-6 lg:w-[230px] lg:shrink-0 lg:items-start lg:justify-center lg:gap-10">
            <h3 className="md:semibold-12 lg:semibold-16 text-gray-600 md:w-[52.568px] md:flex-shrink-0 lg:w-[56px]">
              튜터
            </h3>
            <div className="md:flex md:items-center md:gap-11 lg:h-[21px] lg:w-[134px] lg:shrink-0 lg:items-start lg:gap-[55px] lg:pr-[5px]">
              <span className="md:medium-10 lg:medium-14 text-gray-600">
                김병연
              </span>
              <span className="md:medium-10 lg:medium-14 text-gray-600">
                박가현
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
