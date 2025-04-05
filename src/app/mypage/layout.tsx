import Sidebar from './_components/sidebar';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="ml-[50px] mr-[50px] flex">
      <Sidebar className="fixed left-[50px] top-[10%]" />
      <div className="h-screen w-[180px]" />
      <div className="flex-grow bg-green-50">{children}</div>
    </div>
  );
};

export default Layout;
