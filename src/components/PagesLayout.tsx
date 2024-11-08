import Navbar from "./Nav";

export default function Layout({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar isAuth={isAuth} />
      <main>{children}</main>
    </>
  );
}
