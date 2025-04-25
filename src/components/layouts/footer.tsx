'use client';

import { usePathname } from 'next/navigation';

/**
 * 웹사이트 푸터 컴포넌트
 * 로고, 개발자 정보, 디자이너 및 튜터 정보를 표시합니다.
 */
const Footer = () => {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (!isHomePage) {
    return null;
  }

  return (
    <footer className="mx-auto flex w-full flex-col items-center gap-[50px] bg-gray-50 px-4 py-6 md:flex-row md:gap-[100px] md:px-9 md:py-8">
      {/* 로고 및 카피라이트 */}
      <div className="flex w-full shrink-0 flex-col items-center justify-center md:h-[189px] md:w-[244px]">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex w-36 items-center justify-center gap-[1.548px]">
            <img src="/logo/color_logo.png" alt="Logo" />
          </div>
          <p className="medium-14 self-stretch text-gray-600">
            2025 리윅트. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-start gap-[20px] md:w-[550px] md:gap-[27px]">
        {/* 개발자 */}
        <div className="flex items-start self-stretch">
          <h3 className="semibold-16 w-[80px] text-gray-600">개발자</h3>
          <div className="flex flex-wrap">
            <div className="mb-2 mr-2 flex min-w-[85px] items-center gap-1">
              <span className="medium-14 text-gray-600">민정현</span>
              <a
                href="https://github.com/Eletsia"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  className="h-5 w-5"
                />
              </a>
            </div>
            <div className="mb-2 mr-2 flex min-w-[85px] items-center gap-1">
              <span className="medium-14 text-gray-600">조영현</span>
              <a
                href="https://github.com/joyounghyun550"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  className="h-5 w-5"
                />
              </a>
            </div>
            <div className="mb-2 mr-2 flex min-w-[85px] items-center gap-1">
              <span className="medium-14 text-gray-600">고용준</span>
              <a
                href="https://github.com/mbdyjk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  className="h-5 w-5"
                />
              </a>
            </div>
            <div className="mb-2 mr-2 flex min-w-[85px] items-center gap-1">
              <span className="medium-14 text-gray-600">강푸른</span>
              <a
                href="https://github.com/PureunKang"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  className="h-5 w-5"
                />
              </a>
            </div>
            <div className="mb-2 mr-2 flex min-w-[85px] items-center gap-1">
              <span className="medium-14 text-gray-600">이소흔</span>
              <a
                href="https://github.com/sohxxny"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github-icon.svg"
                  alt="GitHub"
                  className="h-5 w-5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* 디자이너 섹션 */}
        <div className="flex flex-wrap items-start">
          <h3 className="semibold-16 w-[80px] text-gray-600">디자이너</h3>
          <div className="flex flex-wrap">
            <span className="medium-14 mb-2 mr-2 min-w-[85px] text-gray-600">
              최시현
            </span>
            <span className="medium-14 mb-2 mr-2 min-w-[85px] text-gray-600">
              유진희
            </span>
          </div>
        </div>

        {/* 튜터 섹션 */}
        <div className="flex flex-wrap items-start">
          <h3 className="semibold-16 w-[80px] text-gray-600">튜터</h3>
          <div className="flex flex-wrap">
            <span className="medium-14 mb-2 mr-2 min-w-[85px] text-gray-600">
              김병연
            </span>
            <span className="medium-14 mb-2 mr-2 min-w-[85px] text-gray-600">
              박가현
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
