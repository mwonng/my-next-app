import { parseCookies } from "nookies";

interface AuthData {
  username: string | undefined;
  jobTitle: string | undefined;
  isAuth: boolean;
}

export const useAuth = (context?: any): AuthData => {
  const cookies = parseCookies(context);
  const username = cookies.username;
  const jobTitle = cookies.jobTitle;

  return {
    username,
    jobTitle,
    isAuth: !!username && !!jobTitle,
  };
};
