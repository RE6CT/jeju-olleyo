import Link from 'next/link';
import SearchBar from './search-bar';
import { PATH } from '@/constants/path.constants';
import Nav from './nav';
import Image from 'next/image';

const Header = () => {
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

          {/* 검색바 */}
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
