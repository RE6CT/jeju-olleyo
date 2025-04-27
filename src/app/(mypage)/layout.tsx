import MypageSidebar from './_components/_client/mypage-sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full gap-4 bg-gray-50 py-12 md:px-7 lg:gap-10 lg:px-9">
      <MypageSidebar className="sticky top-[132px] h-fit" />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
