import Sidebar from './_components/sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="ml-[50px] mr-[50px] flex">
      <Sidebar className="fixed left-[50px] top-[15%]" />
      <div className="h-screen w-[180px] min-w-[180px]" />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
