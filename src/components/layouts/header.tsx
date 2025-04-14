import Link from 'next/link';
import SearchBar from './search-bar';
import { PATH } from '@/constants/path.constants';
import Nav from './nav';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex flex-col">
      <div className="flex h-14 w-full items-center justify-between gap-2 bg-white px-2 text-black sm:h-16 sm:gap-3 sm:px-4 md:h-20 md:gap-4 md:px-6 lg:h-24 lg:gap-6 lg:px-10">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6 lg:gap-12">
          <Link href={PATH.HOME} className="flex-shrink-0">
            <Image
              src="/logo/color_logo.svg"
              alt="로고"
              width={128}
              height={32}
              priority
              className="h-5 w-auto sm:h-6 md:h-7 lg:h-8"
            />
          </Link>

          {/* 검색바 */}
          <div className="sm:w-68 lg:w-92 w-56 md:w-80">
            <SearchBar />
          </div>
        </div>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
