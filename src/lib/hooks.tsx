import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";

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
