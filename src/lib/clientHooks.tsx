import nookies from "nookies";
import { useEffect, useState } from "react";

interface AuthData {
  username?: string | undefined;
  jobTitle?: string | undefined;
  isAuth: boolean;
}

export const useAuthClient = (): AuthData => {
  const [authState, setAuthState] = useState<AuthData>({ isAuth: false });

  useEffect(() => {
    const cookies = nookies.get(); // Retrieve all cookies
    const isAuth = Boolean(cookies.username && cookies.jobTitle); // Check for required cookies

    setAuthState({
      isAuth,
      username: cookies.username,
      jobTitle: cookies.jobTitle,
    });
  }, []);

  return authState;
};
