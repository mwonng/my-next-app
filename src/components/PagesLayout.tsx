import Navbar from "./Nav";

export default function Layout({
  isAuth,
  username,
  jobTitle,
  children,
}: {
  isAuth: boolean;
  username?: string;
  jobTitle?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar isAuth={isAuth} username={username} jobTitle={jobTitle} />
      <main>{children}</main>
    </>
  );
}
