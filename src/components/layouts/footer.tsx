import { ExternalLink } from 'lucide-react';

/**
 * 웹사이트 푸터 컴포넌트
 * 로고, 개발자 정보, 디자이너 및 튜터 정보를 표시합니다.
 */
const Footer = () => {
  return (
    <footer className="w-full bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col space-y-8 px-4">
        {/* 첫 번째 줄 - 로고 및 개발자 */}
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-4">
          {/* 로고 및 카피라이트 */}
          <div className="mb-8 flex flex-col items-start md:mb-0">
            <div className="mb-6 flex items-center">
              <div className="text-3xl font-bold">
                <span className="text-orange-500">
                  <img src="/logo/color_logo.svg" alt="Logo" />
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              2025 리윅트. All right reserved.
            </p>
          </div>

          {/* 개발자 */}
          <div className="flex flex-row items-center justify-center gap-3 md:flex-1">
            <h3 className="text-20 font-medium text-primary-500">개발자</h3>
            <ul className="flex gap-4">
              <li className="flex items-center text-gray-600">
                <span>민정현</span>
                <a
                  href="https://github.com/Eletsia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1"
                >
                  <img
                    src="/icons/github-icon.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <span>조영현</span>
                <a
                  href="https://github.com/joyounghyun550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1"
                >
                  <img
                    src="/icons/github-icon.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <span>고용준</span>
                <a
                  href="https://github.com/mbdyjk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 hover:text-orange-500"
                >
                  <img
                    src="/icons/github-icon.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <span>강푸른</span>
                <a
                  href="https://github.com/PureunKang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 hover:text-orange-500"
                >
                  <img
                    src="/icons/github-icon.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <span>이소흔</span>
                <a
                  href="https://github.com/sohxxny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 hover:text-orange-500"
                >
                  <img
                    src="/icons/github-icon.svg"
                    alt="GitHub"
                    className="h-5 w-5"
                  />
                </a>
              </li>
            </ul>
            <div className="flex flex-row items-center gap-4 md:flex-1">
              {/* 디자이너 섹션 */}
              <div className="flex flex-row gap-4">
                <h3 className="text-20 font-medium text-primary-500">
                  디자이너
                </h3>
                <ul className="flex flex-row items-center gap-4">
                  <li className="text-gray-600">최시현</li>
                  <li className="text-gray-600">유진희</li>
                </ul>
              </div>

              {/* 튜터 섹션 */}
              <div className="flex flex-row items-center gap-4">
                <h3 className="text-20 font-medium text-primary-500">튜터</h3>
                <ul className="space-y-2">
                  <li className="item text-gray-600">김병연</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
