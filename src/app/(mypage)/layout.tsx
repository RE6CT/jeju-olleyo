import MypageSidebar from './_components/_client/mypage-sidebar';
import MypageTopTabs from './_components/_client/mypage-top-nav';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <MypageTopTabs />
      <div className="flex h-full gap-4 px-4 py-5 md:px-7 md:py-10 lg:gap-10 lg:px-9 lg:py-12">
        <MypageSidebar className="sticky h-fit" />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
