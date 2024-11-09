import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
export interface AuthData {
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

export function useAuthGuard(isAuth: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
      return;
    }

    toaster.create({
      description: "You are authorized to view this page.",
      type: "error",
      duration: 3000,
    });
  }, [isAuth, router]);
}
