/**
 * 웹사이트 푸터 컴포넌트
 * 로고, 개발자 정보, 디자이너 및 튜터 정보를 표시합니다.
 */
const Footer = () => {
  return (
    <footer className="flex w-[1024px] items-center gap-[100px] px-9 py-8">
      {/* 로고 및 카피라이트 */}
      <div className="flex h-[189px] w-[244px] shrink-0 flex-col items-center justify-center">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <div className="flex w-36 items-center justify-center gap-[1.548px]">
            <img src="/logo/color_logo.svg" alt="Logo" />
          </div>
          <p className="medium-14 self-stretch text-gray-600">
            2025 리윅트. All right reserved.
          </p>
        </div>
      </div>

      <div className="flex w-[521px] shrink-0 flex-col items-start gap-[27px]">
        {/* 개발자 */}
        <div className="flex items-start self-stretch">
          <h3 className="semibold-16 w-[80px] text-gray-600">개발자</h3>
          <div className="flex">
            <div className="flex w-[85px] items-center gap-1">
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
            <div className="flex w-[85px] items-center gap-1">
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
            <div className="flex w-[85px] items-center gap-1">
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
            <div className="flex w-[85px] items-center gap-1">
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
            <div className="flex w-[85px] items-center gap-1">
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
        <div className="flex items-start">
          <h3 className="semibold-16 w-[80px] text-gray-600">디자이너</h3>
          <div className="flex">
            <span className="medium-14 w-[85px] text-gray-600">최시현</span>
            <span className="medium-14 w-[85px] text-gray-600">유진희</span>
          </div>
        </div>

        {/* 튜터 섹션 */}
        <div className="flex items-start">
          <h3 className="semibold-16 w-[80px] text-gray-600">튜터</h3>
          <div className="flex">
            <span className="medium-14 w-[85px] text-gray-600">김병연</span>
            <span className="medium-14 w-[85px] text-gray-600">박가현</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
