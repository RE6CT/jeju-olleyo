import MypageSidebar from './_components/mypage-sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-10 px-9 py-12">
      <MypageSidebar className="sticky top-[132px] h-fit" />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
