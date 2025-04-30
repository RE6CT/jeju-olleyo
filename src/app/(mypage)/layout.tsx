import MypageHeader from './_components/_client/mypage-header';
import MypageSidebar from './_components/_client/mypage-sidebar';
import MypageTopTabs from './_components/_client/mypage-top-nav';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full w-full bg-gray-50">
      <div className="relative flex border-b-0.6 border-gray-100 bg-white md:hidden">
        <MypageHeader className="absolute left-0 top-1/2 -translate-y-1/2 px-4" />
        <h2 className="medium-18 m-auto w-fit pb-[12.5px] pt-[8.5px]">마이</h2>
      </div>
      <MypageTopTabs />
      <div className="flex h-full gap-4 px-4 py-5 md:px-7 md:py-10 lg:gap-10 lg:px-9 lg:py-12">
        <MypageSidebar className="sticky h-fit" />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
