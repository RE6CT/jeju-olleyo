import Link from 'next/link';
import SearchBar from './search-bar';
import { PATH } from '@/constants/path.constants';
import Nav from './nav';

const Header = () => {
  return (
    <header className="flex flex-col">
      <div className="flex h-24 w-full items-center justify-between gap-6 bg-white px-6 text-black md:gap-0 md:px-10">
        <div className="flex items-center gap-12">
          <Link href={PATH.HOME}>
            <img src="/logo/color_logo.svg" />
          </Link>
          <SearchBar />
        </div>

        <Nav />
      </div>
    </header>
  );
};

export default Header;
