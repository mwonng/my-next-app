import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export const useAuth = (): { isAuth: boolean } => {
  // Parse cookies works for both client-side and SSR
  const cookies = parseCookies();
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const cookies = parseCookies();
    setUsername(cookies.username || "");
    setJobTitle(cookies.jobTitle || "");
    setAuth(!!username && !!jobTitle);
  }, [cookies.jobTitle, cookies.username, jobTitle, username]);

  console.log(cookies);
  // Check if both username and jobTitle exist in cookies
  return { isAuth };
};
